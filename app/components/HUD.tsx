import React from 'react';

interface HUDProps {
  health: number;
  level: number;
  time: number;
}

const formatTime = (time: number): string => {
  return time.toString().padStart(2, '0');
};

const HUD = ({ health, level, time }: HUDProps) => {
  const cappedHealth = Math.max(0, Math.min(3, health));

  return (
    <div className="w-full">
      {/* Health display */}
      <div className="absolute top-4 left-4">
        <div className="text-red-500 text-2xl">
          {[...Array(3)].map((_, i) => (
            <span key={i}>{i < cappedHealth ? "♥" : "♡"}</span>
          ))}
        </div>
      </div>

      {/* Level counter */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
        <div className="text-yellow-500 text-2xl font-bold">
          Level {level}
        </div>
      </div>

      {/* Timer display */}
      <div className="absolute top-4 right-4">
        <div className="text-yellow-500 text-2xl font-bold">
          00:{formatTime(time)}
        </div>
      </div>

    </div>
  );
};

export default HUD;