import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {ThemeType} from 'context/types';
import useTheme from 'hooks/useTheme';
import useThemeStyles from 'hooks/useThemeStyles';
import {observer} from 'mobx-react';

type IconType = 'web' | 'mail';

interface LinksRowProps {
  title: string;
  onpress: () => void;
  icon: IconType;
}

const LinksRow = ({title, onpress, icon}: LinksRowProps): JSX.Element => {
  const theme = useTheme();
  const style = useThemeStyles(styles);
  return (
    <TouchableOpacity style={style.container} onPress={onpress}>
      <View style={style.leftSide}>
        <Ionicons
          name={icon === 'web' ? 'globe-outline' : 'mail'}
          color={theme?.colors?.background_form}
          size={24}
        />
        <Text style={style.title}>{title}</Text>
      </View>

      <Entypo
        name="chevron-small-right"
        color={theme?.colors?.text_gray}
        size={24}
      />
    </TouchableOpacity>
  );
};

export default observer(LinksRow);

const styles = (theme: ThemeType | null) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: 40,
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
    },
    leftSide: {flexDirection: 'row', width: '30%', alignItems: 'center'},
    title: {
      fontSize: 18,
      color: theme?.colors?.background_form,
      marginLeft: 8,
      lineHeight: 23,
    },
  });
