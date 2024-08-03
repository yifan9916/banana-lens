'use client';

import { createContext, useContext, useEffect } from 'react';

import { useLocalStorage } from '@/utils/local-storage/use-local-storage';
import { script } from './script';

type Theme = 'system' | 'light' | 'dark';

type ThemeState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const initialContext: ThemeState = {
  theme: 'system',
  setTheme: (_) => {},
};

export const ThemeContext = createContext<ThemeState>(initialContext);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      'useThemeContext must be used within a ThemeContextProvider'
    );
  }

  return context;
};

export const ThemeProvider = (props: { children: React.ReactNode }) => {
  const { children } = props;

  const [theme, setTheme] = useLocalStorage('banana-lens-theme', 'system');

  useEffect(() => {
    if (!theme) return;

    const htmlElement = document.documentElement;

    const setAttributes = (theme: Theme) => {
      htmlElement.dataset.theme = theme;
      htmlElement.classList.remove('light', 'dark');
      htmlElement.classList.add(theme);
    };

    if (theme === 'system') {
      const isPreferenceDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      const systemTheme: Theme = isPreferenceDark ? 'dark' : 'light';

      setAttributes(systemTheme);
    } else {
      setAttributes(theme);
    }
  }, [theme]);

  const updateTheme = (theme: Theme) => {
    setTheme(theme);
  };

  return (
    <ThemeContext.Provider
      value={{ theme: theme as Theme, setTheme: updateTheme }}
    >
      <script
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: `(${script.toString()})()` }}
      />

      {children}
    </ThemeContext.Provider>
  );
};
