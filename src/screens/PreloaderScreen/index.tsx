import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import useThemeStyles from 'hooks/useThemeStyles';
import {ThemeType} from 'context/types';
import PreloaderFirst from 'molecules/PreloaderFirst';
import PreloaderSecond from 'molecules/PreloaderSecond';
import PreloaderThird from 'molecules/PreloaderThird';
import {AppContext} from 'context/App';
import {observer} from 'mobx-react';
import {HomeNavigatorParamsList} from 'nav/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import useTheme from 'hooks/useTheme';

export interface NavScreenProps {
  navigation: NativeStackNavigationProp<HomeNavigatorParamsList, 'Preloader'>;
}

const PreloaderScreen: React.FC<NavScreenProps> = ({navigation}) => {
  const theme = useTheme();
  const style = useThemeStyles(styles);
  const {
    services: {notificationService},
    stores: {helperStore, pushStore},
  } = useContext(AppContext);

  const [preloadNumb, setPreloadNumb] = useState<string>('1');
  const [indicator, setIndicator] = useState<boolean>(false);

  useEffect(() => {
    notificationService.requestPermission();
  }, []);

  useEffect(() => {
    if (helperStore.Loading) setIndicator(true);
    return () => setIndicator(false);
  }, [helperStore.Loading]);

  if (indicator) {
    return (
      <View
        style={[
          style.container,
          {justifyContent: 'center', alignItems: 'center'},
        ]}>
        <ActivityIndicator
          color={theme?.colors?.background_form}
          size={'large'}
        />
      </View>
    );
  }

  return (
    <View style={style.container}>
      {preloadNumb === '1' ? (
        <PreloaderFirst onpress={() => setPreloadNumb('2')} />
      ) : preloadNumb === '2' ? (
        <PreloaderSecond onpress={() => setPreloadNumb('3')} />
      ) : preloadNumb === '3' ? (
        <PreloaderThird
          onpress={() => {
            pushStore.setFcmToken();
            helperStore.setPreloaderFinish();
            navigation.navigate('Home');
          }}
        />
      ) : null}
    </View>
  );
};

export default observer(PreloaderScreen);

const styles = (theme: ThemeType | null) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      backgroundColor: theme?.colors?.background,
      paddingHorizontal: 20,
    },
  });
