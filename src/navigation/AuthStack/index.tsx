import React, {useContext, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Pressable} from 'react-native';

import {observer} from 'mobx-react';
import {AppContext} from 'context/App';

import useTheme from 'hooks/useTheme';
import CardScreen from 'screens/CardScreen';
import AuthScreen from 'screens/AuthScreen';
import UserStatusScreen from 'screens/UserStatusScreen';
import PayScreen from 'screens/PayScreen';

const Stack = createNativeStackNavigator();

export const AuthStack: React.FC = observer(() => {
  const theme = useTheme();

  const {
    stores: {authStore, payStore, userStore},
  } = useContext(AppContext);

  useEffect(() => {
    authStore.checkToken();
  }, []);

  return (
    <Stack.Navigator initialRouteName="Card">
      {!authStore.token && (
        <Stack.Screen
          name={'Card'}
          component={CardScreen}
          options={{headerShown: false}}
        />
      )}
      {!authStore.token && (
        <Stack.Screen
          name={'SendPhone'}
          component={AuthScreen}
          options={({navigation}) => ({
            title: '',
            headerLeft: () => (
              <Pressable onPress={() => navigation.goBack()}>
                <AntDesign
                  name="arrowleft"
                  color={theme?.colors?.background_form}
                  size={28}
                />
              </Pressable>
            ),
          })}
        />
      )}
      <Stack.Screen
        name={'Status'}
        component={UserStatusScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'Pay'}
        component={PayScreen}
        options={({navigation}) => ({
          title: '',
          headerLeft: () => (
            <Pressable
              onPress={() => {
                  navigation.reset({
                      index: 0,
                      routes: [{name: 'Status'}],
                  });
                  userStore.getData();
                payStore.cleanSuccess();
              }}>
              <AntDesign
                name="arrowleft"
                color={theme?.colors?.background_form}
                size={28}
              />
            </Pressable>
          ),
        })}
      />
    </Stack.Navigator>
  );
});
