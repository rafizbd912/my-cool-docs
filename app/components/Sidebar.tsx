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

  const [navLinks, setNavLinks] = useState<NavLink[]>([])

  // Build nav links from h2 headings within the article
  useEffect(() => {
    const article = document.querySelector('article')
    if (!article) return

    const headings = Array.from(article.querySelectorAll('h2')) as HTMLElement[]
    const links: NavLink[] = headings.map((h) => {
      const id = h.id || h.textContent?.replace(/\s+/g, '-').toLowerCase() || ''
      if (!h.id) h.id = id
      return { href: `#${id}`, label: h.textContent || '' }
    })

    // Always include top link to main title
    setNavLinks([{ href: '#changelog', label: 'Overview' }, ...links])
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
        <div className="flex flex-col h-full">
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
          <nav className="flex-1 p-4">
            <div className="space-y-1">
              {navLinks.map((link) => {
                const isActive = (typeof window !== 'undefined' ? window.location.hash === link.href : false) || (link.href === '#changelog' && !window.location.hash)
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

          {/* Footer */}
          <div className="p-4 border-t border-gray-700">
            <p className="text-sm text-gray-400">
              Built with Next.js 14
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}

 