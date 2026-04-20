# Setup Checklist

Use this once after copying the scaffold into a new repo.

## 1. GitHub

1. Create the repository.
2. Create branches:
   `main`
   `qa`
3. Protect `main`. (with rules that prevent pushing directly to it without a pull request)
4. Protect `qa`. (with rules that prevent pushing directly to it without a pull request)
5. Require the `CI` workflow to pass before merging.

## 2. Local App Setup

1. Copy `.env.example` to `.env.local`.
2. Replace every `TODO_TEMPLATE`.
3. Open the repo in Bolt or your AI coding tool.
4. Paste this prompt:

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

5. Let the AI adapt the scaffold to the repo.
6. Confirm:
   `npm ci`
   `npm run build`

## 3. Supabase

Choose one of these:

- Recommended if available: one production project plus one persistent QA branch
- Simpler fallback: one production project plus one separate QA project

Then:

1. Store local values in `.env.local`.
2. Add QA values to the QA Netlify site.
3. Add production values to the production Netlify site.
4. Keep schema changes in `supabase/migrations`.

## 4. Netlify

Create two sites from the same GitHub repo.

### QA site

- Site name: `your-app-qa`
- Production branch: `qa`
- Environment variable: `SITE_ROLE=qa`
- App env vars: QA Supabase values

### Production site

- Site name: `your-app-prod`
- Production branch: `main`
- Environment variable: `SITE_ROLE=prod`
- App env vars: production Supabase values

For both sites:

1. Use the `netlify.toml` in the repo.
2. Disable Deploy Previews in the dashboard if you want zero preview builds.
3. Leave branch deploys off unless you intentionally want them later.

## 5. Team Workflow

1. Branch from `qa`:
   `feature/some-change`
2. Open a PR into `qa`.
3. Merge into `qa` after CI passes.
4. Test the QA site.
5. Open a PR from `qa` into `main`.
6. Merge into `main` when ready to release.

## 6. Release Rule

- Never open feature PRs directly into `main`.
- Treat `qa` as the only branch that can promote changes into production.
