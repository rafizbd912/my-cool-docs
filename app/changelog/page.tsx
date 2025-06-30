import fs from 'fs'
import path from 'path'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Metadata } from 'next'

// App Router equivalent of getStaticProps - this runs at build time
async function getChangelogContent() {
  try {
    const changelogPath = path.join(process.cwd(), 'CHANGELOG.md')
    const content = fs.readFileSync(changelogPath, 'utf8')
    return content
  } catch (error) {
    console.error('Error reading CHANGELOG.md:', error)
    return '# Changelog\n\nChangelog file not found.'
  }
}

export const metadata: Metadata = {
  title: 'Changelog - docs-site',
  description: 'View the latest changes and updates to docs-site',
}

export default async function ChangelogPage() {
  // This is the App Router equivalent of getStaticProps
  // The file is read at build time (or request time in dev)
  const changelogContent = await getChangelogContent()

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Changelog
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
          Track all changes, improvements, and updates to docs-site.
        </p>
      </div>

      {/* React Markdown with GFM support and prose styling */}
      <article className="prose lg:prose-xl mx-auto dark:prose-invert max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            // Ensure code blocks get proper language classes for Prism
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '')
              const language = match ? match[1] : ''
              
              if (!inline) {
                return (
                  <code
                    className={`${className || ''} ${language ? `language-${language}` : ''}`}
                    {...props}
                  >
                    {children}
                  </code>
                )
              }
              
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            },
            pre({ children, ...props }) {
              return (
                <pre className="relative" {...props}>
                  {children}
                </pre>
              )
            },
            // Style links to use brand color
            a({ href, children, ...props }) {
              const isExternal = href?.startsWith('http')
              return (
                <a
                  href={href}
                  className="text-brand hover:text-brand/80 transition-colors"
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  {...props}
                >
                  {children}
                  {isExternal && (
                    <span className="inline-block ml-1 text-xs">
                      ↗
                    </span>
                  )}
                </a>
              )
            },
            // Enhanced blockquotes
            blockquote({ children, ...props }) {
              return (
                <blockquote
                  className="border-l-4 border-brand/30 bg-brand/5 dark:bg-brand/10 pl-4 py-2 my-6 italic"
                  {...props}
                >
                  {children}
                </blockquote>
              )
            },
            // Enhanced tables
            table({ children, ...props }) {
              return (
                <div className="overflow-x-auto">
                  <table
                    className="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
                    {...props}
                  >
                    {children}
                  </table>
                </div>
              )
            },
            th({ children, ...props }) {
              return (
                <th
                  className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  {...props}
                >
                  {children}
                </th>
              )
            },
            td({ children, ...props }) {
              return (
                <td
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700"
                  {...props}
                >
                  {children}
                </td>
              )
            },
          }}
        >
          {changelogContent}
        </ReactMarkdown>
      </article>

      {/* Navigation hint */}
      <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 rounded-r-lg">
        <h3 className="text-blue-800 dark:text-blue-300 font-semibold mb-2">
          📝 Automated Changelog Generation
        </h3>
        <p className="text-blue-700 dark:text-blue-300 mb-3">
          This changelog can be automatically generated using our CLI tool:
        </p>
        <pre className="bg-blue-100 dark:bg-blue-900/40 p-3 rounded text-blue-800 dark:text-blue-200 text-sm overflow-x-auto">
          <code>node src/cli.js --repo your-org/your-repo --max 20</code>
        </pre>
      </div>
    </div>
  )
} 