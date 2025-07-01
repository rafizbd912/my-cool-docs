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
      <div className="mb-12">
        <h1 id="changelog" className="text-4xl lg:text-5xl font-bold text-white mb-6">
          rafiz-changelog-maker
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl">
          AI-powered changelog generator that transforms Git commits into beautiful, organized changelogs.
        </p>
      </div>

      <article className="prose prose-invert lg:prose-xl mx-auto max-w-none prose-strong:text-white prose-headings:text-white prose-li:text-gray-300">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{changelogContent}</ReactMarkdown>
      </article>

      <div className="mt-12 p-6 bg-blue-900/20 border-l-4 border-blue-400 rounded-r-lg">
        <h3 className="text-blue-300 font-semibold mb-2">🚀 Generate Your Own Changelog</h3>
        <p className="text-blue-300 mb-3">Use the CLI tool to generate changelogs from any Git repository:</p>
        <pre className="bg-blue-900/40 p-3 rounded text-blue-200 text-sm overflow-x-auto">
          <code>npx rafiz-changelog-maker --repo owner/repo --max 100 &gt; CHANGELOG.md</code>
        </pre>
      </div>
    </div>
  )
}
