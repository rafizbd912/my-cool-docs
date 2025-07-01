import fs from 'fs'
import path from 'path'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Metadata } from 'next'

async function getChangelogContent() {
  try {
    const changelogPath = path.join(process.cwd(), 'CHANGELOG.md')
    return fs.readFileSync(changelogPath, 'utf8')
  } catch {
    return '# Changelog\n\nNo CHANGELOG.md found.'
  }
}

export const metadata: Metadata = {
  title: 'Changelog - rafiz-changelog-maker',
  description: 'AI-powered changelog generator for Git repositories',
}

export default async function Home() {
  const changelogContent = await getChangelogContent()

  const Heading = (Tag: 'h2' | 'h3') =>
    function H(props: any) {
      const text = String(props.children)
      const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

      const badgeMap: Record<string, string> = {
        "what's new": 'success',
        'enhancements': 'warning',
        'bug fixes': 'error',
        'breaking changes': 'error',
        'deprecations': 'error',
      }
      const tone = badgeMap[text.toLowerCase()]
      const toneClassMap: Record<string, string> = {
        success: 'bg-green-600/20 text-green-300',
        warning: 'bg-yellow-600/20 text-yellow-300',
        error: 'bg-red-600/20 text-red-300',
      }

      return (
        <Tag
          id={id}
          className="group scroll-mt-20 flex items-center gap-2 font-semibold text-white"
        >
          {text}
          {tone && (
            <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${toneClassMap[tone]}` }>
              {tone === 'success' ? 'New' : tone === 'warning' ? 'Enhancement' : 'Fix'}
            </span>
          )}
          <a
            href={`#${id}`}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-brand ml-1 text-sm"
            aria-label="Copy link"
          >
            🔗
          </a>
        </Tag>
      )
    }

  const markdownComponents = {
    h2: Heading('h2'),
    h3: Heading('h3'),
  } as const

  return (
    <div className="max-w-4xl mx-auto">
      {/* invisible anchor for sidebar "Overview" link */}
      <div id="changelog" className="h-0 w-0" />

      <article className="prose prose-invert lg:prose-xl mx-auto max-w-none prose-strong:text-white prose-headings:text-white prose-li:text-gray-300">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={markdownComponents}
        >
          {changelogContent}
        </ReactMarkdown>
      </article>
    </div>
  )
}
