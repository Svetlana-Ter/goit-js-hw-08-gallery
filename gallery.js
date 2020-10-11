import { default as images } from './gallery-items.js';

const galleryRef = document.querySelector('.js-gallery');
const modalRef = document.querySelector('.js-lightbox');
const originalImgRef = document.querySelector('.lightbox__image');
const btnCloseRef = document.querySelector('button[data-action="close-lightbox"]');
const overlayRef = document.querySelector('.lightbox__overlay');
const btnPrevRef = document.querySelector('button[data-action="move-prev"]');
const btnNextRef = document.querySelector('button[data-action="move-next"]');

const imagesHtml = images.map((image) => {
    return `
    <li class="gallery__item">
        <a
           class="gallery__link"
           href="${image.original}"           
        >
            <img
              class="gallery__image"
              src="${image.preview}"
              data-source="${image.original}"
              data-index="${images.indexOf(image)}"
              alt="${image.description}"
            />
        </a>
    </li>
    
    `
}).join('');

galleryRef.insertAdjacentHTML('afterbegin', imagesHtml);

galleryRef.addEventListener('click', onOriginalOpen);
btnCloseRef.addEventListener('click', onOriginalClose);
overlayRef.addEventListener('click', onOriginalClose);
window.addEventListener('keydown', onOriginalCloseEsc);
btnPrevRef.addEventListener('click', onImageShowPrev);
btnNextRef.addEventListener('click', onImageShowNext);

function onOriginalOpen(event) {
    if (event.target.nodeName !== 'IMG') {
        return;
    } 
      
    event.preventDefault();

    modalRef.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    
    const imageUrl = event.target.dataset.source;
    const alt = event.target.alt;    
    const index = event.target.dataset.index;

    originalImgRef.src = imageUrl;
    originalImgRef.alt = alt;
    originalImgRef.dataset.index = index;    
}

function onOriginalClose() {
    modalRef.classList.remove('is-open');    
    originalImgRef.src = '';
    originalImgRef.alt = '';

}

function onOriginalCloseEsc(ev) {
    if (ev.code !== 'Escape') {
        return;
    };
    onOriginalClose();
}

function onImageShowPrev() {
    let index = Number(originalImgRef.dataset.index);
    if (index === 0) {
        index = images.length - 1;
    } else {
       index -= 1;
    }       
    originalImgRef.src = images[index].original;
    originalImgRef.alt = images[index].description;
    originalImgRef.dataset.index = index;
}

function onImageShowNext() {
    let index = Number(originalImgRef.dataset.index);
     if (index === images.length - 1) {
        index = 0;
    } else {
        index += 1;  
    }      
    originalImgRef.src = images[index].original;
    originalImgRef.alt = images[index].description;
    originalImgRef.dataset.index = index;
}