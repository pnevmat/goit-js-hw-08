import refs from './refs.js';
import galleryItems from './gallery-items.js';

const handlers = {
    // функция рендера разметки

    createImgListItem: (arr, index) => {
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
    },

    // обработчик события на клавишу esc

    escClickHandler: event => {
        if (event.code === 'Escape') {
            handlers.onModalClose();
        }
    },
    
    // обработчик события на клавиши вправо\лево

    rightLeftClickHandler: event => {
        if (event.code === 'ArrowRight') {
            handlers.pressRight();
        } else if (event.code === 'ArrowLeft') {
            handlers.pressLeft();
        }
    },

    // функция-обработчик события нажатия клавиши вправо

    pressRight: function pressRight() {
        const index = Number(refs.modalImageRef.dataset.index);
        if (index < galleryItems.length - 1) {
            const operation = index + 1;
            handlers.indexProcessor(operation);
        };
    },

    // функция-обработчик события нажатия клавиши влево

    pressLeft: function pressLeft() {
        const index = Number(refs.modalImageRef.dataset.index);
        if (index > 0) {
            const operation = index - 1;
            handlers.indexProcessor(operation);
        }
    },

    // обработчик увеличения\уменьшения индекса на 1

    indexProcessor: function indexProcessor(index) {
        refs.modalImageRef.src = galleryItems[index].original;
        refs.modalImageRef.alt = galleryItems[index].description;
        refs.modalImageRef.dataset.index = index;
    },

    // обработчик закрытия модалки

    onModalClose: function onModalClose() {
        refs.modalWindowRef.classList.remove('is-open');
        refs.modalImageRef.src = '';
        handlers.eventListenerRemover();
    },

    // удаляет слушатели события на esc и клик по оверлею

    eventListenerRemover: function eventListenerRemover() {
        window.removeEventListener('click', handlers.escClickHandler);
        window.removeEventListener('click', handlers.rightLeftClickHandler);
    }
}

export default handlers;