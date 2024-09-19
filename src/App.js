import React, { useState } from "react";
import "./styles.css"; // не забудьте создать файл .css для стилей

const generateTiles = () => {
  const colors = [
    "red",
    "blue",
    "green",
    "yellow",
    "purple",
    "orange",
    "pink",
    "cyan",
  ];
  const tiles = [];

  // Удостоверимся, что у нас 16 плиток (8 пар)
  for (let i = 0; i < 8; i++) {
    tiles.push(colors[i], colors[i]); // добавляем пару плиток одного цвета
  }

  // Перемешиваем плитки
  return tiles.sort(() => Math.random() - 0.5);
};

const MemoryGame = () => {
  const [tiles, setTiles] = useState(generateTiles());
  const [flippedTiles, setFlippedTiles] = useState([]);
  const [matchedTiles, setMatchedTiles] = useState([]);
  const [moves, setMoves] = useState(0);

  const handleTileClick = (index) => {
    if (flippedTiles.length >= 2 || matchedTiles.includes(index)) return;
    setFlippedTiles((prev) => [...prev, index]);

    if (flippedTiles.length === 1) {
      setMoves((prev) => prev + 1);
      checkMatch(flippedTiles[0], index);
    }
  };

  const checkMatch = (firstIndex, secondIndex) => {
    if (tiles[firstIndex] === tiles[secondIndex]) {
      setMatchedTiles((prev) => [...prev, firstIndex, secondIndex]);
      setFlippedTiles([]);
    } else {
      setTimeout(() => {
        setFlippedTiles([]);
      }, 1000);
    }
  };

  const isTileFlipped = (index) =>
    flippedTiles.includes(index) || matchedTiles.includes(index);

  const isGameFinished = matchedTiles.length === tiles.length;

  return (
    <div className="memory-game">
      <h2>Memory Game</h2>
      <h3>Moves: {moves}</h3>
      <div className="board">
        {tiles.map((color, index) => (
          <div
            key={index}
            className={`tile ${isTileFlipped(index) ? "flipped" : ""}`}
            onClick={() => handleTileClick(index)}
            style={{ background: isTileFlipped(index) ? color : "gray" }}
          >
            {isTileFlipped(index) ? color : ""}
          </div>
        ))}
      </div>
      {isGameFinished && (
        <h2>Congratulations! You finished the game in {moves} moves.</h2>
      )}
    </div>
  );
};

export default MemoryGame;
