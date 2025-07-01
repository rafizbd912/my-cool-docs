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
  title: 'Changelog - rafiz-changelog-maker',
  description: 'AI-powered changelog generator for Git repositories',
}

export default async function Home() {
  // This is the App Router equivalent of getStaticProps
  // The file is read at build time (or request time in dev)
  const changelogContent = await getChangelogContent()

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          rafiz-changelog-maker
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
          AI-powered changelog generator that transforms Git commits into beautiful, organized changelogs.
        </p>
      </div>

      {/* React Markdown with GFM support and prose styling */}
      <article className="prose lg:prose-xl mx-auto dark:prose-invert max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
        >
          {changelogContent}
        </ReactMarkdown>
      </article>

      {/* CLI Usage hint */}
      <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 rounded-r-lg">
        <h3 className="text-blue-800 dark:text-blue-300 font-semibold mb-2">
          🚀 Generate Your Own Changelog
        </h3>
        <p className="text-blue-700 dark:text-blue-300 mb-3">
          Use the CLI tool to generate changelogs from any Git repository:
        </p>
        <pre className="bg-blue-100 dark:bg-blue-900/40 p-3 rounded text-blue-800 dark:text-blue-200 text-sm overflow-x-auto">
          <code>npx rafiz-changelog-maker --repo owner/repo --max 100 &gt; CHANGELOG.md</code>
        </pre>
      </div>
    </div>
  )
} 