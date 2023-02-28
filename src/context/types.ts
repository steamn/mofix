import {IColor} from 'theme/types';
import React from 'react';

export type ThemeProviderProps = {
  children: React.ReactNode;
};

export type ThemeType = {
  colors: IColor | null;
  toggleTheme: () => void;
  isLightTheme: boolean;
};
