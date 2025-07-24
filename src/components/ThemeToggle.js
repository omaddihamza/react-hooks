import React, { useContext } from 'react';
import { ThemeContext } from '../App';

const ThemeToggle = () => {
  const { isDarkTheme, setIsDarkTheme } = useContext(ThemeContext);

  return (
      <button
          onClick={() => setIsDarkTheme(!isDarkTheme)}
          className={`px-3 py-2 rounded me-2 ${
              isDarkTheme
                  ? 'bg-secondary text-light border border-light'
                  : 'bg-light text-dark border border-dark'
          }`}
      >
        {isDarkTheme ? 'Mode Clair' : 'Mode Sombre'}
      </button>
  );
};

export default ThemeToggle;