'use client'

import { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'

interface LayoutWrapperProps {
  children: React.ReactNode
}

/**
 * LayoutWrapper - Main app layout component
 * Equivalent to wrapping pages in Layout within _app.js in Pages Router
 * Provides global layout structure and theme management for all pages
 */
export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <Header onToggleSidebar={toggleSidebar} />
      
      <div className="flex pt-0"> {/* pt-16 to account for fixed header */}
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        
        {/* Main Content */}
        <main className="flex-1 px-4 py-8 lg:ml-64 transition-all duration-300">
          {children}
        </main>
      </div>
      
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  )
} 
