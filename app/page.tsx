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

  return (
    <div className="max-w-4xl mx-auto">
      {/* invisible anchor for sidebar "Overview" link */}
      <div id="changelog" className="h-0 w-0" />

      <article className="prose prose-invert lg:prose-xl mx-auto max-w-none prose-strong:text-white prose-headings:text-white prose-li:text-gray-300">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{changelogContent}</ReactMarkdown>
      </article>
    </div>
  )
}
