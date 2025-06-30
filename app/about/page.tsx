export default function About() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          About docs-site
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
          Learn more about this modern documentation site and its features.
        </p>
      </div>

      <div className="prose prose-lg max-w-none dark:prose-invert">
        <h2>🎯 Project Overview</h2>
        <p>
          docs-site is a comprehensive documentation platform built with modern web technologies. 
          It combines the power of Next.js 14, Tailwind CSS, and AI-powered tools to create an 
          exceptional documentation experience.
        </p>

        <h3>🚀 Key Features</h3>
        <ul>
          <li><strong>Modern Tech Stack</strong> - Built with Next.js 14 and TypeScript</li>
          <li><strong>Responsive Design</strong> - Mobile-first approach with Tailwind CSS</li>
          <li><strong>Dark Mode Support</strong> - Seamless theme switching</li>
          <li><strong>Typography Plugin</strong> - Beautiful text formatting out of the box</li>
          <li><strong>AI-Powered CLI</strong> - Generate changelogs from Git commits</li>
        </ul>

        <h3>🛠 Architecture</h3>
        <p>
          The application follows Next.js 14's App Router pattern with a clean component structure:
        </p>
        <ul>
          <li><code>app/layout.tsx</code> - Root layout with metadata</li>
          <li><code>app/components/</code> - Reusable UI components</li>
          <li><code>src/cli.js</code> - Command-line interface tool</li>
          <li><code>tailwind.config.js</code> - Design system configuration</li>
        </ul>

        <h3>🎨 Design System</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 not-prose">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="w-full h-12 bg-brand rounded mb-3"></div>
            <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Brand Color</h4>
            <p className="text-xs text-gray-600 dark:text-gray-300">#14b8a6</p>
          </div>
          
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="w-full h-12 bg-gray-100 dark:bg-gray-700 rounded mb-3"></div>
            <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Neutral</h4>
            <p className="text-xs text-gray-600 dark:text-gray-300">Gray scale</p>
          </div>
          
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="w-full h-12 bg-blue-100 dark:bg-blue-900/30 rounded mb-3"></div>
            <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Accent</h4>
            <p className="text-xs text-gray-600 dark:text-gray-300">Blue tones</p>
          </div>
        </div>

        <h3>📈 Performance</h3>
        <p>
          Built with performance in mind, featuring:
        </p>
        <ul>
          <li>Server-side rendering with Next.js 14</li>
          <li>Optimized bundle size with tree shaking</li>
          <li>Fast navigation with App Router</li>
          <li>Responsive images and fonts</li>
        </ul>

        <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-400 p-4 rounded-r-lg">
          <h4 className="text-green-800 dark:text-green-300 font-semibold mb-2">Open Source</h4>
          <p className="text-green-700 dark:text-green-300 mb-0">
            This project is open source and welcomes contributions from the community. 
            Check out the Contributing page to learn how you can help improve docs-site!
          </p>
        </div>
      </div>
    </div>
  )
} 