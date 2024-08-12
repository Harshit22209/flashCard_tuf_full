import React, { useState, useEffect } from "react";
import axios from "axios";
import Flashcard from "./FlashCard";

const Home = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    axios.get("/flashcards").then((response) => {
      setFlashcards(response.data);
    });
  }, []);

  const handleNext = () => {
    setIsFlipped(false)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    
  };

  const handlePrevious = () => {
    setIsFlipped(false)
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length
    );
    
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      {flashcards.length > 0 && (
        <Flashcard
          question={flashcards[currentIndex].question}
          answer={flashcards[currentIndex].answer}
          setFlip={setIsFlipped}
          flip={isFlipped}
        />
      )}
      <div style={{ marginTop: "50px" }}>
        <button
          onClick={handlePrevious}
          style={{
            backgroundColor: "#6a0dad", // Purplish background color
            color: "#ffffff", // White text color
            padding: "10px 20px",
            border: "1px solid #5e0099", // Darker purple border
            cursor: "pointer",
            borderRadius: "5px",
            marginRight: "10px",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#7b1eb7")} // Lighter purple on hover
          onMouseOut={(e) => (e.target.style.backgroundColor = "#6a0dad")}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          style={{
            backgroundColor: "#6a0dad",
            color: "#ffffff",
            padding: "10px 20px",
            border: "1px solid #5e0099",
            cursor: "pointer",
            borderRadius: "5px",
            marginLeft: "10px",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#7b1eb7")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#6a0dad")}
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default Home;
