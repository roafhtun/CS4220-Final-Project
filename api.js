// Import necessary modules
import axios from 'axios';

// CoinCap Base URL
const BASE_URL = 'https://api.coincap.io/v2';

// Function to fetch detailed information about a specific asset
export async function fetchAssetInfo(id) {
    try {
        const response = await axios.get(`${BASE_URL}/assets/${id}`);
        return response.data.data; // Return the asset information
    } catch (error) {
        return error;
    }
}

// Function to search assets
export async function searchAssets(search) {
    try {
        const response = await axios.get(`${BASE_URL}/assets?search=${search}`);
        return response.data.data;
    } catch (error) {
        return error;
    }
}