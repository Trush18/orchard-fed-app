export function renderCards(data = []) {
    const cardsGrid = document.querySelector('#cards .card-grid');
    const title = document.querySelector('#cards .card-grid-title');
    if (!cardsGrid) return;

    const cards = Array.isArray(data) ? data[0] : data;
    if (!cards || !cards.content?.length) {
        cardsGrid.innerHTML = `<p>No cards available.</p>`
        return;
    }
    //render title
    if (title) {
        title.textContent = cards.title || '';
    }
    //render cards
    cardsGrid.innerHTML = cards?.content?.map(item =>
        `<article class="card">
            <img loading="lazy" src="${item.image.url}" class="py-30" alt="${item.image.alt}" />
            <a class="color-link text-white fw-bold" href="${item.link.href}">${item.link.label}</a>
            <p class="fw-light">${item.description}</p>
          </article>`
    ).join('');

    //capturing link clicks
    cardsGrid.addEventListener('click', (e) => {
        const a = e.target.closest('a');
        if (!a) return;
        console.log(a);
        e.preventDefault(); //doing this to retain logs in the console for assessment purpose, as an alternative I can also use target of <a> in new tab.
    });
}