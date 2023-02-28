import React, {useEffect, useContext} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeStack} from './HomeStack';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {MapsStack} from './MapsStack';
import useTheme from 'hooks/useTheme';
import {AuthStack} from './AuthStack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AppContext} from 'context/App';
import {observer} from 'mobx-react';
import LoadingScreen from 'screens/LoadingScreen';
import {LoadingNavigatorParamsList, TabNavigatorParamsList} from './types';

const Tab = createBottomTabNavigator<TabNavigatorParamsList>();
const Stack = createNativeStackNavigator<LoadingNavigatorParamsList>();

const Routes = () => {
  const theme = useTheme();
  const {
    stores: {
      helperStore,
      authStore,
      partnersStore,
      geoPositionStore,
      userStore,
    },
  } = useContext(AppContext);

  useEffect(() => {
    userStore.getData();
  }, []);

  useEffect(() => {
    helperStore.checkPreloader();
    authStore.checkToken();
  }, [helperStore.checkPreloader]);

  useEffect(() => {
    geoPositionStore.checkCity();
  }, [geoPositionStore.cityIsChanged]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      {/* <StatusBar
        barStyle={!theme?.isLightTheme ? 'light-content' : 'dark-content'}
      /> */}
      <NavigationContainer>
        {partnersStore.Loading ? (
          <Stack.Navigator>
            <Stack.Screen
              name="LoadingScreen"
              component={LoadingScreen}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        ) : (
          <Tab.Navigator
            initialRouteName="HomeStack"
            screenOptions={({route}) => ({
              tabBarIcon: ({color}) => {
                if (route.name === 'HomeStack') {
                  return (
                    <SimpleLineIcons color={color} name={'home'} size={26} />
                  );
                }
                if (route.name === 'Auth') {
                  return (
                    <Fontisto color={color} name={'shopping-sale'} size={26} />
                  );
                }
                if (route.name === 'Map') {
                  return (
                    <Fontisto color={color} name={'map-marker-alt'} size={26} />
                  );
                }
              },
              headerShown: false,
              tabBarShowLabel: false,
              tabBarActiveTintColor: theme?.colors?.background_form,
              tabBarInactiveTintColor: theme?.colors?.background_inact,
              tabBarStyle: {
                height: 45,
                paddingTop: 5,
              },
              tabBarHideOnKeyboard: true,
              unmountOnBlur: true,
            })}>
            <Tab.Screen name="Auth" component={AuthStack} />
            <Tab.Screen name="HomeStack" component={HomeStack} />
            <Tab.Screen name="Map" component={MapsStack} />
          </Tab.Navigator>
        )}
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default observer(Routes);
