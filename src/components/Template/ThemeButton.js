import React, { useEffect, useState } from 'react';
import useDarkMode from 'use-dark-mode';

const ThemeBtn = () => {
  const [mounted, setMounted] = useState(false);
  const darkMode = useDarkMode();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button className="opposite" type="button" onClick={darkMode.toggle}>
      {darkMode.value ? 'Light mode' : 'Dark mode'}
    </button>
  );
};
export default ThemeBtn;
