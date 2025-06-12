import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery, clearGallery, showLoader, hideLoader } from './js/render-functions.js';
import iziToast from 'izitoast';
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');
const loadMoreButton = document.querySelector('.load-more');

let currentPage = 1;
let searchQuery = '';

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    searchQuery = form.elements['search-text'].value.trim();

    if (!searchQuery) {
        iziToast.error({
            title: 'Error',
            message: 'Please enter a search term',
            position: 'topRight',
        });
        return;
    }

    clearGallery();
    showLoader();
    currentPage = 1;

    try {
        const images = await getImagesByQuery(searchQuery, currentPage);
        if (images.length === 0) {
            iziToast.error({
                message: 'Sorry, there are no images matching your search query. Please try again!',
                position: 'topRight',
            });
            loadMoreButton.style.display = 'none';
            return;
        }

        createGallery(images);
        loadMoreButton.style.display = 'block';
    } catch (error) {
        iziToast.error({
            message: 'An error occurred while fetching images. Please try again later.',
            position: 'topRight',
        });
    } finally {
        hideLoader();
    }

    form.elements['search-text'].value = '';
});

loadMoreButton.addEventListener('click', async () => {
    currentPage += 1;
    loadMoreButton.style.display = 'none';
    showLoader();

    try {
        const images = await getImagesByQuery(searchQuery, currentPage);
        if (images.length === 0) {
            loadMoreButton.style.display = 'none';
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results",
                position: 'topRight',
            });
            
            return;
        }

        createGallery(images);
        
        setTimeout(() => {
            const galleryItem = document.querySelector('.gallery-item');
            if (galleryItem) {
                const { height } = galleryItem.getBoundingClientRect();
                window.scrollBy({
                    top: height * 2,
                    behavior: 'smooth',
                });
            }
        }, 300);
        
        loadMoreButton.style.display = 'block'; 
    } catch (error) {
        iziToast.error({
            message: 'An error occurred while fetching images. Please try again later.',
            position: 'topRight',
        });
    } finally {
        hideLoader();
    }
});