import '../styles/main.scss';
import { renderGallery } from './gallery.js'
import { renderCards } from './cards.js';

async function init() {
    const galleryEl = document.querySelector('#gallery');
    const cardsEl = document.querySelector('#cards');
    try {
        const res = await fetch('../../content.json');
        if (!res.ok) throw new Error(`Failed to fetch content:${res.status}`);
        const data = await res.json();
        renderGallery(data.galleryContent);
        renderCards(data.cardsContent)
    }
    catch (err) {
        console.error('Error loading CMS content:', err);
        if (galleryEl) galleryEl.innerHTML = '<p>Failed to load gallery.</p>';
        if (cardsEl) cardsEl.innerHTML = '<p>Failed to load cards.</p>';
    }
}
init();