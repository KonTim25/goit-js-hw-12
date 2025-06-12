import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery, clearGallery, showLoader, hideLoader } from './js/render-functions.js'; // Импортируем функции
import iziToast from 'izitoast';
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const searchText = form.elements['search-text'].value.trim();

    if (!searchText) {
        iziToast.error({
            title: 'Error',
            message: 'Please enter a search term',
            position: 'topRight',
        });
        return;
    }

    clearGallery();
    showLoader();

    getImagesByQuery(searchText)
        .then(images => {
            if (images.length === 0) {
                iziToast.error({
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                    position: 'topRight',
                });
                return;
            }

            createGallery(images); 
        })
        .catch(error => {
            iziToast.error({
                message: 'An error occurred while fetching images. Please try again later.',
                position: 'topRight',
            });
        })
        .finally(() => {
            hideLoader();
        });
    
    form.elements['search-text'].value = '';
});
