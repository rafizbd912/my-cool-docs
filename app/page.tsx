export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Welcome to docs-site
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
          A modern documentation site built with Next.js 14, Tailwind CSS, and the typography plugin.
          Features a responsive layout with dark mode support.
        </p>
      </div>

      <div className="prose prose-lg max-w-none dark:prose-invert">
        <h2>🚀 Getting Started</h2>
        <p>
          This is your new documentation site! The layout includes a fixed header, responsive sidebar, 
          and this main content area with <code>px-4 py-8</code> spacing as requested.
        </p>

        <h3>✨ Layout Features</h3>
        <ul>
          <li><strong>Fixed Header</strong> - 64px tall with subtle shadow and dark mode support</li>
          <li><strong>Responsive Sidebar</strong> - Hidden on mobile, toggleable with burger menu</li>
          <li><strong>Dark Mode Toggle</strong> - Click the icon in the header to switch themes</li>
          <li><strong>Mobile First</strong> - Fully responsive design with Tailwind CSS</li>
        </ul>

        <h3>🎨 Design System</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Brand Color</h4>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-brand rounded"></div>
              <code className="text-sm text-gray-600 dark:text-gray-300">#14b8a6</code>
            </div>
          </div>
          
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Typography</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Uses the @tailwindcss