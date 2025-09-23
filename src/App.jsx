import React, { useState, useEffect } from "react";

// Import all your components
import Navbar from "./components/Navbar";
import CategorySelection from "./components/CategorySelection";
import ItemList from "./components/ItemList";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackList from "./components/FeedbackList";
import FeedbackStats from "./components/FeedbackStats";

// Import all the functions that talk to your backend
import { getCategories, getItems, getFeedbackForItem, addFeedback, addCategory } from './services/apiService';

// This is a simple form to add new categories. It could also be in its own file.
const AddCategoryForm = ({ onCategoryAdded }) => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim()) {
            setMessage('Category name cannot be empty.');
            return;
        }
        try {
            await addCategory({ name });
            setName('');
            setMessage(`Successfully added category: ${name}`);
            onCategoryAdded(); // This tells the App component to refresh the category list
        } catch (error) {
            setMessage('Failed to add category. Is the backend running?');
        }
    };

    return (
        <div className="card">
            <h2>Add New Category</h2>
            <form onSubmit={handleSubmit}>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter new category name"
                    style={{width: '70%', padding: '0.5rem'}}
                />
                <button type="submit" style={{width: '30%', padding: '0.5rem'}}>Add</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

function App() {
  // State for data fetched from the backend
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [feedback, setFeedback] = useState([]);

  // State to manage the UI flow (what the user sees)
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  // State for loading and error messages
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to load all initial data from the backend
  const loadData = async () => {
    try {
      setIsLoading(true);
      const [catData, itemData] = await Promise.all([getCategories(), getItems()]);
      setCategories(catData);
      setItems(itemData);
      setError(null);
    } catch (err) {
      setError("Could not load data. Please make sure the backend server is running.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // This `useEffect` hook runs only once when the component first loads
  useEffect(() => {
    loadData();
  }, []);

  // Handler for when a user selects an item
  const handleSelectItem = async (item) => {
    setSelectedItem(item);
    try {
        const feedbackData = await getFeedbackForItem(item.id);
        setFeedback(feedbackData);
    } catch (err) {
        setError("Could not load feedback for this item.");
    }
  };

  // Handler for when a user submits new feedback
  const handleAddFeedback = async (feedbackFromForm) => {
    const payload = {
        ...feedbackFromForm, // contains rating and comment
        item: { id: selectedItem.id } // nests the item ID as required by the backend
    };
    try {
        await addFeedback(payload);
        // After adding, refresh the feedback list to show the new entry
        const updatedFeedback = await getFeedbackForItem(selectedItem.id);
        setFeedback(updatedFeedback);
    } catch (err) {
        setError("Failed to submit feedback.");
    }
  };

  // Filter the master list of items to only show those for the selected category
  const itemsForSelectedCategory = selectedCategory
    ? items.filter(item => item.category?.id === selectedCategory.id)
    : [];

  return (
    <div>
      <Navbar />
      <main className="main-content">
        {isLoading && <p>Loading data from server...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        
        {!isLoading && !error && (
          <>
            {/* VIEW 1: No category or item selected */}
            {!selectedCategory && !selectedItem && (
              <>
                <AddCategoryForm onCategoryAdded={loadData} />
                <hr />
                {categories.length > 0 ? (
                  <CategorySelection categories={categories} onSelectCategory={setSelectedCategory} />
                ) : <p>No categories found. Use the form above to add one!</p>}
              </>
            )}

            {/* VIEW 2: Category selected, but no item yet */}
            {selectedCategory && !selectedItem && (
              <>
                <h2>{selectedCategory.name} Items</h2>
                <ItemList items={itemsForSelectedCategory} onSelectItem={handleSelectItem} />
                <button onClick={() => setSelectedCategory(null)}>Back to Categories</button>
              </>
            )}

            {/* VIEW 3: Both category and item selected */}
            {selectedItem && (
              <>
                <h2>{selectedItem.name} Feedback</h2>
                <FeedbackForm handleAdd={handleAddFeedback} />
                <FeedbackStats feedback={feedback} />
                <FeedbackList feedback={feedback} />
                <button onClick={() => setSelectedItem(null)}>Back to Items</button>
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;

