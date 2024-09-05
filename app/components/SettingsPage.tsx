import React, { useState, useEffect } from 'react';

interface SettingsPageProps {
  onBack: () => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ onBack }) => {
  const [nickname, setNickname] = useState('');
  const [soundOn, setSoundOn] = useState(true);
  const [language, setLanguage] = useState('en');
  const [background, setBackground] = useState('default');
  const [country, setCountry] = useState('Option 1');

  useEffect(() => {
    const savedSettings = localStorage.getItem('appSettings');
    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings);
      setNickname(parsedSettings.nickname || '');
      setSoundOn(parsedSettings.soundOn);
      setLanguage(parsedSettings.language || 'en');
      setBackground(parsedSettings.background || 'default');
      setCountry(parsedSettings.country || 'Option 1');
    }
  }, []);

  const handleSaveAndBack = () => {
    const settings = {
      nickname,
      soundOn,
      language,
      country,
      background,
    };
    localStorage.setItem('appSettings', JSON.stringify(settings));
    onBack();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-yellow-500 space-y-8 p-4">
      <h1 className="text-3xl font-bold mb-4">Nastavení</h1>
      
      <div className="w-full max-w-md space-y-6">
        <div>
          <label htmlFor="nickname" className="block mb-2">Nickname</label>
          <input
            id="nickname"
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="w-full p-2 bg-gray-800 text-yellow-500 rounded"
          />
        </div>

        <div className="flex items-center justify-between">
          <span>Zvuk</span>
          <button onClick={() => setSoundOn(!soundOn)} className="p-2">
            {soundOn ? (
              <svg className="w-6 h-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                </svg>
              </svg>
            ) : (
              <svg className="w-6 h-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                 <path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                 <path stroke-linecap="round" stroke-linejoin="round" d="M3 3l18 18" />
                </svg>
              </svg>
            )}
          </button>
        </div>

        <div>
          <label htmlFor="language" className="block mb-2">Jazyk</label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full p-2 bg-gray-800 text-yellow-500 rounded"
          >
            <option value="cz">Čeština</option>
          </select>
        </div>

        <div>
          <label htmlFor="background" className="block mb-2">Background</label>
          <select
            id="background"
            value={background}
            onChange={(e) => setBackground(e.target.value)}
            className="w-full p-2 bg-gray-800 text-yellow-500 rounded"
          >
            <option value="default">Default</option>
            <option value="blue">Modrá</option>
            <option value="red">Červená</option>
          </select>
        </div>

        <div>
          <label htmlFor="country" className="block mb-2">Země</label>
          <select
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full p-2 bg-gray-800 text-yellow-500 rounded"
          >
            <option value="Option 1">Česká Republika</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleSaveAndBack}
        className="bg-yellow-500 text-gray-900 px-4 py-2 rounded font-bold"
      >
        Uložit a zpět do Menu
      </button>
    </div>
  );
};

export default SettingsPage;