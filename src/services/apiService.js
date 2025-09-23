// The base URL of your Spring Boot backend.
const API_BASE_URL = 'http://localhost:8081/api';

/**
 * A function to add a new category by sending a POST request to the backend.
 * @param {object} categoryData - The category data to send. Should be an object like { name: "Electronics" }.
 * @returns {Promise<object>} - A promise that resolves to the saved category object from the backend.
 */
export const addCategory = async (categoryData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/categories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(categoryData),
        });

        // If the server responds with a non-success status code, throw an error.
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the JSON response from the backend.
        const result = await response.json();
        return result;

    } catch (error) {
        console.error("Failed to add category:", error);
        // Re-throw the error so the component can catch it and display a message.
        throw error;
    }
};

/**
 * A function to fetch all existing categories from the backend.
 * @returns {Promise<Array>} - A promise that resolves to an array of category objects.
 */
export const getCategories = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/categories`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch categories:", error);
        throw error;
    }
};

// You can add more functions here for items and feedback following the same pattern.
// export const addItem = async (itemData) => { ... };
// export const getItems = async () => { ... };
