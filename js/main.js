import galleryItems from './gallery-items.js';

const containerListRef = document.querySelector('.js-gallery');

// функция рендера разметки

const createImgListItem = (arr, index) => {
    const listItemRef = document.createElement('li');
    listItemRef.classList.add('gallery__item');
    const listItemLinkRef = document.createElement('a');
    listItemLinkRef.classList.add('gallery__link');
    listItemLinkRef.href = arr.original;
    const listItemLinkImgRef = document.createElement('img');
    listItemLinkImgRef.classList.add('gallery__image');
    listItemLinkImgRef.src = arr.preview;
    listItemLinkImgRef.alt = arr.description;
    listItemLinkImgRef.dataset.source = arr.original;
    listItemLinkImgRef.dataset.index = index;

    listItemRef.appendChild(listItemLinkRef);
    listItemLinkRef.appendChild(listItemLinkImgRef);

    return listItemRef;
};

// Вызываем функцию рендера перебором массива

const imgListArray = galleryItems.map((item, index) => createImgListItem(item, index));

// распыляем массив созданной размет в DOM ul

containerListRef.append(...imgListArray);

// ссылки на кнопки открытия и закрытия модалки

const modalWindowRef = document.querySelector('.js-lightbox');
const closeModalBtnRef = document.querySelector('[data-action=close-lightbox]');

// ссылка на тег img в разметке модалки

const modalImageRef = document.querySelector('.lightbox__image');

// слушатель события на открытие модалки

containerListRef.addEventListener('click', () => {
    modalWindowRef.classList.add('is-open');
    const currentImgClick = event.target.dataset.source;
    const currentImgIndex = event.target.dataset.index;
    modalImageRef.src = currentImgClick;
    modalImageRef.dataset.index = currentImgIndex;

    event.preventDefault();
});

// слушатель событи на закрытие модалки по клику на кнопку

closeModalBtnRef.addEventListener('click', () => {
    modalWindowRef.classList.remove('is-open');
    modalImageRef.src = '';
});

// ссылка на div.lightbox__overlay

const lightBoxOverlay = document.querySelector('.lightbox__overlay');

// слушатель событи на закрытие модалки по клику на overlay

lightBoxOverlay.addEventListener('click', () => {
    modalWindowRef.classList.remove('is-open');
    modalImageRef.src = '';
});

// слушатель события на клавишу esc

window.addEventListener('keydown', event => {
    if (event.code === 'Escape') {
        modalWindowRef.classList.remove('is-open');
        modalImageRef.src = '';
    } else {}
});

// слушатель события на клавиши вправо\лево

window.addEventListener('keydown', event => {
    if (modalWindowRef.classList[2] === 'is-open') {
        if (event.code === 'ArrowRight') {
            pressRight();
        } else if (event.code === 'ArrowLeft') {
            pressLeft();
        }
    }
});

// функция-обработчик события нажатия клавиши вправо

function pressRight() {
    const index = Number(modalImageRef.dataset.index);
    if (index < galleryItems.length - 1) {
        modalImageRef.src = galleryItems[index + 1].original;
        modalImageRef.alt = galleryItems[index + 1].description;
        modalImageRef.dataset.index = `${index + 1}`;
    };
};

// функция-обработчик события нажатия клавиши влево

function pressLeft() {
    const index = Number(modalImageRef.dataset.index);
    if (index > 0) {
        modalImageRef.src = galleryItems[index - 1].original;
        modalImageRef.alt = galleryItems[index - 1].description;
        modalImageRef.dataset.index = `${index - 1}`;
    };
};