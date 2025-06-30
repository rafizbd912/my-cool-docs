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
   chmod +x s