import { default as images } from './gallery-items.js';

const galleryRef = document.querySelector('.js-gallery');
const modalRef = document.querySelector('.js-lightbox');
const originalImgRef = document.querySelector('.lightbox__image');
const btnCloseRef = document.querySelector('button[data-action="close-lightbox"]');
const overlayRef = document.querySelector('.lightbox__overlay');
const btnLeftRef = document.querySelector('button[data-action="move-left"]');
const btnRightRef = document.querySelector('button[data-action="move-right"]');
// const currentImgRef = document.querySelectorAll('.gallery__image');

const imagesHtml = images.map(({ preview, original, description }) => {
    return `
    <li class="gallery__item">
        <a
           class="gallery__link"
           href="${original}"           
        >
            <img
              class="gallery__image"
              src="${preview}"
              data-source="${original}"
              alt="${description}"
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
btnLeftRef.addEventListener('click', onImageMoveLeft);
// btnRightRef.addEventListener('click', onImageMoveRight);

function onOriginalOpen(event) {
    if (event.target.nodeName !== 'IMG') {
        return;
    } 
      
    event.preventDefault();

    modalRef.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    
    const imageUrl = event.target.dataset.source;
    const alt = event.target.alt;    

    originalImgRef.src = imageUrl;
    originalImgRef.alt = alt;
    

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


function onImageMoveLeft() {
   
   console.log(event.target); 
}



