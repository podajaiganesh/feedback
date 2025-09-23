import React from 'react';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">FeedbackHub</div>
      <ul className="nav-links">
        <li><a href="#feedback-form">Submit Feedback</a></li>
        <li><a href="#feedback-stats">Stats</a></li>
        <li><a href="#feedback-list">All Feedback</a></li>
        <li><a href="#categories">Categories</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
