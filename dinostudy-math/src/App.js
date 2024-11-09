import React, { useState, useEffect } from 'react';
import { tileNums } from './question'; // Import tileNums function
import './App.css';

function App() {
  const [tileNumbers, setTileNumbers] = useState([]); // State to store the numbers for each tile
  const [clickedNumbers, setClickedNumbers] = useState([]); // State to store the numbers clicked
  const [clickedTiles, setClickedTiles] = useState([]); // State to store the index of clicked tiles
  const [message, setMessage] = useState(""); // State to store the message (e.g., sum result)

  useEffect(() => {
    // Generate numbers for the tiles using tileNums function
    const numbers = Array.from({ length: 9 }).map(() => tileNums());
    setTileNumbers(numbers); // Set the generated numbers in state
  }, []); // Empty dependency array ensures this runs once when the component mounts

  // Function to handle tile clicks
  const handleTileClick = (number, index) => {
    if (clickedNumbers.length < 2) {
      // Add the clicked number to the clickedNumbers array
      setClickedNumbers((prev) => [...prev, number]);

      // Track the index of clicked tiles to apply styling
      setClickedTiles((prev) => [...prev, index]);

      if (clickedNumbers.length === 1) {
        // Check if the two numbers add up to 10
        const sum = clickedNumbers[0] + number;
        if (sum === 10) {
          setMessage("You found a pair that adds up to 10!");
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

  // Function to reset the game state
  const resetGame = () => {
    setClickedNumbers([]); // Clear clicked numbers
    setClickedTiles([]); // Clear clicked tiles
    setMessage(""); // Clear the message
    // Generate new numbers for the tiles
    const numbers = Array.from({ length: 9 }).map(() => tileNums());
    setTileNumbers(numbers);
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
            className={`tile ${clickedTiles.includes(index) ? 'green' : ''}`} // Apply green class if the tile is clicked
            onClick={() => handleTileClick(number, index)} // Pass the number and index to the click handler
          >
            {number} {/* Display the number on the tile */}
          </div>
        ))}
      </div>

      {/* Reset Button */}
      <button onClick={resetGame}>Reset Game</button>
    </div>
  );
}

export default App;
