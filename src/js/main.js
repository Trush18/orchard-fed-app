import '../styles/main.scss';
import { renderGallery } from './gallery.js'
import { renderCards } from './cards.js';

async function init() {
  const galleryEl = document.querySelector('#gallery');
  const cardsEl = document.querySelector('#cards');
  try {
    const res = await fetch('./cms.json',{cache:'no-store'});
    if (!res.ok) throw new Error(`Failed to fetch content:${res.status}`);
    const data = await res.json();
    // For SEO purpose updating head(meta tags) from CMS
    if (data.site) {
      document.documentElement.lang = data.site.lang || 'en';
      document.title = data.site.title || document.title;
      const desc = document.querySelector('meta[name="description"]');
      if (desc) desc.setAttribute('content', data.site.description || '');
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical && data.site.canonical) canonical.setAttribute('href', data.site.canonical);
      const ogt = document.querySelector('meta[property="og:title"]');
      if (ogt && data.site.title) ogt.setAttribute('content', data.site.title);
      const ogd = document.querySelector('meta[property="og:description"]');
      if (ogd && data.site.description) ogd.setAttribute('content', data.site.description);
      const ogi = document.querySelector('meta[property="og:image"]');
    }
    renderGallery(data.galleryComponent);
    renderCards(data.cardsComponent)
  }
  catch (err) {
    console.error('Error loading CMS content:', err);
    if (galleryEl) galleryEl.innerHTML = '<p>Failed to load gallery.</p>';
    if (cardsEl) cardsEl.innerHTML = '<p>Failed to load cards.</p>';
  }
}
init();