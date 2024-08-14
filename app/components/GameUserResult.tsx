import React from 'react';

interface GameUserResultProps {
  level: number;
  isCorrect: boolean | null;
  onCheck: () => void;
  isSelectionComplete: boolean;
}

const GameUserResult: React.FC<GameUserResultProps> = ({ level, isCorrect, onCheck, isSelectionComplete }) => {
  return (
    <div className="flex flex-col items-center justify-center py-5">
      <div 
        className={`text-4xl font-bold bg-gray-800 text-white p-4 rounded-lg shadow-lg 
                    ${isSelectionComplete 
                      ? 'cursor-pointer transition-colors' 
                      : 'cursor-not-allowed bg-red-500 transition-colors'}`}
        onClick={() => isSelectionComplete && onCheck()}
      >
        = {level}
      </div>
      {isCorrect !== null && (
        <div className={`mt-4 text-2xl font-bold ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
          {isCorrect ? 'Správně!' : 'Špatně!'}
        </div>
      )}
    </div>
  );
};

export default GameUserResult;