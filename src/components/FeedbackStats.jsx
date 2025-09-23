import React from 'react';

function FeedbackStats({ feedback }) {
  // Calculate average rating
  const average =
    feedback.length === 0
      ? 0
      : feedback.reduce((acc, cur) => {
          return acc + cur.rating;
        }, 0) / feedback.length;

  // Format to one decimal place, remove trailing .0 if it exists
  const formattedAverage = average.toFixed(1).replace(/[.,]0$/, '');

  return (
    <div className="feedback-stats">
      <h4>{feedback.length} Reviews</h4>
      <h4>Average Rating: {isNaN(formattedAverage) ? 0 : formattedAverage} / 5</h4>
    </div>
  );
}

export default FeedbackStats;
