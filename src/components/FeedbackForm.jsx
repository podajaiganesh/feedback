import React, { useState } from 'react';

// This form is now aligned with your backend's Feedback entity
function FeedbackForm({ handleAdd }) {
  const [rating, setRating] = useState(10);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim().length < 5) {
      setMessage('Comment must be at least 5 characters long.');
      return;
    }
    // handleAdd expects an object with { rating, comment }
    handleAdd({ rating, comment });
    setComment('');
    setRating(10);
    setMessage('');
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit}>
        <h2>We'd love to hear from you!</h2>

        <label>Rating (1-10)</label>
        <input
          type="number"
          min="1"
          max="10"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
        />

        <label>Comment</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your feedback here..."
          style={{ width: '100%', padding: '0.5rem', minHeight: '80px' }}
        />

        {message && <p style={{ color: 'red' }}>{message}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FeedbackForm;
