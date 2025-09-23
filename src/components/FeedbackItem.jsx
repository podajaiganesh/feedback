import React from 'react';

function FeedbackItem({ item }) {
  const stars = "★".repeat(item.rating) + "☆".repeat(5 - item.rating);

  return (
    <div className="card feedback-item">
      <div className="rating-display">{item.rating}</div>
      <div className="feedback-details">
        <span className="author">{item.author}</span>
        <span className="product-tag">{item.product}</span>
      </div>
      <p className="feedback-text">{item.text}</p>
      <div style={{ color: '#ffc107', fontSize: '1.2rem' }}>{stars}</div>
    </div>
  );
}

export default FeedbackItem;
