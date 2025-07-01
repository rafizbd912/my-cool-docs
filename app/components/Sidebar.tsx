'use client'

import { useEffect, useState } from 'react'
// import { usePathname } from 'next/navigation'
import Link from 'next/link'

interface NavLink {
  href: string;
  label: string;
}

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  // const pathname = usePathname()

  const [navLinks, setNavLinks] = useState<NavLink[]>([{ href: '#changelog', label: 'Overview' }])

  const currentHash = typeof window !== 'undefined' ? window.location.hash : ''

  // Build nav links from h2 headings within the article
  useEffect(() => {
    const buildLinks = () => {
      const article = document.querySelector('article')
      if (!article) return false

      const headings = Array.from(article.querySelectorAll('h2')) as HTMLElement[]
      if (headings.length === 0) return false

      const links: NavLink[] = headings.map((h) => {
        const id = h.id || h.textContent?.replace(/\s+/g, '-').toLowerCase() || ''
        if (!h.id) h.id = id
        return { href: `#${id}`, label: h.textContent || '' }
      })

      setNavLinks([{ href: '#changelog', label: 'Overview' }, ...links])
      return true
    }

    // Try immediately and then keep trying until headings discovered
    if (!buildLinks()) {
      const id = setInterval(() => {
        if (buildLinks()) clearInterval(id)
      }, 300)
      return () => clearInterval(id)
    }
  }, [])

  // Close sidebar when pressing escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  return (
    <>
      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gray-800 border-r border-gray-700 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:mt-0 mt-16
      `}>
        <div className="flex flex-col h-full sticky top-16">
          {/* Sidebar Header - only visible on mobile */}
          <div className="lg:hidden p-4 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Menu</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-md text-gray-300 hover:bg-gray-700"
                aria-label="Close sidebar"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-1">
              {navLinks.map((link) => {
                const isActive = currentHash === link.href || (link.href === '#changelog' && currentHash === '')
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`
                      relative flex items-center px-3 py-2 rounded-lg text-sm transition-colors
                      ${isActive 
                        ? 'text-brand font-semibold bg-brand/20' 
                        : 'text-gray-300 hover:bg-gray-700'
                      }
                    `}
                    onClick={onClose} // Close sidebar on mobile when clicking a link
                  >
                    {/* 4px accent bar for active route */}
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand rounded-r-sm" />
                    )}
                    <span className="ml-2">{link.label}</span>
                  </Link>
                )
              })}
            </div>
          </nav>

          {/* Footer removed */}
        </div>
      </aside>
    </>
  )
}

 