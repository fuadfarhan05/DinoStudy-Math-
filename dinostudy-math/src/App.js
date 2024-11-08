import React, { useState, useEffect } from 'react';
import { tileNums } from './question'; 
import './App.css';

function App() {
  const [tileNumbers, setTileNumbers] = useState([]); 
  const [clickedNumbers, setClickedNumbers] = useState([]); 
  const [message, setMessage] = useState(""); 

  useEffect(() => {
    
    const numbers = Array.from({ length: 9 }).map(() => tileNums()); 
    setTileNumbers(numbers);
  }, []); 


  const handleTileClick = (number) => {
    if (clickedNumbers.length < 2) {
      setClickedNumbers((prev) => [...prev, number]);

      if (clickedNumbers.length === 1) {
        const sum = clickedNumbers[0] + number;
        if (sum === 10) {
          setMessage("Great! These numbers add up to 10");
        } else {
          setMessage("These numbers don't add up to 10. Try again!");
        }
      }

      // After two clicks, reset the clickedNumbers state to wait for the next pair
      if (clickedNumbers.length === 1) {
        setTimeout(() => {
          setClickedNumbers([]); // Reset clicked numbers after a short delay
        }, 1000); // Wait for 1 second before resetting
      }
    }
  };

  return (
    <div className="App">
      <h1>Dino Study</h1>
      <p>Pick 2 numbers that add up to:</p>
      <h2>10</h2>
      
      {/* Display message */}
      <p>{message}</p>

      {/* Tile Grid */}
      <div className="tile-grid">
        {tileNumbers.map((number, index) => (
          <div
            key={index}
            className="tile"
            onClick={() => handleTileClick(number)} // Pass the number to the click handler
          >
            {number} {/* Display the number on the tile */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
