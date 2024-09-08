import React, { useState, useEffect } from 'react';
import GameTile from './GameTile';
import { playSound } from '../utils/AudioUtils';

interface GameGridProps {
  level: number;
  startLevel: number;
  onTileSelect: (index: number, value: number) => void;
  usedTileIndices: Set<number>;
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

const GameGrid: React.FC<GameGridProps> = ({ level, onTileSelect, usedTileIndices }) => {
  const [tiles, setTiles] = useState<number[]>([]);

  const handleTileSelect = (index: number, value: number) => {
    if (!usedTileIndices.has(index)) {
      playSound('select');
      onTileSelect(index, value);
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
          onClick={() => handleTileSelect(index, value)}
          className={`w-full h-full flex items-center justify-center bg-gray-800 rounded-sm shadow-md cursor-pointer ${
            usedTileIndices.has(index) ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <GameTile value={value} />
        </div>
      ))}
    </div>
  );
};

export default GameGrid;
