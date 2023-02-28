import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

import {ThemeType} from 'context/types';
import useTheme from 'hooks/useTheme';
import useThemeStyles from 'hooks/useThemeStyles';
import Entypo from 'react-native-vector-icons/Entypo';
import {ICategory} from 'src/models/category';
import {AppContext} from 'context/App';
import {observer} from 'mobx-react';

interface FilterItemProps {
  title: string;
  checked: boolean;
  onpress: () => void;
}

const FilterItem = ({
  title,
  checked = false,
  onpress,
}: FilterItemProps): JSX.Element => {
  const theme = useTheme();
  const style = useThemeStyles(styles);

  return (
    <TouchableOpacity
      style={style.container}
      activeOpacity={0.5}
      onPress={onpress}>
      <Text style={style.title}>{title}</Text>
      {checked ? (
        <Entypo
          name="check"
          color={theme?.colors?.background_form}
          size={24}
          style={style.icon}
        />
      ) : null}
    </TouchableOpacity>
  );
};

export default observer(FilterItem);

const styles = (theme: ThemeType | null) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: 60,
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 0.5,
      borderBottomColor: theme?.colors?.text_gray,
    },
    title: {
      fontSize: 18,
      lineHeight: 23,
      fontWeight: '500',
      color: theme?.colors?.text,
      marginLeft: 20,
    },
    icon: {
      marginRight: 20,
    },
  });
