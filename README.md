# Deploy Pipeline Dashboard

A real-time monitoring dashboard that consolidates deployment health,
performance analytics, and CDN metrics into one place — so developers
spend less time navigating between tools and more time shipping.

Live: [deploy-dashboard-seven.vercel.app](https://deploy-dashboard-seven.vercel.app)

---

## The Problem

Every time a developer pushes code, answering three basic questions
requires jumping between multiple tools:

```
Did the deploy succeed?       → GitHub Actions
Did performance regress?      → Lighthouse / PageSpeed
Is the CDN healthy?           → AWS CloudWatch console
```

This dashboard consolidates all three into one view — updated
automatically after every deploy, no manual steps required.

---

## What It Does

- **Deploy status** — real-time workflow run history from GitHub Actions API
- **Performance scores** — LCP, FID, CLS, and overall Lighthouse score per deploy
- **Performance trend chart** — visualizes score changes across deploys with a target threshold line
- **CDN metrics** — request volume and cache hit rate from AWS CloudFront via CloudWatch
- **One-click rollback** — re-triggers any previous workflow run via the GitHub API

---

## Architecture

```
CMS repo push to main
    ↓
GitHub Actions — build job
    ↓ (needs: build)
GitHub Actions — Lighthouse CI job
    ↓
Lighthouse audits the live site
    ↓
Scores POSTed to dashboard API
    ↓
Saved to Supabase (PostgreSQL)

Dashboard fetches three sources in parallel:
    GitHub API      → deploy status and history
    Supabase        → Lighthouse scores per deploy
    AWS CloudWatch  → CDN cache hit rate and request volume

Matched by run_number → displayed together per deploy
```

---

## Tech Stack

### Frontend

- **Next.js 15** — App Router, server and client components
- **TypeScript** — strict typing across the full stack
- **TanStack Query** — data fetching, caching, background polling
- **Recharts** — performance trend line chart with reference line
- **Tailwind CSS** — dark theme UI

### Backend (Next.js API Routes)

- **GitHub Actions API** — workflow run history and rollback
- **Lighthouse CI** — automated Web Vitals per deploy
- **Supabase (PostgreSQL)** — time-series storage for performance scores
- **AWS SDK v3** — CloudWatch metrics query

### Infrastructure

- **AWS S3** — static asset storage
- **AWS CloudFront** — CDN with Origin Access Control
- **AWS CloudWatch** — CDN performance metrics
- **AWS IAM** — least privilege credentials for dashboard
- **Vercel** — dashboard deployment

---

## Key Technical Decisions

### Transform layer

Raw GitHub API data gets normalized before reaching the UI —
renaming snake_case fields to camelCase, computing derived values
like build duration, and calculating success rate. If GitHub changes
their API, one function needs updating, not the whole codebase.

### Client-side join

Workflow runs come from GitHub. Lighthouse scores come from Supabase.
They're linked by `run_number` — a shared key that exists in both.
`Array.find()` matches them at render time without a backend join.

### Two Supabase clients

A browser client (anon key, respects RLS) for reading data in components.
An admin client (service role key, bypasses RLS) for writing scores
from API routes. Token security — the service role key never reaches
the browser.

### Parallel data fetching

Three TanStack Query hooks run simultaneously on page load.
`Promise.all` in CloudWatch route fetches request volume and cache
hit rate in parallel. Total load time equals the slowest single
request, not the sum of all requests.

### Rollback architecture

The rollback button lives in the RunRow component but the fetch
logic lives in page.tsx — passed down as a callback prop. Child
components signal events upward, parent components own the logic.
One function definition, referenced across all rows without duplication.

---

## What I Learned

This project was built with an AI acting as a senior mentor —
not generating code, but guiding architectural thinking. Every
decision was reasoned through before implementation:

- Why does the transform layer exist?
- When should logic live in the parent vs child component?
- Why offset pagination over cursor for this dataset?
- When to use Sum vs Average in CloudWatch statistics?

The goal was to understand the system well enough to rebuild it
from scratch and explain every decision in a technical interview.
Working this way — understanding the WHY before writing the HOW —
is the difference between completing a project and actually learning
from it.

---

## Local Development

```bash
# Clone the repo
git clone https://github.com/bucket-kim/deploy-dashboard

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Fill in your keys (see Environment Variables below)

# Run dev server
npm run dev
```

---

## Environment Variables

```bash
# GitHub
GITHUB_TOKEN=
GITHUB_OWNER=
GITHUB_REPO=
NEXT_PUBLIC_GITHUB_REPO=

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# AWS
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
AWS_CLOUDFRONT_DISTRIBUTION_ID=
```

---

## Database Schema

```sql
create table lighthouse_scores (
  id uuid default gen_random_uuid() primary key,
  run_id bigint not null,
  run_number int not null,
  lcp numeric,
  fid numeric,
  cls numeric,
  performance_score numeric,
  created_at timestamp with time zone default now()
);
```

---

## Project Context

This is the second project in a portfolio series targeting
mid/senior frontend roles. The first project was a multi-tenant
headless CMS ([kinect-cms.vercel.app](https://kinect-cms.vercel.app))
covering full-stack product thinking, PostgreSQL, and auth.

This project covers the gaps: AWS infrastructure, CI/CD pipelines,
time-series data visualization, performance monitoring, and
real-time data fetching patterns.

Together they demonstrate the full range of skills expected
at mid to senior frontend level.
