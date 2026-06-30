# Personal Portfolio

A creative, minimal student developer portfolio template built with Vite and React.

## What is included

- Responsive layout for desktop, tablet, and mobile
- Light and dark mode toggle
- English and Spanish content toggle
- Editable portfolio data in `src/data/portfolio.js`
- Profile photo and project screenshot paths managed from `src/data/portfolio.js`
- Project cards with screenshots, GitHub links, and demo buttons
- Resume download file served from `public/`
- GitHub Pages workflow in `.github/workflows/deploy.yml`

## Edit your content

Most personal details live in:

```txt
src/data/portfolio.js
```

Think of that file like the label maker for the website. Change the labels there, and the site updates without digging through every component.

## Add photos and resume

Put public files in `public/` because Vite copies that folder directly into the published site.

Recommended paths:

```txt
public/images/profile.jpg
public/images/project-one.jpg
public/diego-resume.pdf
```

Then update `src/data/portfolio.js`:

```js
profileImage: 'images/profile.jpg',
profileImageAlt: 'Portrait of Diego A Guerrero',
resumePath: 'diego-resume.pdf',
```

Each project can also point to a screenshot:

```js
{
  title: 'Project One',
  image: 'images/project-one.jpg',
  imageAlt: 'Dashboard screenshot for Project One',
  githubUrl: 'https://github.com/MokeyDX/project-one',
  demoUrl: 'https://example.com',
}
```

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
