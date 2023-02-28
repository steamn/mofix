import useTheme from 'hooks/useTheme';

const useThemeStyles = (styles: any) => {
  const theme = useTheme();
  return styles(theme);
};

export default useThemeStyles;
