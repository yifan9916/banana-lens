'use client';

import { createContext, useContext } from 'react';

export type AppState<T> = {
  state: T;
  setState?: (nextState: T) => T;
};

export const initialContext: AppState<'init' | 'running'> = {
  state: 'init',
  setState: (n) => n,
};

export const AppContext =
  createContext<AppState<'init' | 'running'>>(initialContext);

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used within a AppContextProvider');
  }

  return context;
};

export const AppProvider = (props: { children: React.ReactNode }) => {
  const { children } = props;

  return (
    <AppContext.Provider value={{ state: 'init' }}>
      {children}
    </AppContext.Provider>
  );
};
