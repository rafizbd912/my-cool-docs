# docs-site

A modern documentation site built with Next.js 14, Tailwind CSS, and typography plugin. Also includes a CLI tool for generating AI-powered changelogs from Git commits.

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## CLI Tool: rafiz-changelog-maker

Generate beautiful changelogs from Git commits using AI!

### Setup

1. Set environment variables:
   ```bash
   export OPENAI_API_KEY="your_openai_api_key"
   export GITHUB_TOKEN="your_github_personal_access_token"
   ```

2. Make the CLI executable:
   ```bash
   chmod +x src/cli.js
   ```

### Usage

```bash
# Generate changelog for a repository
node src/cli.js --repo owner/repo

# Limit to last 20 commits
node src/cli.js --repo owner/repo --max 20

# Example
node src/cli.js --repo microsoft/vscode --max 10
```

### Options

- `--repo, -r <owner/repo>` (required) - GitHub repository in format "owner/repo"
- `--max, -m <number>` (optional) - Maximum number of commits to process

### Requirements

- **OpenAI API Key**: Get from [OpenAI Platform](https://platform.openai.com/api-keys)
- **GitHub Token**: Get from [GitHub Settings](https://github.com/settings/tokens)
  - For public repos: needs `public_repo` scope
  - For private repos: needs `repo` scope

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with Typography plugin
- **Language**: TypeScript
- **CLI**: Commander.js, Octokit, OpenAI
- **Theme System**: Data-attribute based dark mode with persistent storage

## Architecture Overview

This project uses Next.js 14 App Router, which replaces the traditional `_app.js` approach:

### App Router Equivalent to Pages Router
- **`app/layout.tsx`** - Root layout (replaces `_app.js`)
  - Imports global CSS
  - Wraps all pages in LayoutWrapper
  - Sets initial `data-theme` attribute on `<html>` tag
- **`app/components/LayoutWrapper.tsx`** - Main layout wrapper
  - Provides consistent layout structure for all pages
  - Includes ThemeProvider for theme management
- **`app/components/ThemeProvider.tsx`** - Theme management
  - Handles `data-theme` attribute switching
  - Manages localStorage persistence
  - Responds to system theme changes

### Theme System
- Uses `data-theme="light|dark"` on `<html>` element
- Tailwind configured with `darkMode: ['attribute', 'data-theme', 'dark']`
- CSS variables defined per theme in `globals.css`
- Persistent theme storage with system preference fallback

### Markdown Rendering
- **`app/changelog/page.tsx`** - Server component that reads `CHANGELOG.md`
  - Equivalent to `getStaticProps` functionality in Pages Router
  - Uses `react-markdown` with `remark-gfm` for GitHub Flavored Markdown
  - Code blocks get proper language classes for Prism integration
  - Styled with `prose lg:prose-xl` from @tailwindcss/typography

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.