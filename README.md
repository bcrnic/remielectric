# REMIELECTRIC

A React + Vite web app for showcasing REMIELECTRIC services, gallery, and contact details.

Live (GitHub Pages): https://bcrnic.github.io/remielectric/

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- ESLint + Prettier

## Getting Started

Requirements:

- Node.js (recommended: Node 20)
- npm

Install dependencies:

```sh
npm install
```

Start the dev server:

```sh
npm run dev
```

## Scripts

```sh
npm run dev          # start Vite dev server
npm run build        # production build
npm run build:dev    # build using development mode
npm run preview      # preview the production build locally

npm run lint         # run ESLint
npm run format       # format with Prettier
npm run format:check # check formatting (CI)
```

## Deployment (GitHub Pages)

This repository is configured to deploy automatically to GitHub Pages using GitHub Actions.

- Every push to `main` triggers a build and deploy.
- The app is hosted under the project base path: `/remielectric/`.
- Client-side routing is supported on GitHub Pages via a `404.html` SPA fallback.

If you fork/rename the repository, you must update the GitHub Pages base path:

- `vite.config.ts`: `base: "/<repo-name>/"`
- `src/App.tsx`: `BrowserRouter basename={"/<repo-name>"}` (production)

## Notes

- Static assets in `public/` are referenced using Vite `BASE_URL` so they work both locally and on GitHub Pages.
