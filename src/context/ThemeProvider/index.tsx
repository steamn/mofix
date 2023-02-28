import React, {useState, createContext, useEffect} from 'react';
import {colors} from 'theme/colors';
import {ThemeProviderProps, ThemeType} from 'context/types';
import EncryptedStorage from 'react-native-encrypted-storage';

export const ThemeContext = createContext<ThemeType | null>(null);

const ThemeProvider = ({children}: ThemeProviderProps): JSX.Element => {
  const [isLightTheme, setLightTheme] = useState<boolean>(true);

  const setStorage = async (value: string) => {
    try {
      await EncryptedStorage.setItem('theme_mode', value);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleTheme = () => {
    if (isLightTheme) {
      setLightTheme(false);
      setStorage('dark');
    } else if (!isLightTheme) {
      setLightTheme(true);
      setStorage('light');
    }
  };
  const getStorage = async () => {
    try {
      const res = await EncryptedStorage.getItem('theme_mode');
      if (res === 'dark') {
        setLightTheme(false);
      } else {
        setLightTheme(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getStorage();
  }, []);

  const theme = {
    colors: isLightTheme ? colors.light : colors.dark,
    toggleTheme,
    isLightTheme,
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
