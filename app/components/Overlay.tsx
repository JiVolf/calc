import React from 'react';

interface OverlayProps {
  onClick: () => void;
  message: string;
}

const PauseOverlay: React.FC<OverlayProps> = ({ onClick, message }) => {
  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-100 flex items-center justify-center"
      onClick={onClick}
    >
      <div className="text-white text-4xl">{message}</div>
    </div>
  );
};

export default PauseOverlay;
