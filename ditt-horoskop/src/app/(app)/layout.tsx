import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Inter as FontSans } from 'next/font/google'

type LayoutProps = {
  children: ReactNode
}

import './globals.css'
import { AuthProvider } from '@/providers/auth'
import Header from '@/components/ui/header'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

const Layout = ({ children }: LayoutProps) => {
  return (
    <html>
      <AuthProvider>
        <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
          <Header />
          {children}
        </body>
      </AuthProvider>
    </html>
  )
}

export default Layout
