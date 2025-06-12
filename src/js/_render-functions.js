// екземпляр SimpleLightbox для роботи з модальним вікном та зберігай функції для відображення елементів інтерфейсу:
/*
   - createGallery(images). Ця функція повинна приймати масив images, створювати HTML-розмітку для галереї, додавати її в контейнер галереї та викликати метод екземпляра SimpleLightbox refresh(). Нічого не повертає.
   - clearGallery(). Ця функція нічого не приймає та повинна очищати вміст контейнера галереї. Нічого не повертає.
   - showLoader(). Ця функція нічого не приймає, повинна додавати клас для відображення лоадера. Нічого не повертає.
   - hideLoader(). Ця функція нічого не приймає, повинна прибирати клас для відображення лоадера. Нічого не повертає.
*/
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css'; // Импорт стилей

let lightbox; // Объявляем переменную для экземпляра SimpleLightbox

export const createGallery = (images) => {
    const gallery = document.querySelector('.gallery');
   const markup = images.map(image => `
      <li class="gallery-item">
            <a href="${image.largeImageURL}" class="lightbox">
                <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
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
   // Здесь можно добавить вызов SimpleLightbox, если необходимо
    // Инициализация SimpleLightbox, если она еще не инициализирована
    if (!lightbox) {
        lightbox = new SimpleLightbox('.gallery a', {
            captionsData: 'alt', // Используем атрибут alt для подписи
            captionDelay: 250, // Задержка для подписи
        });
    } else {
        lightbox.refresh(); // Обновляем галерею, если экземпляр уже существует
    }
};
/*
<p><strong>Likes</strong> ${image.likes}</p>
<p><strong>Views</strong> ${image.views}</p>
<p><strong>Comments</strong> ${image.comments}</p>
<p><strong>Downloads</strong> ${image.downloads}</p>

<p class="likes">Likes: <span>${image.likes}</span></p>
<p class="views">Views: <span>${image.views}</span></p>
<p class="comments">Comments: <span>${image.comments}</span></p>
<p class="downloads">Downloads: <span>${image.downloads}</span></p>

<li>
   <a href="${image.largeImageURL}" target="_blank">
         <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
   </a>
   <div class="image-info">
      <p><strong>Likes</strong> ${image.likes}</p>
      <p><strong>Views</strong> ${image.views}</p>
      <p><strong>Comments</strong> ${image.comments}</p>
      <p><strong>Downloads</strong> ${image.downloads}</p>
   </div>
</li>

*/


export const clearGallery = () => {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';
};

export const showLoader = () => {
    // Добавьте класс для отображения лоадера, если необходимо
};

export const hideLoader = () => {
    // Уберите класс для скрытия лоадера, если необходимо
};