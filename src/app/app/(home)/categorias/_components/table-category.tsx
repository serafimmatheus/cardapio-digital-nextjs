'use client'

import * as React from 'react'
import { CaretSortIcon } from '@radix-ui/react-icons'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { Button } from '@/app/_components/ui/button'

import { Input } from '@/app/_components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/_components/ui/table'
import { Edit, Trash } from 'lucide-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Category, getCategories } from '../_actions/get-categories'
import Link from 'next/link'
import { deleteCategories } from '../_actions/delete-category'
import { useToast } from '@/app/_components/ui/use-toast'

export function TableCategory() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const {
    data: categories,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })

  const queryClient = useQueryClient()

  const { toast } = useToast()

  const { mutateAsync: deleteCategoriesFn } = useMutation({
    mutationFn: deleteCategories,
    onMutate: async (updateCategory) => {
      await queryClient.cancelQueries({ queryKey: ['categories'] })
      const previousCategories = queryClient.getQueryData<Category[]>([
        'categories',
      ])
      queryClient.setQueryData<Category[]>(['categories'], (old: any) => {
        return [...(old ?? []), updateCategory]
      })
      return { previousCategories }
    },

    onError: async (error, variables, context) => {
      if (context?.previousCategories) {
        queryClient.setQueryData<Category[]>(
          ['categories'],
          context.previousCategories
        )
      }
      toast({
        title: 'Erro ao deletar categoria',
        description: error.message,
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })

      toast({
        title: 'Categoria deletada com sucesso',
      })
    },
  })

  async function handleDeleteCategory(slug: string) {
    await deleteCategoriesFn({ slug })
  }

  const columns: ColumnDef<Category>[] = [
    {
      accessorKey: 'name',
      header: 'Nome',
      cell: ({ row }) => (
        <div className='capitalize'>{row.getValue('name')}</div>
      ),
    },
    {
      accessorKey: 'slug',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Slug
            <CaretSortIcon className='ml-2 h-4 w-4' />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className='lowercase'>{row.getValue('slug')}</div>
      ),
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const categorie = row.original

        return (
          <div className='flex gap-2 justify-end items-center'>
            <Link href={`/app/categorias/${categorie.slug}/editar`}>
              <Edit size={18} className='text-primary cursor-pointer' />
            </Link>
            <Trash
              size={18}
              className='text-destructive cursor-pointer'
              onClick={() => handleDeleteCategory(categorie.slug)}
            />
          </div>
        )
      },
    },
  ]

  const table = useReactTable({
    data: categories ?? [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <>
      {isFetching ? (
        <div className='flex w-full h-[200px] justify-center items-center border border-primary rounded-lg animate-pulse'>
          <p className='text-xs text-primary'>Carregando produtos...</p>
        </div>
      ) : (
        <div className='w-full'>
          <div className='flex items-center py-4 justify-between gap-10'>
            <Input
              placeholder='Busque pelo nome...'
              value={
                (table.getColumn('name')?.getFilterValue() as string) ?? ''
              }
              onChange={(event) =>
                table.getColumn('name')?.setFilterValue(event.target.value)
              }
              className='max-w-sm'
            />

            <div className='text-sm text-muted-foreground'>
              Total: {table.getFilteredRowModel().rows.length}
            </div>
          </div>
          <div className='rounded-md border'>
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>

              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className='h-24 text-center'
                    >
                      No results.
                      {isError && (
                        <div className='flex w-full h-[200px] justify-center items-center border border-destructive rounded-lg animate-pulse'>
                          <p className='text-xs text-destructive'>
                            Erro ao carregar produtos
                          </p>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className='flex items-center justify-end space-x-2 py-4'>
            <div className='space-x-2'>
              <Button
                variant='outline'
                size='sm'
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Anterior
              </Button>
              <Button
                variant='outline'
                size='sm'
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Próximo
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
