# Deploying this site to Netlify

This repository contains the React app inside `sovran-group-website`.

Netlify build is configured in `netlify.toml` to run the build script and publish the static `build` folder.

Quick checklist

- Ensure Node (>=16) and npm are installed.
- Install dependencies from project root or inside `sovran-group-website`.

Local build steps

1. From repo root:

```bash
cd sovran-group-website
npm install
npm run build

# Build output will be in sovran-group-website/build
ls -la build
```

Using Netlify CLI (manual deploy)

1. Install Netlify CLI globally if you don't have it:

```bash
npm install -g netlify-cli
```

2. Login and link or create a site:

```bash
netlify login
cd sovran-group-website
netlify init    # follow prompts to create or link a site
```

3. Deploy the current build (after running `npm run build`):

```bash
netlify deploy --dir=build --prod
```

Continuous deploy via Git (recommended)

1. Push this repo to GitHub (or another Git provider supported by Netlify).
2. In Netlify app, connect your Git repository, and set build settings:

- Build command: `npm --prefix sovran-group-website run build`
- Publish directory: `sovran-group-website/build`

Netlify will run builds on pushes to the connected branch and publish automatically.

Notes and troubleshooting

- If you use environment variables (API keys, analytics), add them in Netlify UI under Site settings → Build & deploy → Environment.
- For large image processing during build, the optimized build scripts may install `sharp` and other tools; prefer to use the standard `build` command for CI unless you need image processing.
- SPA routing is handled by the redirect in `netlify.toml` which rewrites all routes to `index.html`.
