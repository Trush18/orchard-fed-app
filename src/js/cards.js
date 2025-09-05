export function renderCards(items = []) {
    const cardsGrid = document.querySelector('#cards .card-grid');
    const title= document.querySelector('#cards .card-grid-title');
    if (!cardsGrid) return;
    if (!items.length) {
        cardsGrid.innerHTML = `<p>No cards available.</p>`
        return;
    }
    //render title
    if(title) {
        title.innerHTML = `${items[0].title}`
    }
    //render cards
    cardsGrid.innerHTML = items[0].content.map(item =>
        `<article class="card">
            <img src="${item.image.url}" class="py-30" alt="${item.image.alt}" />
            <a class="color-link text-white fw-bold" href="${item.link}">${item.header}</a>
            <p class="fw-light">${item.description}</p>
          </article>`
    ).join('');

    //capture link clicks
    cardsGrid.querySelectorAll('a').forEach(link => {
        link.addEventListener('click',(e) => {
            console.log('Card link clicked',e.target);
            e.preventDefault();
        })
    })
}