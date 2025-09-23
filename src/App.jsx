import React, { useState, useEffect } from "react";

// --- API Service Logic ---
// To resolve the import errors, the API functions are included directly in this file.
const API_BASE_URL = 'http://localhost:8081/api';

const getCategories = async () => {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return await response.json();
};
const getItems = async () => {
    const response = await fetch(`${API_BASE_URL}/items`);
    if (!response.ok) throw new Error('Failed to fetch items');
    return await response.json();
};
const getFeedbackForItem = async (itemId) => {
    const response = await fetch(`${API_BASE_URL}/feedback?itemId=${itemId}`);
    if (!response.ok) throw new Error('Failed to fetch feedback');
    return await response.json();
};
const addFeedback = async (feedbackData) => {
    const response = await fetch(`${API_BASE_URL}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedbackData),
    });
    if (!response.ok) throw new Error('Failed to add feedback');
    return await response.json();
};

// --- Component Definitions ---
// To resolve import errors, placeholder components are defined here.
const Navbar = () => <nav style={{ padding: '1rem', backgroundColor: '#333', color: 'white', textAlign: 'center' }}>FeedbackHub</nav>;
const CategorySelection = ({ categories, onSelectCategory }) => (
  <div>
    <h2>Select a Category</h2>
    {categories.map(cat => (
      <button key={cat.id} onClick={() => onSelectCategory(cat)} style={{ margin: '0.5rem' }}>
        {cat.name}
      </button>
    ))}
  </div>
);
const ItemList = ({ items, onSelectItem }) => (
  <div>
    {items.map(item => (
      <button key={item.id} onClick={() => onSelectItem(item)} style={{ margin: '0.5rem' }}>
        {item.name}
      </button>
    ))}
  </div>
);
const FeedbackForm = ({ handleAdd }) => {
  const [rating, setRating] = useState(10);
  const [comment, setComment] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    handleAdd({ rating, comment });
    setComment('');
  };
  return (
    <form onSubmit={handleSubmit}>
      <h3>Leave Feedback</h3>
      <input type="number" value={rating} onChange={e => setRating(Number(e.target.value))} min="1" max="10" />
      <input type="text" value={comment} onChange={e => setComment(e.target.value)} placeholder="Enter feedback" />
      <button type="submit">Submit</button>
    </form>
  );
};
const FeedbackList = ({ feedback }) => (
  <div>{feedback.map(f => <div key={f.id}><strong>{f.rating}/10:</strong> {f.comment}</div>)}</div>
);
const FeedbackStats = ({ feedback }) => <h4>{feedback.length} Reviews</h4>;


// --- Main App Component ---

function App() {
  // State for data fetched from the backend
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [feedback, setFeedback] = useState([]);

  // State to manage which part of the UI is shown
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  // State for handling loading and error messages
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- DATA FETCHING ---

  // This `useEffect` hook runs once when the app first loads.
  // It fetches the initial data (categories and items) from your backend.
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setIsLoading(true);
        // Call both API functions at the same time
        const [categoriesData, itemsData] = await Promise.all([
          getCategories(),
          getItems()
        ]);
        setCategories(categoriesData);
        setItems(itemsData);
        setError(null); // Clear any previous errors
      } catch (err) {
        setError("Could not load data. Please make sure the backend server is running on http://localhost:8081.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadInitialData();
  }, []); // The empty array [] ensures this runs only once

  // --- EVENT HANDLERS ---

  // This function is called when a user clicks on an item.
  // It fetches the feedback for that specific item.
  const handleSelectItem = async (item) => {
    setSelectedItem(item);
    try {
      const feedbackData = await getFeedbackForItem(item.id);
      setFeedback(feedbackData);
    } catch (err) {
      setError("Could not load feedback for this item.");
      console.error(err);
    }
  };

  // This function is called when the user submits the feedback form.
  const handleAddFeedback = async (feedbackFromForm) => {
    // We need to structure the payload exactly as the backend expects it.
    const payload = {
      rating: feedbackFromForm.rating,
      comment: feedbackFromForm.comment,
      item: { id: selectedItem.id } // Nest the item with its ID
    };
    try {
      await addFeedback(payload);
      // After successfully adding, refresh the feedback list to show the new entry.
      const updatedFeedback = await getFeedbackForItem(selectedItem.id);
      setFeedback(updatedFeedback);
    } catch (err) {
      setError("Failed to submit your feedback. Please try again.");
      console.error(err);
    }
  };

  // --- UI LOGIC ---

  // This filters the main 'items' list to only show items for the selected category.
  const itemsForSelectedCategory = selectedCategory
    ? items.filter(item => item.category && item.category.id === selectedCategory.id)
    : [];

  return (
    <div>
      <Navbar />
      <header className="hero">
        <h1>FeedbackHub</h1>
        <p>Click a category, pick an item, and leave your feedback!</p>
        {isLoading && <p>Loading data from the server...</p>}
        {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
      </header>

      <main className="main-content">
        {/* Step 1: Show Category Selection */}
        {!selectedCategory && !isLoading && (
          <CategorySelection
            categories={categories}
            onSelectCategory={setSelectedCategory}
          />
        )}

        {/* Step 2: Show Item List for a selected category */}
        {selectedCategory && !selectedItem && (
          <div>
            <h2 style={{ textAlign: "center" }}>{selectedCategory.name} Items</h2>
            <ItemList
              items={itemsForSelectedCategory}
              onSelectItem={handleSelectItem}
            />
            <button onClick={() => setSelectedCategory(null)}>
              Back to Categories
            </button>
          </div>
        )}

        {/* Step 3: Show Feedback page for a selected item */}
        {selectedItem && (
          <div>
            <h2 style={{ textAlign: "center" }}>{selectedItem.name} Feedback</h2>
            <FeedbackForm handleAdd={handleAddFeedback} />
            <FeedbackStats feedback={feedback} />
            <FeedbackList feedback={feedback} />
            <button onClick={() => setSelectedItem(null)}>
              Back to Items
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

