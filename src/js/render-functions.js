import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox;

export const createGallery = (images) => {
    const gallery = document.querySelector('.gallery');
    const markup = images.map(image => `
        <li class="gallery-item">
            <a href="${image.largeImageURL}" class="lightbox">
                <img src="${image.webformatURL}" alt="${image.tags}" />
            </a>
            <div class="image-info">
                <p><strong>Likes</strong> ${image.likes}</p>
                <p><strong>Views</strong> ${image.views}</p>
                <p><strong>Comments</strong> ${image.comments}</p>
                <p><strong>Downloads</strong> ${image.downloads}</p>
            </div>
        </li>
    `).join('');

    gallery.innerHTML = markup;

    if (!lightbox) {
        lightbox = new SimpleLightbox('.gallery a', {
            captionsData: 'alt',
            captionDelay: 250,
        });
    } else {
        lightbox.refresh();
    }
};

export const clearGallery = () => {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = ''; 
};

export const showLoader = () => {
    const loader = document.querySelector('.loader');
    loader.style.display = 'block';
};

export const hideLoader = () => {
    const loader = document.querySelector('.loader');
    loader.style.display = 'none';
};