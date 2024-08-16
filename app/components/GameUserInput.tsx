import React from 'react';
import GameTile from './GameTile';

interface GameUserInputProps {
  selectedTiles: (number | undefined)[];
  onTileRemove: (index: number) => void;
}

const GameUserInput: React.FC<GameUserInputProps> = ({ selectedTiles, onTileRemove }) => {
  return (
    <div className="flex items-center justify-center gap-2 p-2 m-1 bg-gray-800 rounded-sm shadow-lg w-full max-w-[600px] max-h-[160px]">
      {selectedTiles.map((tile, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <div className="text-white text-3xl font-bold">+</div>
          )}
          <div 
            className="w-14 h-14 bg-white rounded-sm shadow-md flex items-center justify-center cursor-pointer"
            onClick={() => onTileRemove(index)} 
          >
            {tile !== undefined && (
              <GameTile value={tile} />
            )}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default GameUserInput;