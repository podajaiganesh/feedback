// src/services/apiService.js

// CRITICAL FIX: Use the Docker Compose service name 'backend' instead of 'localhost'
// This allows the frontend container to talk to the backend container.
const API_BASE_URL = 'http://localhost:8081/api';

export const getCategories = async () => {
    // Calls: http://backend:8081/api/categories
    const res = await fetch(`${API_BASE_URL}/categories`);
    if (!res.ok) throw new Error(`Failed to fetch categories: HTTP Status ${res.status}`);
    return res.json();
};

export const addCategory = async (categoryData) => {
    // Calls: http://backend:8081/api/categories (POST)
    const res = await fetch(`${API_BASE_URL}/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryData),
    });
    if (!res.ok) throw new Error(`Failed to add category: HTTP Status ${res.status}`);
    return res.json();
};

export const getItems = async () => {
    // Calls: http://backend:8081/api/items
    const res = await fetch(`${API_BASE_URL}/items`);
    if (!res.ok) throw new Error(`Failed to fetch items: HTTP Status ${res.status}`);
    return res.json();
};

export const getFeedbackForItem = async (itemId) => {
    // Calls: http://backend:8081/api/feedback?itemId=X
    const res = await fetch(`${API_BASE_URL}/feedback?itemId=${itemId}`);
    if (!res.ok) throw new Error(`Failed to fetch feedback: HTTP Status ${res.status}`);
    return res.json();
};

export const addFeedback = async (feedbackData) => {
    // Calls: http://backend:8081/api/feedback (POST)
    const res = await fetch(`${API_BASE_URL}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedbackData),
    });
    if (!res.ok) throw new Error(`Failed to add feedback: HTTP Status ${res.status}`);
    return res.json();
};