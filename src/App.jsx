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

  // useEffect to handle the message logic after clickedNumbers is updated
  useEffect(() => {
    if (clickedNumbers.length === 2) {
      // Check if the two numbers add up to 10
      const sum = clickedNumbers[0] + clickedNumbers[1];
      if (sum === 10) {
        setMessage("Correct, Find as many as you can!");
      } else {
        setMessage("Hmmmmm those two don't add up to 10. Try again!");
        setClickedTiles([]); 
      }

      setTimeout(() => {
        setClickedNumbers([]);
        // setClickedTiles([]); 
      }, 1000); 
      
    }
  }, [clickedNumbers]); // This effect runs whenever clickedNumbers changes

  // Function to handle tile clicks
  const handleTileClick = (number, index) => {
    if (clickedNumbers.length < 2) {
      // Add the clicked number to the clickedNumbers array
      setClickedNumbers((prev) => [...prev, number]);

      // Track the index of clicked tiles to apply styling
      setClickedTiles((prev) => [...prev, index]);
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
      <h2>Dino Study</h2>
      <p>Pick 2 numbers that add up to:</p>
      <h1>10</h1>

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
      <button onClick={resetGame}>Play Again</button>
    </div>
  );
}

export default App;
