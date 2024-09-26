import React, { useState, useEffect } from 'react';
import CountryFlag from '../components/CountryFlag';

interface HighScore {
  username: string;
  level: number;
  country: string;
}

interface HighScorePageProps {
  onBack: () => void;
}
const HighScorePage: React.FC<HighScorePageProps> = ({ onBack }) => {
  const [highScores, setHighScores] = useState<HighScore[]>([]);

  useEffect(() => {
    const loadHighScores = () => {
      const savedHighScores = localStorage.getItem('highScores');
      if (savedHighScores) {
        return JSON.parse(savedHighScores);
      }
      return [];
    };

    const scores = loadHighScores();
    setHighScores(scores);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-yellow-500 space-y-8 p-4">
      <h1 className="text-3xl font-bold mb-4">High Scores</h1>
      
      <table className="w-full max-w-md bg-gray-800 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-yellow-500 text-gray-900">
            <th className="py-2 px-4 text-left">Hráč</th>
            <th className="py-2 px-4 text-right">Level</th>
          </tr>
        </thead>
        <tbody>
          {highScores.map((score, index) => (
            <tr key={index} className="border-b border-gray-700">
              <td className="py-2 px-4 flex items-center">
                <CountryFlag country={score.country} />
                {score.username}
              </td>
              <td className="py-2 px-4 text-right">{score.level}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className="bg-yellow-500 text-gray-900 px-4 py-2 rounded font-bold"
        onClick={onBack}
      >
        Zpět do Menu
      </button>
    </div>
  );
};

export default HighScorePage;