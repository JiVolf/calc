import React from 'react';
import GameTile from './GameTile';

interface GameUserInputProps {
  selectedTiles: (number | undefined)[];
  onTileRemove: (index: number) => void;
}

const GameUserInput: React.FC<GameUserInputProps> = ({ selectedTiles, onTileRemove }) => {
  return (
    <div className="flex items-center justify-center gap-2 py-1 px-1 bg-gray-700 rounded-sm shadow-lg w-[332px] max-w-[360px] h-16 max-h-[80px]">
      {selectedTiles.map((tile, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <div className="text-white text-2xl font-bold">+</div>
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