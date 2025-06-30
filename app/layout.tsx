import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css' // Global CSS import - equivalent to _app.js import
import LayoutWrapper from './components/LayoutWrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'docs-site',
  description: 'A modern documentation site built with Next.js 14',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
 