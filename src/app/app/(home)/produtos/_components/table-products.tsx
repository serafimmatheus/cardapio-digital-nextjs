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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAllProducts, Product } from '@/app/(home)/action'
import Image from 'next/image'
import { Edit, Trash } from 'lucide-react'
import Link from 'next/link'
import { deleteProducts } from '../_actions/delete-product'
import { useToast } from '@/app/_components/ui/use-toast'

export function TableProducts() {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
  })

  const { mutateAsync: deleteProductsFn, isPending: isPendingProduct } =
    useMutation({
      mutationFn: deleteProducts,
      onMutate: async (updateProduct) => {
        await queryClient.cancelQueries({
          queryKey: ['products'],
        })

        const previousProducts = queryClient.getQueryData<Product[]>([
          'products',
        ])

        queryClient.setQueryData<Product[]>(['products'], (old) => {
          return old?.filter((product) => product.slug !== updateProduct.slug)
        })

        return { previousProducts }
      },
      onError: (error) => {
        toast({
          title: 'Erro ao deletar produto',
          description: error.message,
        })
      },
      onSuccess: () => {
        toast({
          title: 'Produto deletado com sucesso',
          description: 'success',
        })
      },
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: ['products'],
        })
      },
    })

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: 'image',
      header: 'Imagem',
      cell: ({ row }) => (
        <div className='capitalize'>
          <Image
            src={row.getValue('image')}
            alt={row.getValue('name')}
            width={0}
            height={0}
            sizes='100vw'
            className='size-12'
          />
        </div>
      ),
    },

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
      accessorKey: 'price',
      header: () => <div className='text-right'>Preço</div>,
      cell: ({ row }) => {
        const price = Number(row.getValue('price'))

        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price)

        return <div className='text-right font-medium'>{formatted}</div>
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const product = row.original

        return (
          <div className='flex gap-2 justify-end items-center'>
            <Button
              size='icon'
              variant='link'
              asChild
              disabled={isPendingProduct}
              className='size-8'
            >
              <Link href={`/app/produtos/${product.slug}/editar`}>
                <Edit size={18} className='text-primary cursor-pointer' />
              </Link>
            </Button>

            <Button
              size='icon'
              variant='link'
              asChild
              disabled={isPendingProduct}
              className='size-5'
            >
              <Trash
                onClick={() => deleteProductsFn({ slug: product.slug })}
                size={18}
                className='text-destructive cursor-pointer'
              />
            </Button>
          </div>
        )
      },
    },
  ]

  const table = useReactTable({
    data: products ?? [],
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
    <div className='w-full'>
      <div className='flex items-center py-4 justify-between gap-10'>
        <Input
          placeholder='Busque pelo nome...'
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
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
  )
}
