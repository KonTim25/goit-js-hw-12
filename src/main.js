import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton } from './js/render-functions.js';
import iziToast from 'izitoast';
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');
const loadMoreButton = document.querySelector('.load-more');
const searchData = document.querySelector('.search-data');
let currentPage = 1;
let searchQuery = '';
let searchDataText = '';

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
        const data = await getImagesByQuery(searchQuery, currentPage);

        if (data.hits.length === 0) {
            iziToast.error({
                message: 'Sorry, there are no images matching your search query. Please try again!',
                position: 'topRight',
            });
            hideLoadMoreButton();
            return;
        }

        createGallery(data.hits);

        searchDataText = `<p><strong>Search phrase</strong>: ${searchQuery}, <strong>Total imades:</strong> ${data.total}, <strong>Total hits:</strong> ${data.totalHits}, <strong>Images pp:</strong> ${data.hits.length}, <strong>Total pages:</strong> ${Math.ceil(data.totalHits / 15)}</p>`;
        searchData.innerHTML = searchDataText;

        if (currentPage * 15 >= data.totalHits) {
            hideLoadMoreButton();
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results",
                position: 'topRight',
            });
        } else {
            showLoadMoreButton();
        }
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
    hideLoadMoreButton();
    showLoader();

    try {
        const data = await getImagesByQuery(searchQuery, currentPage);

        if (data.hits.length === 0) {
            hideLoadMoreButton();
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results",
                position: 'topRight',
            });
            
            return;
        }

        createGallery(data.hits);
        
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
        
        if (currentPage * 15 >= data.totalHits) {
            hideLoadMoreButton();
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results",
                position: 'topRight',
            });
        } else {
            showLoadMoreButton();
        }
        
    } catch (error) {
        iziToast.error({
            message: 'An error occurred while fetching images. Please try again later.',
            position: 'topRight',
        });
    } finally {
        hideLoader();
    }
});