export default function Contributing() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Contributing
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
          Help make docs-site better! Learn how to contribute to this open source project.
        </p>
      </div>

      <div className="prose prose-lg max-w-none dark:prose-invert">
        <h2>🤝 Welcome Contributors!</h2>
        <p>
          We're excited that you're interested in contributing to docs-site! This guide will help you 
          get started with contributing to our documentation platform and CLI tool.
        </p>

        <h3>🚀 Getting Started</h3>
        <ol>
          <li><strong>Fork the repository</strong> on GitHub</li>
          <li><strong>Clone your fork</strong> locally:
            <pre><code>git clone https://github.com/your-username/docs-site.git</code></pre>
          </li>
          <li><strong>Install dependencies</strong>:
            <pre><code>npm install</code></pre>
          </li>
          <li><strong>Start the development server</strong>:
            <pre><code>npm run dev</code></pre>
          </li>
        </ol>

        <h3>🛠 Development Workflow</h3>
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-4 rounded-r-lg">
          <h4 className="text-blue-800 dark:text-blue-300 font-semibold mb-2">Branch Naming</h4>
          <ul className="text-blue-700 dark:text-blue-300 mb-0">
            <li>• <code>feature/description</code> for new features</li>
            <li>• <code>fix/description</code> for bug fixes</li>
            <li>• <code>docs/description</code> for documentation updates</li>
          </ul>
        </div>

        <h3>📝 Areas to Contribute</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">🎨 Frontend</h4>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>• UI/UX improvements</li>
              <li>• New components</li>
              <li>• Accessibility enhancements</li>
              <li>• Performance optimizations</li>
            </ul>
          </div>
          
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">🔧 CLI Tool</h4>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>• New CLI features</li>
              <li>• Bug fixes</li>
              <li>• Error handling</li>
              <li>• Output formatting</li>
            </ul>
          </div>
        </div>

        <h3>📋 Pull Request Guidelines</h3>
        <ul>
          <li><strong>Keep PRs focused</strong> - One feature/fix per PR</li>
          <li><strong>Write clear commit messages</strong> - Use conventional commits format</li>
          <li><strong>Add tests</strong> where applicable</li>
          <li><strong>Update documentation</strong> if you change functionality</li>
          <li><strong>Follow code style</strong> - We use ESLint and Prettier</li>
        </ul>

        <h3>🧪 Testing</h3>
        <p>Before submitting your PR, make sure to:</p>
        <ul>
          <li>Run the linter: <code>npm run lint</code></li>
          <li>Test the build: <code>npm run build</code></li>
          <li>Test the CLI tool with different repositories</li>
          <li>Verify responsive design on different screen sizes</li>
        </ul>

        <h3>💡 Ideas for Contributions</h3>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 rounded-r-lg">
          <h4 className="text-yellow-800 dark:text-yellow-300 font-semibold mb-2">Looking for ideas?</h4>
          <ul className="text-yellow-700 dark:text-yellow-300 mb-0">
            <li>• Add search functionality to the documentation</li>
            <li>• Implement markdown file support for content</li>
            <li>• Add more CLI output formats (JSON, XML)</li>
            <li>• Create additional page templates</li>
            <li>• Improve mobile navigation experience</li>
            <li>• Add keyboard shortcuts</li>
          </ul>
        </div>

        <h3>📞 Get Help</h3>
        <p>
          Stuck or have questions? Don't hesitate to:
        </p>
        <ul>
          <li>Open an issue on GitHub for bugs or feature requests</li>
          <li>Start a discussion for questions or ideas</li>
          <li>Check existing issues and PRs for similar work</li>
        </ul>

        <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-400 p-4 rounded-r-lg">
          <h4 className="text-green-800 dark:text-green-300 font-semibold mb-2">Thank You!</h4>
          <p className="text-green-700 dark:text-green-300 mb-0">
            Every contribution, no matter how small, helps make docs-site better for everyone. 
            We appreciate your time and effort in improving this project!
          </p>
        </div>
      </div>
    </div>
  )
} 