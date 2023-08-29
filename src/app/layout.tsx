import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Header } from '@/components/Header'
import { SearchBar } from '@/components/SearchBar'
import { SearchProvider } from '@/contexts/SearchContext'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CK | Ações',
  description: 'Um projeto feito por Luan CK',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <SearchProvider>
          <Header />

          <div className="flex flex-col">
            <SearchBar />

            {children}
          </div>
        </SearchProvider>
      </body>
    </html>
  )
}

export default RootLayout