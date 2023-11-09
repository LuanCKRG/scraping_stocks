import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
// import { UserProvider } from '@/contexts/UserProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CK | Ações',
  description: 'Um projeto feito por Luan CK',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
          {children}
      </body>
    </html>
  )
}

export default RootLayout