import React from 'react';
import FeedbackForm from './FeedbackForm.jsx';
import FeedbackList from './FeedbackList.jsx';
import FeedbackStats from './FeedbackStats.jsx';

function FeedbackPage({ item, feedback, onAddFeedback }) {
  // Filter feedback to only show reviews for the selected item
  const itemFeedback = feedback.filter(fb => fb.itemId === item.id);

  return (
    <div className="feedback-page">
      <h2>Reviews for: {item.name}</h2>
      <FeedbackForm itemName={item.name} handleAdd={onAddFeedback} />
      <FeedbackStats feedback={itemFeedback} />
      <FeedbackList feedback={itemFeedback} />
    </div>
  );
}

export default FeedbackPage;

