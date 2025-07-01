#!/usr/bin/env node
// chmod +x src/cli.js
// 07-01-0425

const { Command } = require('commander');
const { Octokit } = require('@octokit/rest');
const OpenAI = require('openai');

const program = new Command();

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Initialize Octokit with timeout
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
  request: {
    timeout: 30000, // 30 seconds timeout
  },
});

async function generateChangelog(repo, maxCommits, sinceDate, untilDate) {
  try {
    const [owner, repoName] = repo.split('/');
    
    if (!owner || !repoName) {
      throw new Error('Repository must be in format "owner/repo"');
    }

    // Helper function to convert date strings to ISO format
    const formatDate = (dateStr) => {
      if (!dateStr) return undefined;
      
      // If already in ISO format, return as-is
      if (dateStr.includes('T')) return dateStr;
      
      // Convert simple date (YYYY-MM-DD) to ISO format
      try {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) {
          throw new Error(`Invalid date format: ${dateStr}`);
        }
        return date.toISOString();
      } catch (error) {
        throw new Error(`Invalid date format: ${dateStr}. Use YYYY-MM-DD or ISO 8601 format`);
      }
    };

    const since = formatDate(sinceDate);
    const until = formatDate(untilDate);

    // Build date filter message
    let dateFilter = '';
    if (since && until) {
      dateFilter = ` from ${sinceDate} to ${untilDate}`;
    } else if (since) {
      dateFilter = ` since ${sinceDate}`;
    } else if (until) {
      dateFilter = ` until ${untilDate}`;
    }

    console.error(`Fetching commits from ${repo}${dateFilter}...`);
    
    // Build GitHub API parameters
    const apiParams = {
      owner,
      repo: repoName,
      per_page: maxCommits || 100,
    };
    
    if (since) apiParams.since = since;
    if (until) apiParams.until = until;
    
    // Fetch commits from GitHub
    const { data: commits } = await octokit.rest.repos.listCommits(apiParams);

    if (commits.length === 0) {
      throw new Error('No commits found in repository');
    }

    // Extract commit messages
    const commitMessages = commits
      .slice(0, maxCommits || commits.length)
      .map(commit => commit.commit.message)
      .join('\n');

    console.error(`Processing ${maxCommits ? Math.min(maxCommits, commits.length) : commits.length} commits...`);

    console.error('🤖 Generating changelog with OpenAI...');
    
    const SYSTEM_PROMPT = `
You are an expert changelog writer. Produce a Markdown “# Changelog” that mirrors Stripe’s style as closely as possible:

1. **Page header & blurb**  
   - Start with “# Changelog”  
   - Add a one-sentence summary line: e.g. “Keep track of changes and upgrades to the API.”

2. **Version sections**  
   - Use “## <version> – YYYY-MM-DD” headings (if you can't find the version, use the date, and vice versa)
   - Order versions newest-first  

3. **Standard sub-headings**  
   Under each “##” give sections such as:  
   - “### What’s new” (for brand-new features)  
   - “### Enhancements” (for improvements)  
   - “### Bug fixes”  
   - “### Deprecations” or “### Breaking changes” (if needed)

4. **Tables for API-style changes**  
   - Whenever you describe added/removed parameters, render a Markdown table with columns like **Parameter | Change | Notes**

5. **Upgrade notes**  
   - If any change requires user action, add a short “#### Upgrade” bullet list:
     1. Step-by-step instruction  
     2. Example CLI or header settings  

6. **Keep bullets concise & user-focused**  
   - No raw commit hashes or internal jargon  
   - Merge similar items into one line  
`;

    // Generate changelog with OpenAI
    const response = await Promise.race([
      openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: SYSTEM_PROMPT.trim()
          },
          {
            role: 'user',
            content: `Here are ${maxCommits ? Math.min(maxCommits, commits.length) : commits.length} recent commit messages from ${repo}:\n\n${commitMessages}`
          }
        ],
        max_tokens: 1000,
        temperature: 0.25,
      }),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('OpenAI API request timed out after 60 seconds')), 60000)
      )
    ]);

    const changelog = response.choices[0]?.message?.content;
    
    if (!changelog) {
      throw new Error('Failed to generate changelog from OpenAI');
    }

    // Print changelog to stdout
    console.log(changelog);

  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

// Configure CLI
program
  .name('rafiz-changelog-maker')
  .description('Generate a changelog from Git commits using AI')
  .version('1.0.0')
  .requiredOption('-r, --repo <owner/repo>', 'GitHub repository in format "owner/repo"')
  .option('-m, --max <number>', 'Maximum number of commits to process', parseInt)
  .option('-s, --since <date>', 'Only commits after this date (YYYY-MM-DD or ISO 8601)')
  .option('-u, --until <date>', 'Only commits before this date (YYYY-MM-DD or ISO 8601)')
  .action(async (options) => {
    // Validate environment variables
    if (!process.env.OPENAI_API_KEY) {
      console.error('❌ Error: OPENAI_API_KEY environment variable is required');
      console.error('💡 Get your API key from: https://platform.openai.com/api-keys');
      console.error('📝 Set it with: export OPENAI_API_KEY="your_key_here"');
      process.exit(1);
    }

    if (!process.env.GITHUB_TOKEN) {
      console.error('❌ Error: GITHUB_TOKEN environment variable is required');
      console.error('💡 Get your token from: https://github.com/settings/tokens');
      console.error('📝 Set it with: export GITHUB_TOKEN="your_token_here"');
      console.error('ℹ️  For public repos, just needs "public_repo" scope');
      process.exit(1);
    }

    await generateChangelog(options.repo, options.max, options.since, options.until);
  });

// Handle unhandled rejections gracefully
process.on('unhandledRejection', (error) => {
  console.error(`Unhandled error: ${error.message}`);
  process.exit(1);
});

// Parse command line arguments
program.parse(); 