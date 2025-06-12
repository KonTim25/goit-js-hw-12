// функції для виконання HTTP-запитів
//const d = getImagesByQuery(query){
    // Ця функція повинна приймати один параметр query (пошукове слово, яке є рядком), здійснювати HTTP-запит і повертати значення властивості data з отриманої відповіді.
    
//}

import axios from 'axios';

const API_KEY = '50757194-f2b273e514caa2f992e1a47fc';

export const fetchData = async (query) => {
    try {
        const response = await axios.get('https://pixabay.com/api/', {
            params: {
                key: API_KEY,
                q: query,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
            }
        });
        
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default fetchData; // Экспортируем как default



// axios.defaults.headers.common["header-name"] = API_KEY;

// export const fetchData = async (query) => {
//     axios.get('https://pixabay.com/api/', {
//     params: {
//         key: API_KEY,
//         q: query,
    
//     }
// })
// .then(response => {
//     console.log(response.data);
//     return response.data
//         })
//         .catch(error => {
//             console.error('Error fetching data:', error);
//         })
// };

// export default fetchData;