'use client';

import { useEffect, useState } from 'react';

import { useThemeContext } from '@/contexts/theme-context/theme-context';

import { Computer, Moon, Sun } from '@/components/icons';
import { Button } from '@/components/button';

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useThemeContext();

  const [isMounted, setIsMounted] = useState(false);
  const [isSelection, setIsSelection] = useState(false);

  // theme from local storage is not available on server
  // need to wait for component to mount to avoid hydration warnings
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const handleClick = (nextTheme: typeof theme) => {
    if (isSelection) {
      setTheme(nextTheme);
      setIsSelection(false);
    } else {
      setIsSelection(true);
    }
  };

  const handleStyles = (selectionTheme: typeof theme) => {
    const isActiveTheme = theme === selectionTheme;

    const themeStyles = isActiveTheme ? 'opacity-100' : 'opacity-50';
    const selectionStyles = isSelection ? '' : isActiveTheme ? '' : '!w-0';

    const styles = [selectionStyles, themeStyles, 'transition-all'].join(' ');

    return styles;
  };

  return (
    <div className="flex">
      <div
        className={[
          'flex flex-row rounded-full border',
          isSelection ? 'px-1' : '',
        ].join(' ')}
      >
        <Button
          title="Light Theme"
          icon={<Sun style={{ height: '20px', width: '20px' }} />}
          onClick={() => handleClick('light')}
          className={handleStyles('light')}
        />
        <Button
          title="System Theme"
          icon={<Computer style={{ height: '20px', width: '20px' }} />}
          onClick={() => handleClick('system')}
          className={handleStyles('system')}
        />
        <Button
          title="Dark Theme"
          icon={<Moon style={{ height: '20px', width: '20px' }} />}
          onClick={() => handleClick('dark')}
          className={handleStyles('dark')}
        />
      </div>
    </div>
  );
};
