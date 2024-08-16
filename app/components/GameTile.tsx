import React from 'react';

interface GameTileProps {
  value: number;
}

const GameTile: React.FC<GameTileProps> = ({ value }) => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-sm shadow-md">
      <span className="text-2xl sm:text-4xl font-bold text-gray-800">{value}</span>
    </div>
  );
};

export default GameTile;
