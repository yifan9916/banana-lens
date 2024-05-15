import { useEffect, useState } from 'react';

import { LocalStorageKeys } from './local-storage-keys';

export const useLocalStorage = (
  key: LocalStorageKeys,
  initialValue: string | object
) => {
  const [value, setValue] = useState(() => {
    if (typeof window === 'undefined') return undefined;

    const item = localStorage.getItem(key);

    return item ? JSON.parse(item) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  // const subscribe = (callback: () => void) => {
  //   window.addEventListener('storage', callback);

  //   return () => window.removeEventListener('storage', callback);
  // };

  // const getSnapshot = () => {
  //   return localStorage.getItem(key);
  // };

  // const getServerSnapshot = () => null;

  // const externalStore = useSyncExternalStore(
  //   subscribe,
  //   getSnapshot,
  //   getServerSnapshot
  // );

  //   const state = externalStore ? JSON.parse(externalStore) : initialValue;

  return [value, setValue] as const;
};
