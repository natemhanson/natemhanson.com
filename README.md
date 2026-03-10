# natemhanson.com

Personal site for Nate Hanson, built with Next.js and intended for deployment on Vercel.

## Local development

```bash
npm install
npm run dev
```

## Production checks

```bash
npm run lint
npm run build
```

## Contact form setup

Set these environment variables in Vercel:

```bash
RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=
```

`CONTACT_TO_EMAIL` is the private inbox that should receive form submissions.
`CONTACT_FROM_EMAIL` should be an address on a verified sending domain in Resend.

## Deployment

Push this repo to GitHub, import it into Vercel, and connect `natemhanson.com` plus `www.natemhanson.com` in the Vercel project settings.
