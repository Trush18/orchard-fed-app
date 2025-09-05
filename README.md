# Orchard FED Assessment — Frontend Basics

**Repo:** <https://github.com/Trush18/orchard-fed-app>  
**Live (Netlify):** <https://trusha-orchard-assessment.netlify.app/>

A small, fast, accessible build using **Vite + vanilla JavaScript + Sass** (no frontend framework, no CSS framework). Content is treated as **CMS-driven** and hydrated at runtime from `public/cms.json`.

## What’s in the box

Gallery block
  - Renders images + copy from CMS.
  - Click/keyboard opens a modal showing the larger image.
  - ESC closes. focus returns to the opener; page scroll is disabled while open.

Cards block
  - Image, title (as a link), and description from CMS.
  - all link clicks are captured via event delegation and the anchor element (`<a>`) is logged to the console.

Highlights:
  - Accessible (WCAG-aware): keyboard-friendly, visible focus, valid labels, alt text.
  - Responsive: works cleanly from 320px up. tested on Chrome, Edge, Firefox.
  - SEO basics: sensible `<title>`, `<meta description>` and sematic tags are used.

##  Project structure
/public
  cms.json                 # mock CMS payload
  images/...
  icons/...
/src
  js/
    main.js               # fetch cms.json, render Gallery + Cards
    gallery.js            # renderGallery + modal
    cards.js              # renderCards + link logging
  styles/
    main.scss             # reset, variables, utilities, gallery, cards
index.html                # Vite injects built CSS/JS in prod
vite.config.js            # base:'/' for host-agnostic builds

##  Installation steps

```bash
# 1) Install
npm ci

# 2) Dev server (with HMR)
npm run dev

# 3) Production build → dist/
npm run build

# 4) Preview the production build locally
npm run preview
```

## CMS assumptions

All visible content is sourced from a CMS. For the assessment, that’s the local JSON at `public/cms.json`.

> In a real project, authors could also define block types and props in the CMS (not just the text/images). Rendering logic remains in JS/TS for predictability.

## Accessibility (WCAG) highlights

- Landmarks & headings in order (`<main>`, single page `<h1>` via Gallery; Cards uses `<h2>`).
- Keyboard support
  - Thumbnails are focusable; Enter/Space opens the modal.
  - ESC closes the modal; focus returns to the thumbnail you opened from.
- All images have meaningful `alt`.

## SEO basics

- `<title>` and `<meta name="description">` set.
- Canonical link present.
- Semantic, readable HTML and text.

Thanks for taking a look!
