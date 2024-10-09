import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Inter as FontSans } from 'next/font/google'

type LayoutProps = {
  children: ReactNode
}

import './globals.css'
import { AuthProvider } from '@/providers/auth'
import Header from '@/components/ui/header'
import { ThemeProvider } from '@/providers/theme-provider'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

const Layout = ({ children }: LayoutProps) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <AuthProvider>
        <body
          className={cn(
            'flex flex-col min-h-screen bg-background font-sans antialiased',
            fontSans.variable,
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className={'flex-grow w-full flex flex-col items-center pb-4'}>{children}</main>
          </ThemeProvider>
        </body>
      </AuthProvider>
    </html>
  )
}

export default Layout
