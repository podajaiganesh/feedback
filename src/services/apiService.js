// The base URL of your Spring Boot backend.
const API_BASE_URL = 'http://localhost:8081/api';

/**
 * Fetches all categories from the backend.
 */
export const getCategories = async () => {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return await response.json();
};

/**
 * Fetches all items from the backend.
 */
export const getItems = async () => {
    const response = await fetch(`${API_BASE_URL}/items`);
    if (!response.ok) throw new Error('Failed to fetch items');
    return await response.json();
};

/**
 * Fetches all feedback for a specific item ID.
 * @param {number} itemId - The ID of the item.
 */
export const getFeedbackForItem = async (itemId) => {
    const response = await fetch(`${API_BASE_URL}/feedback?itemId=${itemId}`);
    if (!response.ok) throw new Error('Failed to fetch feedback');
    return await response.json();
};

/**
 * Adds new feedback to the backend.
 * @param {object} feedbackData - The feedback object, e.g., { rating: 9, comment: "Great!", item: { id: 1 } }.
 */
export const addFeedback = async (feedbackData) => {
    const response = await fetch(`${API_BASE_URL}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedbackData),
    });
    if (!response.ok) throw new Error('Failed to add feedback');
    return await response.json();
};

/**
 * Adds a new category to the backend.
 * @param {object} categoryData - The category data, e.g., { name: "Electronics" }.
 */
export const addCategory = async (categoryData) => {
    const response = await fetch(`${API_BASE_URL}/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryData),
    });
    if (!response.ok) throw new Error('Failed to add category');
    return await response.json();
};

