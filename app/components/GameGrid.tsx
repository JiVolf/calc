import React, { useState, useEffect } from 'react';
import GameTile from './GameTile';

interface GameGridProps {
  level: number;
  onTileSelect: (index: number, value: number) => void;
  usedTileIndices: Set<number>;
}

const GameGrid: React.FC<GameGridProps> = ({ level, onTileSelect, usedTileIndices }) => {
  const [tiles, setTiles] = useState<number[]>([]);

  useEffect(() => {
    const numbers = Array.from({ length: level + 1 }, (_, i) => i);
    const newTiles = Array.from({ length: 16 }, () => 
      numbers[Math.floor(Math.random() * numbers.length)]
    );
    setTiles(newTiles);
  }, [level]);

  return (
    <div className="grid grid-cols-4 gap-1 p-1 bg-gray-800 rounded-lg shadow-lg w-[280px] h-[280px] max-h-[80vh] max-w-[80vh]">
      {tiles.map((value, index) => (
        <div
          key={index}
          onClick={() => !usedTileIndices.has(index) && onTileSelect(index, value)}
          className={`w-full h-full flex items-center justify-center bg-gray-700 rounded-sm shadow-md cursor-pointer ${
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