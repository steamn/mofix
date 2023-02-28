import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';

import {ThemeType} from 'context/types';
import useTheme from 'hooks/useTheme';
import useThemeStyles from 'hooks/useThemeStyles';
import {observer} from 'mobx-react';

interface MainButtonProps {
  onpress: () => void;
  title: string;
  Style?: ViewStyle;
}

const MainButton = ({onpress, title, Style}: MainButtonProps): JSX.Element => {
  const theme = useTheme();
  const style = useThemeStyles(styles);
  return (
    <TouchableOpacity style={[style.container, {...Style}]} onPress={onpress}>
      <Text style={style.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default observer(MainButton);

const styles = (theme: ThemeType | null) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: 50,
      backgroundColor: theme?.colors?.background_form,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },
    title: {
      fontSize: 18,
      lineHeight: 23,
      color: theme?.colors?.text,
      fontWeight: '700',
    },
  });
