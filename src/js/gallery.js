export function renderGallery(items = []) {
    const galleryEl = document.querySelector('#gallery');
    const imgGrid = document.querySelector('#gallery .img-grid');
    const galleryContent = document.querySelector('.photo-gallery-desc');
    if (!galleryEl || !imgGrid || !galleryContent) return;
    if (!items.length) {
        galleryEl.innerHTML = `<p>No Gallery items available</p>`;
        return;
    }
    // render images
    imgGrid.innerHTML = items[0].images.map(item =>
        `<img src="${item.url}"
            alt="${item.alt || ''}"
            caption="${item.caption}"
            data-large="${item.largerUrl || ''}"
        />`
    ).join('');
    //render content
    galleryContent.innerHTML = items[0].content.map(item =>
        item.type == 'paragraph'
            ? `<p class="${item.customClasses}">${item.text}</p>`
            : item.type == 'h1'
                ? `<h1 class="${item.customClasses}">${item.text}</h1>`
                : ''
    ).join('');
    initGalleryModal();
}

export function initGalleryModal() {
    const modal = document.getElementById('galleryModal');
    if (!modal) return;

    const modalImg = document.querySelector('#galleryModal img');

    //when clicking gallery img -> open modal
    document.querySelectorAll('.img-grid img').forEach(img => {
        img.addEventListener('click', () => {
            modalImg.src = img.dataset.large || img.src;
            modalImg.alt = img.alt;
            modal.classList.add('open');
            modal.setAttribute('aria-hidden', 'false');
        });
    });

    function closeModal() {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        modalImg.src = "";
    }

    //close modal
    modal.addEventListener('click', (e) => {
        //clicking outside image closes
        if (e.target == modal) closeModal();
    });
    //close modal ESC
    document.addEventListener('keydown', (e) => {
        if (e.key == 'Escape' && modal.classList.contains('open')) {
            closeModal();
        }
    });
}