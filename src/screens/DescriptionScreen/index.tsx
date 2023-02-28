import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ThemeType} from 'context/types';
import useTheme from 'hooks/useTheme';
import useThemeStyles from 'hooks/useThemeStyles';
import {observer} from 'mobx-react';

const DescriptionScreen = () => {
  const theme = useTheme();
  const style = useThemeStyles(styles);
  return (
    <View>
      <Text>DescriptionScreen</Text>
    </View>
  );
};

export default observer(DescriptionScreen);

const styles = (theme: ThemeType | null) => StyleSheet.create({});
