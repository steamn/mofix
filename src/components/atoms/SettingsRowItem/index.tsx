import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {ThemeType} from 'context/types';
import useTheme from 'hooks/useTheme';
import useThemeStyles from 'hooks/useThemeStyles';

type RowTipe = 'chevron' | 'check';

interface SettingsRowItemProps {
  title: string;
  onpress: () => void;
  rowType: RowTipe;
  checked?: boolean;
  Style?: ViewStyle;
}

const SettingsRowItem = ({
  title,
  onpress,
  rowType,
  checked,
  Style,
}: SettingsRowItemProps): JSX.Element => {
  const theme = useTheme();
  const style = useThemeStyles(styles);

  return (
    <TouchableOpacity style={[style.container, {...Style}]} onPress={onpress}>
      <Text style={style.title}>{title}</Text>
      {rowType === 'chevron' ? (
        <Entypo
          name="chevron-small-right"
          color={theme?.colors?.text_gray}
          size={24}
        />
      ) : rowType === 'check' && checked ? (
        <Entypo name="check" color={theme?.colors?.background_form} size={24} />
      ) : null}
    </TouchableOpacity>
  );
};

export default SettingsRowItem;

const styles = (theme: ThemeType | null) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: 40,
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
    },
    title: {
      fontSize: 18,
      lineHeight: 23,
      fontWeight: '500',
      color: theme?.colors?.text,
    },
  });
