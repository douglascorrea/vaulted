# Deployment options for Vaulted

## Option 1 — Vercel (fastest)

```bash
cd /Volumes/corsair_1tb_mac/Sites/vaulted
npm run build
# then:
npx vercel login   # if needed
npx vercel --prod
```

Vercel handles routing, HTTPS, and easy URL sharing.

## Option 2 — GitHub Pages (static export)

Since Vaulted has no server runtime, it can be exported as static files.

1. Set `output: 'export'` in `next.config.ts`.
2. Run:

```bash
npm run build
npx next export
```

3. Serve `/out` with any static host.

## Option 3 — Hetzner self-host

- Install Node + PM2
- `npm ci`
- `npm run build`
- `npm start` with PM2 behind NGINX reverse proxy and HTTPS (Let's Encrypt)

## Notes

- If you want full PWA install behavior and HTTPS headers, Vercel is the easiest path.
- I can wire any of these once you confirm preferred host.
