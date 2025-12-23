import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import MuiThemeProvider from '@/components/ThemeProvider'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mogi-Fet - Multi-Page Form',
  description: 'A multi-page form application with weather and country data',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MuiThemeProvider>{children}</MuiThemeProvider>
      </body>
    </html>
  )
}

