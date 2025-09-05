export function renderGallery(data = []) {
    const galleryEl = document.querySelector('#gallery');
    const imgGrid = document.querySelector('#gallery .img-grid');
    const galleryContent = document.querySelector('.photo-gallery-desc');
    if (!galleryEl || !imgGrid || !galleryContent) return;
    const gallery = Array.isArray(data) ? data[0] : data;
    if (!gallery || !gallery.images?.length) {
        galleryEl.innerHTML = `<p>No Gallery items available</p>`;
        return;
    }

    // render gallery images
    imgGrid.innerHTML = gallery.images.map((item, i) =>
        `<img class="img${i + 1}" 
              src="${item.url}"
              alt="${item.alt || ''}"
              data-caption="${item.caption || ''}"
              data-large="${item.largerUrl || ''}"
              aria-controls="gallery-modal"
              aria-haspopup="dialog"
              role="button" 
              tabindex="0" />`
    ).join('');

    //render gallery content
    galleryContent.innerHTML = gallery?.content?.map((item, i) =>
        item.type == 'paragraph'
            ? `<p class="${item.customClasses}">${item.text}</p>`
            : item.type == 'h1'
                ? `<h1 id="${i === 0 ? 'photo-gallery' : ''}" class="${item.customClasses}">${item.text}</h1>`
                : ''
    ).join('');

    // open modal on ENTER / SPACE for keyboard users
    imgGrid.addEventListener('keydown', (e) => {
        const img = e.target.closest('img[role="button"]');
        if (!img) return;
        if (e.key == 'Enter' || e.key == ' ') {
            e.preventDefault();
            img.click();
        }
    });
    initGalleryModal();
}

export function initGalleryModal() {
    const modal = document.getElementById('gallery-modal');
    if (!modal) return;

    const modalImg = modal.querySelector('img');
    let opener = null;

    //when clicking gallery img -> open modal
    document.querySelectorAll('.img-grid img').forEach(img => {
        img.addEventListener('click', () => {
            opener = document.activeElement;
            modalImg.src = img.dataset.large || img.src;
            modalImg.alt = img.alt;
            modal.classList.add('open');
            modal.setAttribute('aria-hidden', 'false');
            modal.focus();
        });
    });

    function closeModal() {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        modalImg.src = "";
        opener?.focus();
    }

    //close modal
    modal.addEventListener('click', (e) => {
        //clicking outside image closes
        if (e.target == modal) closeModal();
    });

    //close modal on ESC
    document.addEventListener('keydown', (e) => {
        if (e.key == 'Escape' && modal.classList.contains('open')) {
            closeModal();
        }
    });
}