import React, { useState, useEffect } from "react";
import Welcome from "../welcome/Welcome"; // Import the Welcome component
import Question from "../questions/Question";
import "../styles/styles.css"; // Global CSS import

const App = () => {
  const loadQuestions = () => {
    const storedQuestions = localStorage.getItem("questions");
    if (storedQuestions) {
      return JSON.parse(storedQuestions);
    } else {
      const defaultQuestions = [
        { id: "satisfaction", text: "How satisfied are you with our products?", type: "rating", min: 1, max: 5 },
        { id: "priceFairness", text: "How fair are the prices compared to similar retailers?", type: "rating", min: 1, max: 5 },
        { id: "valueForMoney", text: "How satisfied are you with the value for money of your purchase?", type: "rating", min: 1, max: 5 },
        { id: "recommendation", text: "On a scale of 1-10, how would you recommend us to your friends and family?", type: "rating", min: 1, max: 10 },
        { id: "improvement", text: "What could we do to improve our service?", type: "text" },
      ];
      localStorage.setItem("questions", JSON.stringify(defaultQuestions));
      return defaultQuestions;
    }
  };

  const [questions] = useState(loadQuestions());
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(() => {
    const savedAnswers = localStorage.getItem("answers");
    return savedAnswers ? JSON.parse(savedAnswers) : {};
  });
  const [showSurvey, setShowSurvey] = useState(false); // Track whether the survey is shown

  useEffect(() => {
    localStorage.setItem("answers", JSON.stringify(answers));
  }, [answers]);

  const handleAnswerChange = (id, value) => {
    setAnswers((prevAnswers) => ({ ...prevAnswers, [id]: value }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreview = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Answers:", answers);
    alert("Thank you for your feedback!");
  };

  return (
    <div className="survey-container">
      {!showSurvey ? (
        <Welcome onStart={() => setShowSurvey(true)} /> // Render the Welcome screen
      ) : (
        <>
          <h2>Customer Satisfaction Survey</h2>
          <p>{currentQuestionIndex + 1} / {questions.length}</p> {/* Question counter */}
          <form onSubmit={handleSubmit}>
            <Question
              question={questions[currentQuestionIndex]}
              onAnswerChange={handleAnswerChange}
              answer={answers[questions[currentQuestionIndex].id]}
            />

            <div className="navigation-buttons">
              <button type="button" onClick={handlePreview} disabled={currentQuestionIndex === 0}>
                Preview
              </button>
              <button type="button" onClick={handleNext} disabled={currentQuestionIndex === questions.length - 1}>
                Next
              </button>
            </div>

            {currentQuestionIndex === questions.length - 1 && (
              <button type="submit" className="submit-btn">Submit</button>
            )}
          </form>
        </>
      )}
    </div>
  );
};

export default App;

