/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

// import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import ThemeProvider from 'context/ThemeProvider';
import Routes from './navigation';
import {AppContextProvider} from 'context/App';
import {configure} from 'mobx';
import SplashScreen from 'react-native-splash-screen';
import messaging from '@react-native-firebase/messaging';

configure({
  enforceActions: 'never',
});

export default function App(): JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('Message', remoteMessage);
    });
    return unsubscribe;
  }, []);

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

  return (
    <>
      <ThemeProvider>
        <AppContextProvider>
          <Routes />
        </AppContextProvider>
      </ThemeProvider>
    </>
  );
}
