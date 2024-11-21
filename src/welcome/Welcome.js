import React from "react";
import "../styles/styles.css";

const Welcome = ({ onStart }) => {
  return (
    <div className="welcome-container">
      <h1>Welcome to Our Survey!</h1>
      <p>We value your feedback. Please take a moment to complete this survey.</p>
      <button onClick={onStart} className="start-btn">Start</button>
    </div>
  );
};

export default Welcome;
