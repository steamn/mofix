import React, {useContext} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MapScreen from 'screens/MapScreen';
import ListScreen from 'screens/ListScreen';
import {observer} from 'mobx-react';

import useTheme from 'hooks/useTheme';
import {AppContext} from 'context/App';
import {MapNavigatorParamsList} from 'nav/types';

const Tab = createMaterialTopTabNavigator<MapNavigatorParamsList>();

export const MapsStack: React.FC = observer(() => {
  const theme = useTheme();
  const {
    stores: {helperStore},
  } = useContext(AppContext);
  return (
    <Tab.Navigator
      initialRouteName="MapScreen"
      screenOptions={{
        tabBarActiveTintColor: '#d351ed',
        tabBarInactiveTintColor: '#e3d3e6',
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: '500',
        },
        tabBarStyle: {
          height: helperStore.topTabBarHeight,
        },
        tabBarIndicatorStyle: {
          backgroundColor: theme?.colors?.background_form,
        },
        swipeEnabled: false,
      }}>
      <Tab.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          tabBarLabel: 'На карте',
        }}
      />
      <Tab.Screen
        name="ListScreen"
        component={ListScreen}
        options={{
          tabBarLabel: 'Список',
        }}
      />
    </Tab.Navigator>
  );
});
