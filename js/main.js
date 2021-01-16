import refs from './refs.js';
import galleryItems from './gallery-items.js';
import handlers from './handlers.js';

// Вызываем функцию рендера перебором массива

const imgListArray = galleryItems.map((item, index) => handlers.createImgListItem(item, index));

// распыляем массив созданной размет в DOM ul

refs.containerListRef.append(...imgListArray);

// слушатель события на открытие модалки

refs.containerListRef.addEventListener('click', () => {
    if (event.target.nodeName !== 'IMG') {
        return;
    }

    refs.modalWindowRef.classList.add('is-open');
    const currentImgClick = event.target.dataset.source;
    const currentImgIndex = event.target.dataset.index;
    refs.modalImageRef.src = currentImgClick;
    refs.modalImageRef.dataset.index = currentImgIndex;

    // слушатель события на клавишу esc

    window.addEventListener('keydown', handlers.escClickHandler);

    // слушатель события на клавиши вправо\лево

    window.addEventListener('keydown', handlers.rightLeftClickHandler);

    event.preventDefault();
});

// слушатель событи на закрытие модалки по клику на кнопку

refs.closeModalBtnRef.addEventListener('click', () => {
    handlers.onModalClose();
});

// слушатель события на закрытие модалки по клику на overlay

refs.lightBoxOverlay.addEventListener('click', () => {
    handlers.onModalClose();
});