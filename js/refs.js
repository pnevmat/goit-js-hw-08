const refs = {
    containerListRef: document.querySelector('.js-gallery'),

    // ссылки на кнопки открытия и закрытия модалки

    modalWindowRef: document.querySelector('.js-lightbox'),
    closeModalBtnRef: document.querySelector('[data-action=close-lightbox]'),

    // ссылка на тег img в разметке модалки

    modalImageRef: document.querySelector('.lightbox__image'),

    // ссылка на div.lightbox__overlay

    lightBoxOverlay: document.querySelector('.lightbox__overlay')
}

export default refs;