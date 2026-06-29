# Personal Portfolio

A creative, minimal student developer portfolio template built with Vite and React.

## What is included

- Responsive layout for desktop, tablet, and mobile
- Light and dark mode toggle
- English and Spanish content toggle
- Editable portfolio data in `src/data/portfolio.js`
- Placeholder project cards with GitHub and demo buttons
- Resume download placeholder
- GitHub Pages workflow in `.github/workflows/deploy.yml`

## Edit your content

Most personal details live in:

```txt
src/data/portfolio.js
```

Think of that file like the label maker for the website. Change the labels there, and the site updates without digging through every component.

## Run locally

```bash
npm install
npm run dev
```

## Build for production

```bash
npm run build
```

## GitHub Pages

The Vite base path is already set for a repository named:

```txt
personal-portfolio
```

After pushing to GitHub, set GitHub Pages to use GitHub Actions. The included workflow will build and deploy the site.
