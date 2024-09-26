import React, { useState, useEffect } from 'react';
import { playSound } from '../utils/AudioUtils';

interface LandingPageProps {
  onNewGame: (startLevel: number) => void;
  onHighScore: () => void;
  onClan: () => void;
  onSettings: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNewGame, onHighScore, onClan, onSettings }) => {
  const [availableCheckpoints, setAvailableCheckpoints] = useState<number[]>([1]);
  const [selectedCheckpoint, setSelectedCheckpoint] = useState(1);

  useEffect(() => {
    const loadUserHighScore = () => {
      const savedHighScores = localStorage.getItem('highScores');
      const savedSettings = localStorage.getItem('appSettings');
      
      if (savedHighScores && savedSettings) {
        const highScores = JSON.parse(savedHighScores);
        const settings = JSON.parse(savedSettings);
        const username = settings.nickname || 'Anonymous';
        
        const userHighScore = highScores.find((score: { username: string; level: number }) => score.username === username);
        return userHighScore ? userHighScore.level : 1;
      }
      return 1;
    };

    const calculateCheckpoints = (userLevel: number) => {
      const maxCheckpoint = Math.floor(userLevel / 10) * 10;
      return Array.from({ length: maxCheckpoint / 10 + 1 }, (_, i) => i * 10 || 1);
    };

    const userHighScore = loadUserHighScore();
    const checkpoints = calculateCheckpoints(userHighScore);
    setAvailableCheckpoints(checkpoints);
  }, []);

  const handleButtonClick = (action: () => void) => {
    playSound('menubutton');
    action();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-yellow-500 text-6xl font-bold mb-16">Číselník</h1>
      <div className="flex flex-col space-y-6">
        {availableCheckpoints.length > 1 && (
          <div className="flex items-center space-x-4">
            <label htmlFor="checkpoint-select" className="text-lg text-yellow-500">Pokračovat:</label>
            <select
              id="checkpoint-select"
              value={selectedCheckpoint}
              onChange={(e) => setSelectedCheckpoint(Number(e.target.value))}
              className="bg-gray-800 text-yellow-500 rounded p-2"
            >
              {availableCheckpoints.map((checkpoint) => (
                <option key={checkpoint} value={checkpoint}>
                  Level {checkpoint}
                </option>
              ))}
            </select>
          </div>
        )}
        <button
          onClick={() => handleButtonClick(() => onNewGame(selectedCheckpoint))}
          className="bg-yellow-500 text-gray-900 px-8 py-4 rounded text-2xl font-bold shadow-lg"
        >
          Nová Hra
        </button>
        <button
          onClick={() => handleButtonClick(onHighScore)}
          className="bg-yellow-500 text-gray-900 px-8 py-4 rounded text-2xl font-bold shadow-lg"
        >
          High Score
        </button>
        <button
          onClick={() => handleButtonClick(onClan)}
          className="bg-yellow-500 text-gray-900 px-8 py-4 rounded text-2xl font-bold shadow-lg"
        >
          Klan
        </button>
        <button
          onClick={() => handleButtonClick(onSettings)}
          className="bg-yellow-500 text-gray-900 px-8 py-4 rounded text-2xl font-bold shadow-lg"
        >
          Nastavení
        </button>
      </div>
    </div>
  );
};

export default LandingPage;