import React, { useState } from 'react';

// --- API Logic ---
// The base URL of your Spring Boot backend.
const API_BASE_URL = 'http://localhost:8081/api';

/**
 * A function to add a new category by sending a POST request to the backend.
 * @param {object} categoryData - The category data to send. Should be an object like { name: "Electronics" }.
 * @returns {Promise<object>} - A promise that resolves to the saved category object from the backend.
 */
const addCategory = async (categoryData) => {
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
// --- End of API Logic ---

function CategoryForm() {
    // State to hold the value of the input field
    const [categoryName, setCategoryName] = useState('');
    // State to hold and display feedback messages to the user
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        // Prevent the default form submission behavior (page reload)
        event.preventDefault();

        // Basic validation to ensure the input is not empty
        if (!categoryName.trim()) {
            setMessage('Category name cannot be empty.');
            return;
        }

        // This is the object we will send to the backend.
        // The key 'name' MUST match the field in your Java Category entity.
        const categoryData = {
            name: categoryName,
        };

        try {
            // Call the API service function and wait for the response
            const result = await addCategory(categoryData);

            // If successful, show a success message and clear the form
            setMessage(`Successfully created category: "${result.name}" with ID: ${result.id}`);
            setCategoryName(''); // Reset the input field
        } catch (error) {
            // If the API call fails, show an error message
            setMessage('Failed to create category. Is the backend running?');
            console.error(error);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '2rem', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>Add New Category</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="category-name" style={{ display: 'block', marginBottom: '0.5rem' }}>
                        Category Name:
                    </label>
                    <input
                        type="text"
                        id="category-name"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        style={{ width: '100%', padding: '0.5rem' }}
                        required
                    />
                </div>
                <button type="submit" style={{ width: '100%', padding: '0.75rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Save Category
                </button>
            </form>
            {/* Display the success or error message */}
            {message && <p style={{ marginTop: '1rem', textAlign: 'center' }}>{message}</p>}
        </div>
    );
}

export default CategoryForm;

