const imagePadding = 20;
let scrollPerClick;

document.addEventListener('DOMContentLoaded', function() {
    searchBooks("teste", '#launch-results');
    searchBooks("mais vendidos", '#best-seller-results');
});

async function searchBooks(query, selector) {
    const url = 'https://www.googleapis.com/books/v1/volumes?q=' + encodeURIComponent(query);
    try {
        const result = await axios.get(url);
        const books = result.data.items;
        const container = document.querySelector(selector);
        if (!container) {
            return;
        }
        container.innerHTML = '';
        books.forEach((item, index) => {
            container.insertAdjacentHTML(
                "beforeend",
                `<img class="img-${index} slider-img" src="${item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : ''}" alt="Book cover">`
            );
        });
        const firstImage = container.querySelector(".slider-img");
        if (firstImage) {
            scrollPerClick = firstImage.clientWidth + imagePadding;
        }
    } catch (error) {
        console.error('Erro ao buscar livros:', error);
    }
}

function sliderScrollLeft(selector = '.carousel-wrapper') {
    const sliders = document.querySelector(selector);
    if (!sliders) return;
    let scrollAmount = sliders.scrollLeft;
    sliders.scrollTo({
        top: 0,
        left: (scrollAmount -= scrollPerClick),
        behavior: "smooth"
    });
    if (scrollAmount < 0) {
        scrollAmount = 0;
    }
}

function sliderScrollRight(selector = '.carousel-wrapper') {
    const sliders = document.querySelector(selector);
    if (!sliders) return;
    let scrollAmount = sliders.scrollLeft;
    if (scrollAmount <= sliders.scrollWidth - sliders.clientWidth) {
        sliders.scrollTo({
            top: 0,
            left: (scrollAmount += scrollPerClick),
            behavior: "smooth"
        });
    }
}

window.sliderScrollLeft = sliderScrollLeft;
window.sliderScrollRight = sliderScrollRight;
