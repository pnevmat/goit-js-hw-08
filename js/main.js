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

    listItemRef.appendChild(listItemLinkRef);
    listItemLinkRef.appendChild(listItemLinkImgRef);

    return listItemRef;
};

const imgListArray = galleryItems.map(galleryItems => createImgListItem(galleryItems));

containerListRef.append(...imgListArray);

containerListRef.addEventListener('click', () => {
    const currentImgClick = Event.currentTarget.dataset.source;
    console.log(currentImgClick);
});