import React from 'react';

interface GameTileProps {
  value: number;
}

const GameTile: React.FC<GameTileProps> = ({ value }) => {
  return (
    <div className="w-14 h-14 flex items-center justify-center bg-white rounded-sm shadow-md">
      <span className="text-2xl font-bold text-gray-800">{value}</span>
    </div>
  );
};

export default GameTile;
