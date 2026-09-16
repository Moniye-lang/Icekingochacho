import { createContext, useContext, useEffect } from 'react';

const ThemeContext = createContext({ theme: 'dark' });

export function ThemeProvider({ children }) {
  useEffect(() => {
    // Committed to signature luxury dark mode
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('ice_theme', 'dark');
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
