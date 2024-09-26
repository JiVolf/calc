import React from 'react';

// Helper function to convert country code to flag emoji
const getFlagEmoji = (countryCode: string) => {
  if (!countryCode) return '🏳️'; 
  return countryCode
    .toUpperCase()
    .replace(/./g, char => String.fromCodePoint(127397 + char.charCodeAt(0)));
};

interface CountryFlagProps {
  country: string | undefined;
}

const CountryFlag: React.FC<CountryFlagProps> = ({ country }) => {
  const flag = getFlagEmoji(country || 'UN'); 

  return <span className="mr-2">{flag}</span>;
};

export default CountryFlag;
