import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import useTheme from 'hooks/useTheme';
import useThemeStyles from 'hooks/useThemeStyles';
import {ThemeType} from 'context/types';
import MainButton from 'atoms/MainButton';

interface PreloaderSecondProp {
  onpress: () => void;
}

const PreloaderSecond = ({onpress}: PreloaderSecondProp): JSX.Element => {
  const theme = useTheme();
  const style = useThemeStyles(styles);

  return (
    <View style={style.container}>
      <Image
        source={require('../../../assets/images/artboard67@2.png')}
        style={style.img}
      />
      <Text style={style.title}>Новости и акции</Text>
      <Text style={style.descr}>
        Узнавайте об акциях и совершайте выгодные покупки!
      </Text>
      <View style={style.bottomWrapper}>
        <View style={style.dotWrapper}>
          <View style={style.dot} />
          <View
            style={[
              style.dot,
              {backgroundColor: theme?.colors?.background_form},
            ]}
          />
          <View style={style.dot} />
        </View>
        <MainButton onpress={onpress} title={'ДАЛЕЕ'} Style={style.btn} />
      </View>
    </View>
  );
};

export default PreloaderSecond;

const styles = (theme: ThemeType | null) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      backgroundColor: theme?.colors?.background,
      alignItems: 'center',
    },
    img: {
      width: 260,
      height: 240,
      resizeMode: 'contain',
      marginTop: 110,
      alignSelf: 'center',
    },
    title: {
      width: '100%',
      fontSize: 32,
      fontWeight: '700',
      lineHeight: 32,
      color: theme?.colors?.text,
      marginTop: 35,
      marginBottom: 20,
      alignSelf: 'flex-start',
    },
    descr: {
      width: '100%',
      fontSize: 20,
      fontWeight: '700',
      lineHeight: 26,
      color: theme?.colors?.text,
      alignSelf: 'flex-start',
    },
    bottomWrapper: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'absolute',
      bottom: 40,
    },
    dotWrapper: {
      width: 45,
      height: 50,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    dot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: theme?.colors?.background_inact,
    },
    btn: {width: 130, height: 50},
  });
