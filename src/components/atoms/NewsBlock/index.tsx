import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ThemeType} from 'context/types';
import useTheme from 'hooks/useTheme';
import useThemeStyles from 'hooks/useThemeStyles';
import FastImage from 'react-native-fast-image';

interface NewsBlockProps {
  img: string;
  desc: string;
  onpress: () => void;
}

const NewsBlock = ({img, desc, onpress}: NewsBlockProps): JSX.Element => {
  const theme = useTheme();
  const style = useThemeStyles(styles);

  return (
    <Pressable style={style.container} onPress={onpress}>
      <FastImage
        style={style.img}
        source={{
          uri: img,
          headers: {Authorization: 'someAuthToken'},
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={style.textBlock}>
        <Text style={style.desc} ellipsizeMode="tail" numberOfLines={1}>
          {desc}
        </Text>
      </View>
    </Pressable>
  );
};

export default NewsBlock;

const styles = (theme: ThemeType | null) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: 215,
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme?.colors?.background,
      marginBottom: 20,
    },
    img: {
      height: 175,
      width: '100%',
      borderRadius: 5,
    },
    textBlock: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'flex-start',
      paddingHorizontal: 5,
    },
    desc: {
      color: theme?.colors?.text,
      fontSize: 19,
      lineHeight: 24,
      fontWeight: '600',
    },
  });
