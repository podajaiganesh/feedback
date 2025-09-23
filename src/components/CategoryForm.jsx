import React, { useState, useEffect } from "react";

// --- API Service Logic ---
// Central place for all calls to your Spring Boot backend.
const API_BASE_URL = 'http://localhost:8081/api';

const apiService = {
  getCategories: async () => {
    const res = await fetch(`${API_BASE_URL}/categories`);
    if (!res.ok) throw new Error('Failed to fetch categories');
    return res.json();
  },
  addCategory: async (categoryData) => {
    const res = await fetch(`${API_BASE_URL}/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryData),
    });
    if (!res.ok) throw new Error('Failed to add category');
    return res.json();
  },
  getItems: async () => {
    const res = await fetch(`${API_BASE_URL}/items`);
    if (!res.ok) throw new Error('Failed to fetch items');
    return res.json();
  },
  getFeedbackForItem: async (itemId) => {
    const res = await fetch(`${API_BASE_URL}/feedback?itemId=${itemId}`);
    if (!res.ok) throw new Error('Failed to fetch feedback');
    return res.json();
  },
  addFeedback: async (feedbackData) => {
    const res = await fetch(`${API_BASE_URL}/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(feedbackData),
    });
    if (!res.ok) throw new Error('Failed to add feedback');
    return res.json();
  }
};

// --- Component Definitions ---
// All your components are defined here to avoid import errors.

const Navbar = () => <nav className="navbar">FeedbackHub</nav>;

const AddCategoryForm = ({ onCategoryAdded }) => {
    const [categoryName, setCategoryName] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!categoryName.trim()) {
            setMessage('Category name cannot be empty.');
            return;
        }
        try {
            const result = await apiService.addCategory({ name: categoryName });
            setMessage(`Success! Added "${result.name}"`);
            setCategoryName('');
            onCategoryAdded(); // This tells the main App to refresh the category list
        } catch (error) {
            setMessage('Failed to add category. Is the backend running?');
            console.error(error);
        }
    };

    return (
        <div className="card form-card">
            <h2>Add New Category</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <input
                        type="text"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        placeholder="e.g., Electronics, Books..."
                        required
                    />
                    <button type="submit">Save Category</button>
                </div>
                {message && <p className="message">{message}</p>}
            </form>
        </div>
    );
};


const CategorySelection = ({ categories, onSelectCategory }) => (
  <div className="card-container">
    {categories.map((cat) => (
      <div key={cat.id} className="card category-card" onClick={() => onSelectCategory(cat)}>
        <h3>{cat.name}</h3>
      </div>
    ))}
  </div>
);

const ItemList = ({ items, onSelectItem }) => (
  <div className="card-container">
    {items.map((item) => (
      <div key={item.id} className="card item-card" onClick={() => onSelectItem(item)}>
        <p>{item.name}</p>
      </div>
    ))}
  </div>
);

const FeedbackForm = ({ handleAdd }) => {
  const [rating, setRating] = useState(10);
  const [comment, setComment] = useState('');
  const handleSubmit = (e) => { e.preventDefault(); handleAdd({ rating, comment }); setComment(''); setRating(10); };
  return ( <form onSubmit={handleSubmit}> <input type="number" min="1" max="10" value={rating} onChange={(e) => setRating(Number(e.target.value))} /> <input type="text" placeholder="Write a review" value={comment} onChange={(e) => setComment(e.target.value)} /> <button type="submit">Send</button> </form> );
};

const FeedbackList = ({ feedback }) => ( <div> {feedback.map((item) => ( <div key={item.id} className="card feedback-card"> <div className="rating-display">{item.rating}</div> <p>{item.comment}</p> </div> ))} </div> );
const FeedbackStats = ({ feedback }) => ( <div className="feedback-stats"> <h4>{feedback.length} Reviews</h4> </div> );


// --- Main App Component ---

function App() {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadCategories = async () => {
      try {
        setIsLoading(true);
        const catData = await apiService.getCategories();
        setCategories(catData);
        setError(null);
      } catch (err) {
        setError("Could not load data. Is the backend running at http://localhost:8081?");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
  };

  useEffect(() => {
    const loadInitialData = async () => {
        await loadCategories(); // Load categories
        const itemData = await apiService.getItems(); // Also load all items
        setItems(itemData);
    };
    loadInitialData();
  }, []);

  const handleSelectItem = async (item) => {
    setSelectedItem(item);
    const feedbackData = await apiService.getFeedbackForItem(item.id);
    setFeedback(feedbackData);
  };

  const handleAddFeedback = async (newFeedback) => {
    const payload = { ...newFeedback, item: { id: selectedItem.id } };
    await apiService.addFeedback(payload);
    const updatedFeedback = await apiService.getFeedbackForItem(selectedItem.id);
    setFeedback(updatedFeedback);
  };

  const categoryItems = selectedCategory ? items.filter((item) => item.category.id === selectedCategory.id) : [];

  return (
    <>
      <style>{`
        body { font-family: sans-serif; margin: 0; background-color: #f4f7f9; }
        .navbar { background-color: #333; color: white; padding: 1rem; text-align: center; font-size: 1.2rem; }
        .hero { text-align: center; padding: 2rem 1rem; }
        .main-content { max-width: 800px; margin: auto; padding: 1rem; }
        .card { background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); padding: 1.5rem; margin-bottom: 1rem; }
        .card-container { display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center; }
        .category-card, .item-card { cursor: pointer; text-align: center; transition: transform 0.2s; }
        .category-card:hover, .item-card:hover { transform: translateY(-5px); }
        .input-group { display: flex; }
        .input-group input { flex-grow: 1; padding: 0.75rem; border: 1px solid #ccc; border-radius: 4px 0 0 4px; }
        .input-group button { padding: 0.75rem 1.5rem; border: none; background: #007bff; color: white; border-radius: 0 4px 4px 0; cursor: pointer; }
        .message { color: green; text-align: center; margin-top: 1rem; }
        button { background: #555; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 4px; cursor: pointer; display: block; margin: 2rem auto; }
      `}</style>
      
      <Navbar />
      <header className="hero">
        <h1>FeedbackHub</h1>
        <p>Your full-stack application is live!</p>
      </header>

      <main className="main-content">
        {isLoading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        
        {!isLoading && !error && (
          <>
            <AddCategoryForm onCategoryAdded={loadCategories} />
            <hr style={{margin: '2rem 0'}}/>

            {!selectedCategory && (
                <>
                    <h2>Select a Category</h2>
                    {categories.length > 0 ? (
                        <CategorySelection categories={categories} onSelectCategory={setSelectedCategory} />
                    ) : (
                        <p>No categories found. Please add one using the form above.</p>
                    )}
                </>
            )}

            {selectedCategory && !selectedItem && (
              <div>
                <h2 style={{ textAlign: "center" }}>{selectedCategory.name} Items</h2>
                <ItemList items={categoryItems} onSelectItem={handleSelectItem} />
                <button onClick={() => setSelectedCategory(null)}>Back to Categories</button>
              </div>
            )}

            {selectedItem && (
              <div>
                <h2 style={{ textAlign: "center" }}>{selectedItem.name} Feedback</h2>
                <FeedbackForm handleAdd={handleAddFeedback} />
                <FeedbackStats feedback={feedback} />
                <FeedbackList feedback={feedback} />
                <button onClick={() => setSelectedItem(null)}>Back to Items</button>
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
}

export default App;

    

