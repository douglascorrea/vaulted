# Vaulted — Launch Copy

## One-liner
Track your net worth without giving away your logins, your inbox, or your life.

## Elevator pitch
Vaulted is a free, privacy-first net worth tracker. No account. No bank login. No Plaid. Your data stays in your browser — never on our servers. Add assets and debts manually, watch your net worth trend over time, and export backups whenever you want. Works offline. Installs like an app.

---

## Reddit Post — r/personalfinance

**Title:** I built a free net worth tracker that doesn't ask for your bank login

**Body:**

Every time someone asks for a net worth tracker here, the top answer is a spreadsheet. And honestly, spreadsheets are great — but I wanted something a bit nicer that still respects your privacy.

So I built **Vaulted** — a free, local-first net worth tracker.

**What it does:**
- Track assets (cash, stocks, crypto, real estate, retirement) and liabilities (mortgage, loans, credit cards)
- See your net worth trend over time with monthly snapshots
- Visual breakdown of where your money sits (donut chart)
- Multi-currency support (USD, EUR, BRL, GBP, CAD, AUD, JPY)
- CSV import if you're migrating from a spreadsheet
- JSON export/import for backups

**What it doesn't do:**
- No account creation — ever
- No bank login or Plaid integration
- No data sent to any server
- No ads, no tracking, no email capture

Everything runs in your browser. Your data is stored locally (IndexedDB + localStorage). If you clear your browser data, you lose your vault — so export backups regularly (the app reminds you).

It's a PWA, so you can install it on your phone or desktop and use it offline.

**Try it:** https://vaultedworth.com

It's 100% free and open source: https://github.com/douglascorrea/vaulted

I'd love feedback on what's missing or what would make this more useful for you.

---

## Reddit Post — r/FIRE

**Title:** Free, private net worth tracker — no Plaid, no account, runs in your browser

**Body:**

Built this for the privacy-conscious FIRE crowd. Vaulted is a net worth tracker that:

✅ Runs entirely in your browser — zero server, zero cloud
✅ No bank login, no Plaid, no account
✅ Monthly snapshots with trend chart
✅ Multi-currency (USD, EUR, BRL, GBP, etc.)
✅ PWA — install on phone, works offline
✅ CSV import + JSON export for backups

I know a lot of FIRE folks track in spreadsheets, which is great — this is just a prettier alternative if you want visual charts without giving a third party your financial data.

https://vaultedworth.com (free, open source)

Happy to hear what features would make this useful for your FIRE tracking.

---

## Reddit Post — r/privacytoolsIO / r/privacy

**Title:** I built a net worth tracker that stores nothing — no account, no server, no tracking

**Body:**

Most finance apps require bank logins, email signups, or at minimum send your data to their servers. I wanted something different.

**Vaulted** is a privacy-first net worth tracker:

- 100% client-side — no server, no database, no analytics
- No account, no email, no Plaid
- Data stored in IndexedDB + localStorage (your browser, your device)
- Manual entry only — you type your balances, not link your bank
- PWA with offline support
- JSON export/import for portable backups
- Open source: https://github.com/douglascorrea/vaulted

The trade-off is obvious: no automatic sync. You update your numbers manually (monthly snapshots work great for this). In return, nobody else ever sees your data.

Try it: https://vaultedworth.com

Feedback welcome — especially from the privacy community.

---

## Hacker News

**Title:** Show HN: Vaulted – Local-first, privacy-first net worth tracker (no account, no server)

**Body:**

I built Vaulted because every net worth tracker I found required either a bank login (Plaid) or an account with cloud storage. I just wanted to see my net worth trend without sharing my financial data with anyone.

Vaulted runs entirely in the browser. Data is stored in IndexedDB with localStorage fallback. No server, no API calls, no analytics. It's a Next.js static site deployed on GitHub Pages.

Features:
- Assets + liabilities with categories
- Monthly snapshots + net worth trend chart
- Multi-currency support
- CSV import, JSON export
- PWA (installable, works offline)
- Backup reminders (since data is local-only)

Tech: Next.js 16, TypeScript, Tailwind, Recharts, IndexedDB

Live: https://vaultedworth.com
Source: https://github.com/douglascorrea/vaulted

I'd love to hear what the HN community thinks — especially about the local-first approach and whether it's worth adding optional encrypted cloud sync later.

---

## Twitter/X Thread

**Tweet 1:**
I built a net worth tracker that doesn't ask for your bank password.

No account. No Plaid. No server. Your data stays in your browser.

It's free and open source → https://vaultedworth.com

🧵 Here's why:

**Tweet 2:**
Every finance app wants your bank login. Mint did. Copilot does. Monarch does.

I just wanted to see "am I richer than last month?" without giving a startup my Chase password.

**Tweet 3:**
So I built Vaulted:
✅ Add assets + debts manually
✅ Track net worth over time
✅ Monthly snapshots + charts
✅ Multi-currency
✅ Works offline (PWA)
✅ CSV import + JSON export

All runs in your browser. Zero server.

**Tweet 4:**
The trade-off: no auto-sync from your bank.
The upside: nobody can leak your financial data because nobody has it.

Manual updates take ~2 min/month if you do monthly snapshots. Worth it for peace of mind.

**Tweet 5:**
It's open source and free forever:
🔗 https://vaultedworth.com
💻 https://github.com/douglascorrea/vaulted

If you track your net worth and care about privacy, give it a try. Feedback welcome 🙏
