// src/questions/Question.js

import React from "react";

const Question = ({ question, onAnswerChange, answer }) => {
  const { id, text, type, min, max } = question;

  const handleAnswer = (value) => {
    onAnswerChange(id, value);
  };

  if (type === "rating") {
    return (
      <div className="question-container">
        <h3>{text}</h3>
        <div className="rating-buttons">
          {[...Array(max - min + 1)].map((_, index) => {
            const value = min + index;
            return (
              <button
                key={value}
                className={answer === value ? "selected" : "unselected"}
                onClick={() => handleAnswer(value)}
                type="button"
              >
                {value}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (type === "text") {
    return (
      <div className="question-container">
        <h3>{text}</h3>
        <textarea
          value={answer || ""}
          onChange={(e) => handleAnswer(e.target.value)}
          placeholder="Your feedback..."
          rows="4"
        />
      </div>
    );
  }

  return null; // In case the question type is unsupported
};

export default Question;
