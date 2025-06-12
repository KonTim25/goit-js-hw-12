import axios from 'axios';

const API_KEY = '50757194-f2b273e514caa2f992e1a47fc';

export const getImagesByQuery = async (query) => {
    try {
        const response = await axios.get('https://pixabay.com/api/', {
            params: {
                key: API_KEY,
                q: query,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
            },
        });
        return response.data.hits;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};