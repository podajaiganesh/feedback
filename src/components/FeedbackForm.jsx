import React, { useState } from 'react';

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
        />
        <label>Comment</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your feedback here..."
        />
        {message && <p style={{ color: 'red' }}>{message}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FeedbackForm;
