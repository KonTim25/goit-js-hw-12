import fetchData from './js/pixabay-api';
import { createGallery, clearGallery } from './js/render-functions';
import iziToast from 'izitoast';
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const searchText = form.elements['search-text'].value.trim();

    // Проверяем, не пустая ли строка поиска
    if (!searchText) {
        iziToast.error({
            title: 'Error',
            message: 'Please enter a search term',
            position: 'topRight',
        });
        return; // Прерываем выполнение, если строка пустая
    }

    clearGallery(); // Очищаем предыдущие результаты
    loader.style.display = 'block'; // Показываем индикатор загрузки
     setTimeout(() => {
    // Запрос к API
    fetchData(searchText)
        .then(images => {
            if (images.total === 0) {
                iziToast.error({
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                    position: 'topRight',
                });
                return;
            }
            // Создаем галерею с новыми изображениями
            createGallery(images.hits);
        
        })
        .catch(error => {
            console.log(error);
            iziToast.error({
                message: 'An error occurred while fetching images. Please try again later.',
                position: 'topRight',
            });
        })
        .finally(() => {
            loader.style.display = 'none'; // Скрываем индикатор загрузки после завершения
        });
         }, 1500); // 1000 миллисекунд = 1 секунд
    // Очищаем поле ввода после выполнения запроса
    form.elements['search-text'].value = ''; // Очистка поля ввода
});
// Функция для создания галереи
/*
const createGallery = (images) => {
    console.log('img', images);
    const markup = images.map(image => `
        <li>
            <a href="${image.largeImageURL}" target="_blank">
                <img src="${image.webformatURL}" alt="${image.type}" loading="lazy" />
            </a>
            <div>
                <p>Likes: ${image.likes}</p>
                <p>Views: ${image.views}</p>
                <p>Comments: ${image.comments}</p>
                <p>Downloads: ${image.downloads}</p>
            </div>
        </li>
    `).join('');
    console.log('markup',markup);
    gallery.innerHTML = markup; // Добавляем разметку в галерею
};
*/

/*
const query = 'red roses';

fetchData(query).then(data => {
    console.log(data); // Обработка полученных данных
});
*/




/*
import axios from 'axios';

const API_KEY = '50757194-f2b273e514caa2f992e1a47fc';
const searchQuery = 'red roses';
const url = 'https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(searchQuery)}';


axios.get('https://pixabay.com/api/', {
    params: {
        key: API_KEY,
        q: searchQuery,
    
    }
})
.then(response => {
    console.log(response.data);
})
.catch(error => {
    console.error('Error fetching data:', error);
})
*/