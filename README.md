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

This form uses [Web3Forms](https://web3forms.com/), which is much simpler than running your own mail sender if you just want messages delivered to Gmail.

1. Create a Web3Forms access key tied to `natemhanson@gmail.com`.
2. Add this environment variable in Vercel:

```bash
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=
```

That is enough for the form to work. No verified sending domain is required.

## Recent posts from X

The homepage pulls recent public posts from [@natemhanson](https://x.com/natemhanson) live on each visit, so deleted posts drop off right away. No X API key is required. If the feed is unavailable, the site still links out to the profile.

## Deployment

Push this repo to GitHub, import it into Vercel, and connect `natemhanson.com` plus `www.natemhanson.com` in the Vercel project settings.
