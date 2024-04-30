import axios from 'axios';

const BASE_URL = 'https://api.coincap.io/v2';

export async function getDetails(id) {
    try {
        const response = await axios.get(`${BASE_URL}/items/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Error retrieving item details');
    }
}

export async function searchByTerm(searchTerm) {
    try {
        const response = await axios.get(`${BASE_URL}/search`, {
            params: {
                q: searchTerm
            }
        });
        return response.data.map((item) => ({
            id: item.id,
            text: item.name
        }));
    } catch (error) {
        throw new Error('Error searching items');
    }
}
