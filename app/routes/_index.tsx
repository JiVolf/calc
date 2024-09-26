import React, { useState, useEffect } from 'react';
import HUD from '../components/HUD';
import GameGrid from '../components/GameGrid';
import GameUserInput from '../components/GameUserInput';
import GameUserResult from '../components/GameUserResult';
import MenuBar from '../components/MenuBar';
import PauseOverlay from '../components/Overlay';
import LandingPage from '../components/LandingPage';
import SettingsPage from '../components/SettingsPage';
import HighScorePage from '../components/HighScorePage';
import SumOverlay from '../components/SumOverlay';


export default function Index() {
  const [health, setHealth] = useState(3);
  const [level, setLevel] = useState(1);
  const [time, setTime] = useState(30);
  const [selectedTiles, setSelectedTiles] = useState<(number | undefined)[]>([undefined, undefined, undefined, undefined]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [usedTileIndices, setUsedTileIndices] = useState<Set<number>>(new Set());
  const [selectedTileIndices, setSelectedTileIndices] = useState<(number | undefined)[]>([undefined, undefined, undefined, undefined]);
  const isSelectionComplete = selectedTiles.every(tile => tile !== undefined);
  const [isPaused, setIsPaused] = useState(true);
  const [overlayMessage, setOverlayMessage] = useState("Start");
  const [showLandingPage, setShowLandingPage] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('bg-gray-900');
  const [showHighScore, setShowHighScore] = useState(false);
  const [startLevel, setStartLevel] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false); 
  const [showSumOverlay, setShowSumOverlay] = useState(false);  // Controls the visibility of the sum overlay
  const [sum, setSum] = useState(0);  // Holds the sum of selected tiles

  const resetGame = () => {
    setHealth(3);
    setLevel(1);
    setTime(30);
    setSelectedTiles([undefined, undefined, undefined, undefined]);
    setSelectedTileIndices([undefined, undefined, undefined, undefined]);
    setIsCorrect(null);
    setUsedTileIndices(new Set());
  };
  useEffect(() => {
    console.log('Selected Tiles:', selectedTiles);
    console.log('Selected Tile Indices:', selectedTileIndices);
    console.log('Used Tile Indices:', usedTileIndices);
  }, [selectedTiles, selectedTileIndices, usedTileIndices]);

  const handleCheckpointSelect = (selectedLevel: number) => {
    setStartLevel(selectedLevel);
    setLevel(selectedLevel);
    setShowHighScore(false);
    setShowLandingPage(false);
    setHealth(3);
    setTime(30);
    setSelectedTiles([undefined, undefined, undefined, undefined]);
    setIsCorrect(null);
    setUsedTileIndices(new Set());
    setIsPaused(false);
  };

  const decreaseHealth = () => {
    setHealth(prev => {
      const newHealth = prev - 1;
      if (newHealth <= 0) {
        setOverlayMessage("Prohra :(");
        setIsPaused(true); 
        setIsGameOver(true);
      } else {
        setOverlayMessage("Mínus jedno srdíčko");
        setIsPaused(true); 
        setSelectedTiles([undefined, undefined, undefined, undefined]);
        setSelectedTileIndices([undefined, undefined, undefined, undefined]);
        setUsedTileIndices(new Set());
        setIsCorrect(null);
      }
      return newHealth;
    });
  };

  const increaseHealth = () => {
    setHealth(prev => Math.min(3, prev + 1));
  };

  const increaseLevel = () => {
    setLevel(prev => {
      const newLevel = prev + 1;
      updateHighScores(newLevel);
      return newLevel;
    });
    setTime(30 + level);
    setSelectedTiles([undefined, undefined, undefined, undefined]);
    setSelectedTileIndices([undefined, undefined, undefined, undefined]);
    setIsCorrect(null);
    setUsedTileIndices(new Set());
    setOverlayMessage(`Pokračovat na level ${level + 1}`);
    setIsPaused(true);
  };

  const decreaseLevel = () => {
    setLevel(prev => Math.max(1, prev - 1));
  };

  useEffect(() => {
    if (time > 0 && !isPaused) {
      const timerId = setTimeout(() => setTime(time - 1), 1000);
      return () => clearTimeout(timerId);
    } else if (time <= 0) {
      decreaseHealth();
      setTime(30); 
    }
  }, [time, isPaused]);

  const handleTileSelect = (index: number, value: number) => {
    const firstEmptyIndex = selectedTiles.findIndex(tile => tile === undefined);
  
    if (firstEmptyIndex !== -1 && !usedTileIndices.has(index)) {
      setSelectedTiles(prev => {
        const newTiles = [...prev];
        newTiles[firstEmptyIndex] = value;
  
        const sum = newTiles.reduce((acc: number, tile) => acc + (tile || 0), 0);
  
        setSum(sum); 
        setShowSumOverlay(true); 
  
        setTimeout(() => {
          setShowSumOverlay(false);
        }, 1000);  
  
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

  const handlePause = () => {
    if (health === 3 && level === 1 && time === 30) {
      setOverlayMessage("Start");
    } else {
      setOverlayMessage("Pauza");
    }
    setIsPaused(true);
  };

  const handleGameOverClick = () => {
    setIsGameOver(false);
    setShowLandingPage(true);
  };

  const handleResume = () => {
    setIsPaused(false);
    setOverlayMessage("");
  };

  const handleHome = () => {
    setIsPaused(true);
    setShowLandingPage(true);
    resetGame();
  };

  const handleNewGame = (startLevel: number) => {
    setShowLandingPage(false);
    setIsPaused(false);
    setStartLevel(startLevel);
    setLevel(startLevel);
    setHealth(3);
    setTime(30);
    setSelectedTiles([undefined, undefined, undefined, undefined]);
    setIsCorrect(null);
    setUsedTileIndices(new Set());
  };

  const handleClan = () => {
    alert('TBD!');
  };

  const handleSettings = () => {
    setShowSettings(true);
    setShowLandingPage(false);
  };

  const handleBackFromSettings = () => {
    setShowSettings(false);
    setShowLandingPage(true);
    const savedSettings = localStorage.getItem('appSettings');
    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings);
      setBackgroundColor(getBackgroundColor(parsedSettings.background));
    }
  };

  useEffect(() => {
    const savedSettings = localStorage.getItem('appSettings');
    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings);
      setBackgroundColor(getBackgroundColor(parsedSettings.background));
    }
  }, []);

  const getBackgroundColor = (setting: string) => {
    switch (setting) {
      case 'blue':
        return 'bg-blue-900';
      case 'red':
        return 'bg-red-900';
      default:
        return 'bg-gray-900';
    }
  };


  interface HighScore {
    username: string;
    level: number;
  }

  const updateHighScores = (newLevel: number) => {
    const savedSettings = localStorage.getItem('appSettings');
    const username = savedSettings ? JSON.parse(savedSettings).nickname || 'Anonymous' : 'Anonymous';
    const savedHighScores = localStorage.getItem('highScores');
    let highScores = savedHighScores ? JSON.parse(savedHighScores) : [];
    const existingScoreIndex = highScores.findIndex((score: HighScore) => score.username === username);
    if (existingScoreIndex !== -1) {
      if (newLevel > highScores[existingScoreIndex].level) {
        highScores[existingScoreIndex].level = newLevel;
      }
    } else {
      highScores.push({ username, level: newLevel });
    }
    highScores.sort((a: HighScore, b: HighScore) => b.level - a.level);
    highScores = highScores.slice(0, 10);
    localStorage.setItem('highScores', JSON.stringify(highScores));
  };

  const handleHighScore = () => {
    setShowHighScore(true);
    setShowLandingPage(false);
  };

  const handleBackFromHighScore = () => {
    setShowHighScore(false);
    setShowLandingPage(true);
  };

  return (
    <div className={`relative w-full h-screen ${backgroundColor} flex justify-center sm:items-center`}>
      {showSettings ? (
        <SettingsPage onBack={handleBackFromSettings} />
      ) : showHighScore ? (
        <HighScorePage 
          onBack={handleBackFromHighScore} 
          
        />
      ) : showLandingPage ? (
        <LandingPage 
          onNewGame={handleNewGame} 
          onHighScore={handleHighScore} 
          onClan={handleClan} 
          onSettings={handleSettings} 
        />
      ) : (
        <div className="w-auto max-w-2xl ">   
            
            <MenuBar onPause={handlePause} onHome={handleHome}/>

            <HUD health={health} level={level} time={time} />
            
            <div className="flex justify-center items-center pt-20 pb-5 max-w-2xl">
              <GameGrid level={level} startLevel={startLevel} onTileSelect={handleTileSelect} onTileRemove={handleTileRemove} usedTileIndices={usedTileIndices} selectedTileIndices={selectedTileIndices}/>
            </div>
            <div className="flex justify-center items-center pb-1">
              <GameUserInput 
                selectedTiles={selectedTiles} 
                onTileRemove={handleTileRemove}
              />
            </div>
            <div className="flex justify-center items-center pb-5">
              <GameUserResult level={level} isCorrect={isCorrect} onCheck={calculateResult} isSelectionComplete={isSelectionComplete}/>
            </div>
            {isPaused && !isGameOver && (
              <PauseOverlay 
                onClick={handleResume}  
                message={overlayMessage} 
              />
            )}

            {isGameOver && (
              <PauseOverlay 
                onClick={handleGameOverClick}  
                message={overlayMessage}      
              />
            )}
            <SumOverlay sum={sum} visible={showSumOverlay} duration={1} />                     
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
      )}
      
    </div>
  );
}