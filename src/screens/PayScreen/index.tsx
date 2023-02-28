import {BackHandler, StyleSheet} from 'react-native';
import React, {useCallback, useContext, useEffect} from 'react';
import {ThemeType} from 'context/types';
import useTheme from 'hooks/useTheme';
import useThemeStyles from 'hooks/useThemeStyles';
import {observer} from 'mobx-react';
import {AuthNavigatorParamsList} from 'nav/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {WebView} from 'react-native-webview';
import {AppContext} from 'context/App';
import {useFocusEffect} from '@react-navigation/native';

export interface PayScreenProps {
  navigation: NativeStackNavigationProp<AuthNavigatorParamsList, 'Pay'>;
}

const PayScreen: React.FC<PayScreenProps> = ({navigation}) => {
  const theme = useTheme();
  const style = useThemeStyles(styles);
  const {
    stores: {payStore, userStore},
  } = useContext(AppContext);

  useFocusEffect(
    useCallback(() => {
      return () => {
        payStore.cleanSuccess();
      };
    }, []),
  );

  useFocusEffect(
      useCallback(() => {
        return () => {
          userStore.getData();
        };
      }, []),
  );

  return <WebView source={{uri: payStore.url}} />;
};

export default observer(PayScreen);

const styles = (theme: ThemeType | null) => StyleSheet.create({});
