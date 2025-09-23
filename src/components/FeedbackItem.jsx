import React from 'react';

function FeedbackItem({ item }) {
  return (
    <div className="card feedback-item">
      <div className="rating-display">{item.rating}</div>
      <p className="feedback-text">{item.comment}</p>
    </div>
  );
}

export default FeedbackItem;
