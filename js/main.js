import galleryItems from './gallery-items.js';

const containerListRef = document.querySelector('.js-gallery');

// функция рендера разметки

const createImgListItem = (arr) => {
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
    listItemLinkImgRef.dataset.index = arr.dataindex;

    listItemRef.appendChild(listItemLinkRef);
    listItemLinkRef.appendChild(listItemLinkImgRef);

    return listItemRef;
};

// Вызываем функцию рендера перебором массива

const imgListArray = galleryItems.map(galleryItems => createImgListItem(galleryItems));

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
    modalImageRef.src = currentImgClick;
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

let startIndex = '';

window.addEventListener('keydown', event => {
    // console.log('Event is on');
    // console.dir(modalWindowRef.classList);
    // debugger;
    if (modalWindowRef.classList[2] === 'is-open') {
        // console.dir(event.target);
        if (event.code === 'ArrowLeft') {
            startIndex = event.target.childNodes[0].dataset.index;
            startIndex = Number(startIndex - 1);
            modalImageRef.src = galleryItems[startIndex].original;
            console.log(modalImageRef.src);
        }
    }
});