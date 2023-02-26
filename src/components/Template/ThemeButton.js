import React from 'react';
import useDarkMode from 'use-dark-mode';

const ThemeBtn = () => {
  const darkMode = useDarkMode();
  return (
    <button className="opposite" type="button" onClick={darkMode.toggle}>
      {darkMode.value ? 'Light mode' : 'Dark mode'}
    </button>
  );
};
export default ThemeBtn;
