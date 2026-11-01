'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({
  theme: 'dark',
  toggleTheme: () => {},
  mounted: false,
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('keyastudio_theme') || localStorage.getItem('studiospace_theme');
      const active = saved === 'light' ? 'light' : 'dark';
      setTheme(active);
      setMounted(true);

      const root = document.documentElement;
      if (active === 'dark') {
        root.classList.add('dark');
        root.setAttribute('data-theme', 'dark');
        root.style.colorScheme = 'dark';
        if (document.body) {
          document.body.classList.add('dark');
          document.body.setAttribute('data-theme', 'dark');
        }
      } else {
        root.classList.remove('dark');
        root.setAttribute('data-theme', 'light');
        root.style.colorScheme = 'light';
        if (document.body) {
          document.body.classList.remove('dark');
          document.body.setAttribute('data-theme', 'light');
        }
      }
    } catch (e) {
      setMounted(true);
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    try {
      localStorage.setItem('keyastudio_theme', nextTheme);
      localStorage.setItem('studiospace_theme', nextTheme);
    } catch (e) {}

    const root = document.documentElement;
    if (nextTheme === 'dark') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
      root.style.colorScheme = 'dark';
      if (document.body) {
        document.body.classList.add('dark');
        document.body.setAttribute('data-theme', 'dark');
      }
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
      root.style.colorScheme = 'light';
      if (document.body) {
        document.body.classList.remove('dark');
        document.body.setAttribute('data-theme', 'light');
      }
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
