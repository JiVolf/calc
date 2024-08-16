import React from 'react';

interface MenuBarProps {
  onPause: () => void;
}

const MenuBar: React.FC<MenuBarProps> = ({ onPause }) => {
  return (
    <div className="w-full text-yellow-500 p-4 flex justify-between items-center border-b border-yellow-500 border-solid">
      <div className="text-2xl font-bold">Číselník</div>
      <div className="flex text-xl space-x-4">
        <button onClick={onPause} className="p-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
        </button>
      </div>
    </div>
  );
};

export default MenuBar;
