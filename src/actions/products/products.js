import axios from "axios";



export const searchItems = async (query) => {
    const limit = 4
    try {
        const response = await axios(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`);
        const searchResults = response.data.results || [];
        return searchResults.slice(0, limit);
    } catch (error) {
        console.error('Error searching:', error);
        throw new Error('Internal Server Error');
    }
};

export const searchProduct = async (productId) => {
    try {
        const response = await axios.get(`https://api.mercadolibre.com/items/${productId}`);
        const product = response.data || {};
        return product;
    } catch (error) {
        console.error('Error searching product:', error);
        throw error;
    }
};