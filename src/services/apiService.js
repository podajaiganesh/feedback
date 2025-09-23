// src/api.js or wherever you define API calls
const API_BASE_URL = 'http://localhost:8081/api/categories';

export const getCategories = async () => {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return await response.json();
};
