# Netlify + Supabase Starter Scaffold

This folder is a drop-in starter for a website repo that should use:

- GitHub for source control and pull requests
- GitHub Actions for validation only
- Netlify for hosted QA and production deploys
- Supabase for local development, QA, and production data/services

The workflow is intentionally simple:

1. Create feature branches from `qa`
2. Open a pull request into `qa`
3. Let GitHub Actions run checks only
4. Merge into `qa` to deploy the QA site
5. Test on QA against the QA Supabase environment
6. Open a pull request from `qa` into `main`
7. Merge into `main` to deploy production

This avoids wasting Netlify builds on every feature commit while keeping a safe hosted QA environment.

## Quick Start

If you are new to Git, Netlify, or Supabase, follow only these 4 steps first:

1. Copy all files from this folder into the root of your website repo.
2. Open that repo in Bolt.
3. Copy the prompt from the `Bolt Prompt` section below and paste it into Bolt.
4. Let Bolt inspect the repo and adapt the scaffold before you change anything manually.

After that, continue with the checklist in `docs/setup-checklist.md`.

## Start Here

If you are using Bolt or another AI coding tool, do not try to manually merge these files by guessing.

Do this instead:

1. Copy all files from this folder into the root of your website repo.
2. Open the repo in Bolt.
3. Paste the prompt below.
4. Let Bolt inspect the repo and adapt the scaffold to the actual project.

## Bolt Prompt

Use this exact prompt:

```text
I copied a Netlify + Supabase starter scaffold into this repo.

Your job is to adapt it to this specific project without changing the intended workflow:

- feature branches should not deploy
- qa branch should deploy to the QA Netlify site
- main branch should deploy to the production Netlify site
- GitHub Actions should run validation only
- Supabase should support local development plus QA and production

Please do this in order:

1. Inspect package.json and detect the real package manager, scripts, and build command.
2. Inspect the framework and routing setup by checking the project files.
3. Update netlify.toml so the build command, publish directory, and routing rules match this project.
4. Update .env.example so it reflects the env vars this project actually uses.
5. Update .github/workflows/ci.yml so it uses the correct install, test, lint, typecheck, and build commands for this repo.
6. Keep the branch strategy and Netlify QA/prod deployment logic intact.
7. Do not add deploy-on-every-branch behavior.
8. Replace simple placeholders like "your-app" with this project's real name where needed.
9. Explain what you changed in simple language.

Before editing anything, first summarize:
- what stack this repo is using
- what files you inspected
- what you plan to change
```

If Bolt asks questions you do not understand, tell it:

- keep `qa` as the staging branch
- keep `main` as production
- do not deploy feature branches
- prefer the simplest safe setup
- do not remove the Netlify ignore logic unless replacing it with an equally strict rule

## Folder Contents

- `.github/workflows/ci.yml`: GitHub checks for pull requests and protected branches
- `.github/pull_request_template.md`: keeps PRs consistent for beginners
- `.env.example`: local env template
- `netlify.toml`: Netlify build config with an ignore hook
- `scripts/netlify-ignore.js`: skips Netlify builds that are not for the intended environment branch
- `supabase/config.toml`: local Supabase config
- `supabase/migrations/20260415000000_initial_schema.sql`: starter migration placeholder
- `docs/setup-checklist.md`: copy this into the target repo and follow it once

## Recommended Environment Model

### Git branches

- `main`: production
- `qa`: hosted QA / staging
- `feature/*`: normal development branches

### Netlify sites

Create two Netlify sites from the same GitHub repository:

1. `your-app-qa`
2. `your-app-prod`

For the QA site:

- Production branch: `qa`
- Environment variable: `SITE_ROLE=qa`

For the production site:

- Production branch: `main`
- Environment variable: `SITE_ROLE=prod`

Both sites should use the same `netlify.toml`.

The ignore script makes Netlify skip:

- deploy previews
- branch deploys
- pushes to the wrong branch for that site

That means:

- feature branch pushes do not deploy
- merging into `qa` deploys the QA site only
- merging into `main` deploys the production site only

## Supabase Model

Use three environments:

- Local: each developer runs Supabase locally with the CLI
- QA: one persistent hosted branch or separate QA project
- Production: the main production project

Recommended rule:

- Feature work uses local Supabase by default
- QA deploys point to QA Supabase credentials
- Production deploys point to production Supabase credentials

If your team is new to Supabase, start with:

- one production project
- one persistent QA branch if your plan supports branching

If branching is not available or feels too complex, use:

- one production Supabase project
- one separate QA Supabase project

The app-side workflow remains the same either way.

## How To Use This Scaffold

1. Copy the contents of this folder into the root of the website repo.
2. Ask Bolt or your AI coding tool to adapt the scaffold to the actual app stack using the prompt above.
3. Review the changed files.
4. Create the `qa` branch in GitHub.
5. Create the two Netlify sites and set their production branches.
6. Add Netlify environment variables for QA and production.
7. Create local, QA, and production Supabase credentials.
8. Turn on branch protection for `qa` and `main`.

## What You Still Need To Edit

- `netlify.toml`
- `.env.example`
- `.github/workflows/ci.yml`
- `supabase/migrations/20260415000000_initial_schema.sql`
- `docs/setup-checklist.md`

Search for `TODO_TEMPLATE` after copying the files over.
