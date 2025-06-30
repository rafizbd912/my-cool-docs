#!/usr/bin/env node
// chmod +x src/cli.js

const { Command } = require('commander');
const { Octokit } = require('@octokit/rest');
const OpenAI = require('openai');

const program = new Command();

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Initialize Octokit
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

async function generateChangelog(repo, maxCommits) {
  try {
    const [owner, repoName] = repo.split('/');
    
    if (!owner || !repoName) {
      throw new Error('Repository must be in format "owner/repo"');
    }

    console.error(`Fetching commits from ${repo}...`);
    
    // Fetch commits from GitHub
    const { data: commits } = await octokit.rest.repos.listCommits({
      owner,
      repo: repoName,
      per_page: maxCommits || 100,
    });

    if (commits.length === 0) {
      throw new Error('No commits found in repository');
    }

    // Extract commit messages
    const commitMessages = commits
      .slice(0, maxCommits || commits.length)
      .map(commit => commit.commit.message)
      .join('\n');

    console.error(`Processing ${maxCommits ? Math.min(maxCommits, commits.length) : commits.length} commits...`);

    // Generate changelog with OpenAI
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that creates clean, organized changelogs. Convert the given commit messages into a bullet-style changelog starting with "# Changelog". Group similar changes together and use clear, user-friendly language. Focus on features, fixes, and improvements that users would care about.'
        },
        {
          role: 'user',
          content: `Please convert these commit messages into a clean changelog:\n\n${commitMessages}`
        }
      ],
      max_tokens: 1000,
      temperature: 0.3,
    });

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
  .action(async (options) => {
    // Validate environment variables
    if (!process.env.OPENAI_API_KEY) {
      console.error('Error: OPENAI_API_KEY environment variable is required');
      process.exit(1);
    }

    if (!process.env.GITHUB_TOKEN) {
      console.error('Error: GITHUB_TOKEN environment variable is required');
      process.exit(1);
    }

    await generateChangelog(options.repo, options.max);
  });

// Handle unhandled rejections gracefully
process.on('unhandledRejection', (error) => {
  console.error(`Unhandled error: ${error.message}`);
  process.exit(1);
});

// Parse command line arguments
program.parse(); 