// The base URL of your Spring Boot backend.
// CORRECTED: The port is now 6969 to match the running backend container.
const API_BASE_URL = 'http://localhost:6969/api';

/**
 * Fetches all categories from the backend.
 */
export const getCategories = async () => {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return await response.json();
};