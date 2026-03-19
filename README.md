# Vaulted

**Vaulted** is a privacy-first net worth tracker built for people who want control over their money data.

No accounts. No bank logins. No syncing to the cloud. Your data stays in-browser.

## Why this exists

Every week in `r/personalfinance` and `r/Fire`, people ask for alternatives to mainstream finance apps because they:

- don’t want to link bank accounts
- don’t trust cloud privacy defaults
- want simple, mobile-first net worth tracking

Vaulted ships quickly on this gap.

## Features (MVP)

- Add and edit assets and liabilities manually
- Track in multiple currencies
- Local-first storage with no backend
- Monthly snapshots and net-worth history chart
- Offline-capable PWA
- CSV/JSON import + JSON export
- Privacy-first onboarding banner and clear local data policy

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Recharts
- Lucide icons

## Run locally

```bash
cd /Volumes/corsair_1tb_mac/Sites/vaulted
npm install
npm run dev
```

Then open http://localhost:3000

## Build

```bash
npm run build
```

## Repo

GitHub: https://github.com/douglascorrea/vaulted

## Product philosophy

Vaulted is intentionally scoped narrow:
- no AI (at least in v1)
- no bank integrations
- no account and no login
- zero server-side user data

If this resonates, we can add an optional paid sync layer later.
