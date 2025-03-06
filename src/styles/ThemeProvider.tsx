import React, {createContext, useContext} from 'react';
import {theme} from './theme';

const ThemeContext = createContext(theme);

export const ThemeProvider = ({children}: {children: React.ReactNode}) => {
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  return useContext(ThemeContext);
};
