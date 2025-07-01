# rafiz-changelog-maker

> AI-powered CLI **and** sleek Next.js viewer for beautifully formatted changelogs.

---
## Demo

Watch the demo video: [rafiz-changelog-maker walk-through](https://drive.google.com/file/d/1hIvVQxyaGy-qwsv5wmGYMdfb8gqPGwlL/view?usp=sharing)


## What you get

| Part | Purpose |
|------|---------|
| **`src/cli.js`** | Node CLI that fetches Git commits, sends them to OpenAI, and prints a Stripe-style `CHANGELOG.md`. |
| **`app/`**      | Next 14 + Tailwind + daisyUI app that renders that markdown as a dark-themed docs site. |

## Requirements

* Node ≥ 18
* An **OpenAI API key** – `OPENAI_API_KEY`
* A **GitHub token** – `GITHUB_TOKEN` (<https://github.com/settings/tokens>)  
  * Public repos → `public_repo` scope is enough  
  * Private repos → `repo` scope

---

## Quick-start (clone-and-run workflow)

We'll demonstrate with the small, real open-source repo `expressjs/express` and generate a six-month changelog.

```bash
# 1. Clone the monorepo (CLI + viewer in one place)
git clone https://github.com/rafizbd912/my-cool-docs.git
cd my-cool-docs

# 2. Install all deps (CLI + site)
npm install   # or pnpm / yarn

# 3. Set your secrets once per shell
export OPENAI_API_KEY="sk-…"
export GITHUB_TOKEN="ghp_…"

# 4. Generate a changelog – 1 Jan → 30 Jun 2023, max 100 commits
node src/cli.js \
  --repo expressjs/express \
  --since 2023-01-01 \
  --until 2023-06-30 \
  --max 100 \
  > public/CHANGELOG.md      # viewer reads from /public

# 5. Run the docs site locally
npm run dev                  # ▶ http://localhost:3000

# 6. (optional) Produce static HTML for any host
npm run build
npm run export               # → ./out/ with plain HTML/CSS
```

That's it—one repo, one command to write markdown, one command to view it.

> **Why `expressjs/express`?**  ~1 700 commits yet only a few megabytes to fetch, so you see the date-range flags without waiting forever.  Swap in any other repo; just adjust `--repo`, `--since`, `--until`.

---

## ⌨️  CLI reference

```bash
node src/cli.js --repo owner/name [options]

Options:
  -r, --repo <owner/repo>   (required) target repository
  -m, --max  <number>       limit number of commits (default 100)
  -s, --since <YYYY-MM-DD>  only commits after this date
  -u, --until <YYYY-MM-DD>  only commits before this date
```

The tool prints **pure markdown**; redirect wherever you like.

---
## Why these technical & product decisions?

| Area | Choice | Rationale |
|------|--------|-----------|
| **Framework** | **Next.js 14 (App Router)** | Modern React server-components, built-in MDX, easy `next export` to static hosting. |
| **Styling** | **Tailwind CSS 3** | Utility-first means zero context-switch between HTML and CSS; the typography plugin gives beautiful default markdown styles. |
| Theme layer | **daisyUI "forest"** | Instantly provides an accessible dark palette without designing colour tokens from scratch. Easy to swap (`data-theme="forest"`). |
| Sidebar UX | **Sticky + auto-generated anchors** | Readers always know where they are; no manual TOC maintenance—headings drive navigation. |
| Badges & anchors | Small coloured pills + copy-link 🔗 | Fast visual scan of change type, one-click share of any section. |
| **CLI** | Node, Commander.js, Octokit | Zero dependencies for the user beyond Node; Octokit makes authenticated GitHub calls trivial. |
| AI provider | **OpenAI Chat Completion** | Best summarisation quality per cost; one request per changelog keeps latency low. |
| Date filters | `--since / --until` | Most changelogs are tied to release periods, not "last N commits". |
| Output | Pure Markdown | Plays nicely with GitHub releases, npm package READMEs, and static sites like this viewer. |

These choices keep the project **friction-free** for two personas:

1. *Docs consumers* → get a fast, dark-themed site that works even if JavaScript is disabled because it's fully prerendered.
2. *CLI users* → run one command, paste two API keys, and receive production-ready markdown—no vendor lock-in.
---

## Viewer highlights

* Next 14 App Router
* Tailwind 3 + daisyUI "forest" dark theme
* Sticky sidebar with automatic version anchors
* Badges (`New` / `Enhancement` / `Fix`) + copy-link anchors on hover
* Fully static – `next export` deploys to GitHub Pages, Netlify, S3, etc.

---

## 📝 License

[MIT](LICENSE)

## AI Usage
Cursor Pro and ChatGPT for coding help and brainstorming.
