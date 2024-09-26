import React, { useState, useEffect } from 'react';
import GameTile from './GameTile';
import { playSound } from '../utils/AudioUtils';

interface GameGridProps {
  level: number;
  startLevel: number;
  onTileSelect: (index: number, value: number) => void;
  onTileRemove: (selectionIndex: number) => void;  // Change the parameter to be the selection index
  usedTileIndices: Set<number>;
  selectedTileIndices: (number | undefined)[];     // Track selected tile indices
}

const getCombinations = (arr: number[], length: number): number[][] => {
  if (length === 1) return arr.map((v) => [v]);
  return arr.flatMap((v, i) =>
    getCombinations(arr.slice(i + 1), length - 1).map((c) => [v, ...c])
  );
};

const hasValidCombination = (grid: number[], target: number): boolean => {
  const combinations = getCombinations(grid, 4);
  return combinations.some(
    (combo) => combo.reduce((acc, num) => acc + num, 0) === target
  );
};

const GameGrid: React.FC<GameGridProps> = ({ level, onTileSelect, onTileRemove, usedTileIndices, selectedTileIndices }) => {
  const [tiles, setTiles] = useState<number[]>([]);

  const handleTileSelectOrRemove = (index: number, value: number) => {
    // Find the index of the tile in the selectedTileIndices array
    const selectionIndex = selectedTileIndices.indexOf(index);

    if (selectionIndex !== -1) {
      // If the tile is already selected, remove it
      playSound('unselect');
      onTileRemove(selectionIndex); // Call onTileRemove with the correct selection index
    } else {
      // If the tile is not selected, select it
      playSound('select');
      onTileSelect(index, value); // Call onTileSelect if it's not selected
    }
  };

  useEffect(() => {
    const generateValidGrid = () => {
      const numbers = Array.from({ length: level + 1 }, (_, i) => i);
      let newTiles;

      do {
        newTiles = Array.from({ length: 16 }, () =>
          numbers[Math.floor(Math.random() * numbers.length)]
        );
      } while (!hasValidCombination(newTiles, level));

      return newTiles;
    };

    setTiles(generateValidGrid());
  }, [level]);

  return (
    <div className="grid grid-cols-4 gap-1 py-2 m-1 sm:p-0 bg-gray-800 rounded-sm shadow-md w-full max-w-2xl aspect-square ">
      {tiles.map((value, index) => (
        <div
          key={index}
          onClick={() => handleTileSelectOrRemove(index, value)} // Use the new function for both select and remove
          className={`w-full h-full flex items-center justify-center bg-gray-800 rounded-sm shadow-md cursor-pointer ${
            usedTileIndices.has(index) ? 'opacity-50' : ''
          }`}
        >
          <GameTile value={value} />
        </div>
      ))}
    </div>
  );
};

export default GameGrid;
