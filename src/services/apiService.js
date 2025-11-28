// src/services/apiService.js

// Docker Compose: Frontend talks to backend using service name "backend"
const API_BASE_URL = 'http://backend:8081/api';

// ========== CATEGORY APIs ==========

// GET: /api/categories
export const getCategories = async () => {
    const res = await fetch(`${API_BASE_URL}/categories`);
    if (!res.ok) throw new Error(`Failed to fetch categories: HTTP ${res.status}`);
    return res.json();
};

// POST: /api/categories
export const addCategory = async (categoryData) => {
    const res = await fetch(`${API_BASE_URL}/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryData),
    });
    if (!res.ok) throw new Error(`Failed to add category: HTTP ${res.status}`);
    return res.json();
};

// ========== ITEMS APIs ==========

// GET: /api/items
export const getItems = async () => {
    const res = await fetch(`${API_BASE_URL}/items`);
    if (!res.ok) throw new Error(`Failed to fetch items: HTTP ${res.status}`);
    return res.json();
};

// ========== FEEDBACK APIs ==========

// GET: /api/feedback?itemId=ID
export const getFeedbackForItem = async (itemId) => {
    const res = await fetch(`${API_BASE_URL}/feedback?itemId=${itemId}`);
    if (!res.ok) throw new Error(`Failed to fetch feedback: HTTP ${res.status}`);
    return res.json();
};

// POST: /api/feedback
export const addFeedback = async (feedbackData) => {
    const res = await fetch(`${API_BASE_URL}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedbackData),
    });
    if (!res.ok) throw new Error(`Failed to add feedback: HTTP ${res.status}`);
    return res.json();
};
