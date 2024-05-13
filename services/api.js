import axios from 'axios';

const BASE_URL = 'https://api.coincap.io/v2';

export async function getDetails(id) {
    try {
        const response = await axios.get(`${BASE_URL}/assets/${id}`);
        return response.data.data;
    } catch (error) {
        console.error('Error retrieving asset details:', error);
        throw new Error('Error retrieving asset details');
    }
}

export async function searchByTerm(searchTerm) {
    try {
        const response = await axios.get(`${BASE_URL}/assets`, {
            params: {
                search: searchTerm,
                limit: 10 // Adjust the limit for search results
            }
        });
        return response.data.data.map((item) => ({
            id: item.id,
            text: `${item.name} (${item.symbol})`
        }));
    } catch (error) {
        console.error('Error searching items:', error);
        throw new Error('Error searching items');
    }
}
