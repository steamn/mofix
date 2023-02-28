import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {ThemeType} from 'context/types';
import useTheme from 'hooks/useTheme';
import useThemeStyles from 'hooks/useThemeStyles';
import FastImage from 'react-native-fast-image';

interface AdvertBlockProps {
  img: string;
  date: string;
  desc: string;
  onpress: () => void;
}

const AdvertBlock = ({
  img,
  date,
  desc,
  onpress,
}: AdvertBlockProps): JSX.Element => {
  const theme = useTheme();
  const style = useThemeStyles(styles);
  return (
    <TouchableOpacity
      style={style.container}
      onPress={onpress}
      activeOpacity={0.4}>
      <FastImage
        style={style.img}
        source={{
          uri: img,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />

      <View style={style.textBlock}>
        <Text style={style.date}>до {date}</Text>
        <Text style={style.desc} numberOfLines={2} ellipsizeMode="tail">
          {desc}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default AdvertBlock;

const styles = (theme: ThemeType | null) =>
  StyleSheet.create({
    container: {
      width: 274,
      height: 224,
      borderRadius: 8,
      marginRight: 20,
      justifyContent: 'space-between',
      backgroundColor: theme?.colors?.background,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },

      shadowOpacity: 0.06,
      shadowRadius: 4,

      elevation: 4,
      marginBottom: 5,
    },
    img: {
      height: 126,
      width: '100%',
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
    },
    textBlock: {
      width: '100%',
      height: '100%',
    },
    date: {
      color: theme?.colors?.text_gray,
      fontSize: 15,
      lineHeight: 19,
      marginTop: 12,
      marginBottom: 5,
      marginLeft: 15,
    },
    desc: {
      color: theme?.colors?.text,
      fontSize: 17,
      lineHeight: 22,
      marginLeft: 15,
      marginRight: 5,
      fontWeight: "500"
    },
  });
