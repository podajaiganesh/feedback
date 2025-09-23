import React from 'react';

function FeedbackStats({ feedback }) {
  const average =
    feedback.length === 0
      ? 0
      : (feedback.reduce((acc, cur) => acc + cur.rating, 0) / feedback.length).toFixed(1);

  return (
    <div className="feedback-stats">
      <h4>{feedback.length} Reviews</h4>
      <h4>Average Rating: {average}</h4>
    </div>
  );
}

export default FeedbackStats;
