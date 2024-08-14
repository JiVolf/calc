import React, { useState, useEffect } from 'react';
import HUD from '../components/HUD';
import GameGrid from '../components/GameGrid';
import GameUserInput from '../components/GameUserInput';
import GameUserResult from '../components/GameUserResult';

export default function Index() {
  const [health, setHealth] = useState(3);
  const [level, setLevel] = useState(1);
  const [time, setTime] = useState(30);
  const [selectedTiles, setSelectedTiles] = useState<(number | undefined)[]>([undefined, undefined, undefined, undefined]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [usedTileIndices, setUsedTileIndices] = useState<Set<number>>(new Set());
  const [selectedTileIndices, setSelectedTileIndices] = useState<(number | undefined)[]>([undefined, undefined, undefined, undefined]);
  const isSelectionComplete = selectedTiles.every(tile => tile !== undefined);
  

  const resetGame = () => {
    setHealth(3);
    setLevel(1);
    setTime(30);
    setSelectedTiles([undefined, undefined, undefined, undefined]);
    setIsCorrect(null);
    setUsedTileIndices(new Set());
  };

  const decreaseHealth = () => {
    setHealth(prev => {
      const newHealth = prev - 1;
      if (newHealth <= 0) {
        resetGame();
        return 3;
      }
      return newHealth;
    });
  };

  const increaseHealth = () => {
    setHealth(prev => Math.min(3, prev + 1));
  };

  const increaseLevel = () => {
    setLevel(prev => prev + 1);
    setTime(30); 
    setSelectedTiles([undefined, undefined, undefined, undefined]); 
    setIsCorrect(null);
    setUsedTileIndices(new Set());
  };

  const decreaseLevel = () => {
    setLevel(prev => Math.max(1, prev - 1));
  };

  useEffect(() => {
    if (time > 0) {
      const timerId = setTimeout(() => setTime(time - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      decreaseHealth();
      setTime(30); 
    }
  }, [time]);

  const handleTileSelect = (index: number, value: number) => {
    const firstEmptyIndex = selectedTiles.findIndex(tile => tile === undefined);
    if (firstEmptyIndex !== -1 && !usedTileIndices.has(index)) {
      setSelectedTiles(prev => {
        const newTiles = [...prev];
        newTiles[firstEmptyIndex] = value;
        return newTiles;
      });
      setSelectedTileIndices(prev => {
        const newIndices = [...prev];
        newIndices[firstEmptyIndex] = index;
        return newIndices;
      });
      setUsedTileIndices(prev => new Set(prev).add(index));
    }
  };

  const handleTileRemove = (selectionIndex: number) => {
    setSelectedTiles(prev => {
      const newTiles = [...prev];
      newTiles[selectionIndex] = undefined;
      return newTiles;
    });
    setUsedTileIndices(prev => {
      const newUsed = new Set(prev);
      const gridIndex = selectedTileIndices[selectionIndex];
      if (gridIndex !== undefined) {
        newUsed.delete(gridIndex);
      }
      return newUsed;
    });
    setSelectedTileIndices(prev => {
      const newIndices = [...prev];
      newIndices[selectionIndex] = undefined;
      return newIndices;
    });
  };


  const calculateResult = () => {
    const numbers = selectedTiles.filter((tile): tile is number => tile !== undefined);
    if (numbers.length < 2) {
      setIsCorrect(null);
      return;
    }

    const result = numbers.reduce((acc, curr) => acc + curr, 0);
    const correct = result === level;
    setIsCorrect(correct);

    if (correct) {
      increaseLevel();
    } else {
      decreaseHealth();
      setTime(30); 
      setSelectedTiles([undefined, undefined, undefined, undefined]);
      setUsedTileIndices(new Set());
    }
  };

  return (
    <div className="relative w-full h-screen bg-gray-900">
      <HUD health={health} level={level} time={time} />
      
      <div className="flex justify-center items-center pt-20 pb-10 ">
        <GameGrid level={level} onTileSelect={handleTileSelect} usedTileIndices={usedTileIndices} />
      </div>
      <div className="flex justify-center items-center pb-5">
        <GameUserInput 
          selectedTiles={selectedTiles} 
          onTileRemove={handleTileRemove}
        />
      </div>
      <div className="flex justify-center items-center pb-5">
        <GameUserResult level={level} isCorrect={isCorrect} onCheck={calculateResult} isSelectionComplete={isSelectionComplete}/>
      </div>
              {/* <div className=" ">
                <button 
                  onClick={decreaseHealth}
                  className="px-4  bg-blue-500 text-white rounded mr-2 h-6"
                >
                  Decrease Health
                </button>
                <button 
                  onClick={increaseHealth}
                  className="px-4  bg-green-500 text-white rounded mr-2 h-6"
                >
                  Increase Health
                </button>
                <button 
                  onClick={decreaseLevel}
                  className="px-4  bg-yellow-500 text-white rounded h-6"
                >
                  Decrease Level
                </button>
                <button 
                  onClick={increaseLevel}
                  className="px-4  bg-yellow-500 text-white rounded h-6"
                >
                  Increase Level
                </button>
              </div>
              */}
    </div>
  );
}