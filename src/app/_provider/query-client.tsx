'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '../_lib/query-client'
import { createContext } from 'react'

const ProviderContext = createContext({})

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ProviderContext.Provider value={{}}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ProviderContext.Provider>
  )
}
