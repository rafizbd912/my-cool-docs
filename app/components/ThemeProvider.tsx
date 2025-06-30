'use client'

import { useEffect, ReactNode } from 'react'

interface ThemeProviderProps {
  children: ReactNode
}

/**
 * ThemeProvider - Manages theme initialization at the app level
 * This is equivalent to theme setup that would be done in _app.js in Pages Router
 */
export default function ThemeProvider({ children }: ThemeProviderProps) {
  useEffect(() => {
    // Initialize theme on app load
    const initializeTheme = () => {
      const savedTheme = localStorage.getItem('theme')
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      
      const theme = savedTheme || (prefersDark ? 'dark' : 'light')
      document.documentElement.setAttribute('data-theme', theme)
    }

    initializeTheme()

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      // Only update if no saved preference
      if (!localStorage.getItem('theme')) {
        const theme = e.matches ? 'dark' : 'light'
        document.documentElement.setAttribute('data-theme', theme)
      }
    }

    mediaQuery.addEventListener('change', handleSystemThemeChange)
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange)
  }, [])

  return <>{children}</>
} 