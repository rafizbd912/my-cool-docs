import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css' // Global CSS import - equivalent to _app.js import
import LayoutWrapper from './components/LayoutWrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'rafiz-changelog-maker',
  description: 'AI-powered changelog generator and viewer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="dark">
      <body className={inter.className}>
        {/* LayoutWrapper wraps every page - equivalent to _app.js Layout wrapper */}
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  )
} 
