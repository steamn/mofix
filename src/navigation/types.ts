import {NavigatorScreenParams} from '@react-navigation/native';

export type TabNavigatorParamsList = {
  Auth: NavigatorScreenParams<AuthNavigatorParamsList>;
  Map: NavigatorScreenParams<MapNavigatorParamsList>;
  HomeStack: NavigatorScreenParams<HomeNavigatorParamsList>;
};

export type AuthNavigatorParamsList = {
  Card: undefined;
  SendPhone: undefined;
  Status: undefined;
  Pay: undefined;
};
export type MapNavigatorParamsList = {
  MapScreen: undefined;
  ListScreen: undefined;
};
export type HomeNavigatorParamsList = {
  Preloader: undefined;
  Home: undefined;
  News: undefined;
  Settings: undefined;
  PersonalData: undefined;
  Position: undefined;
  Information: undefined;
};

export type LoadingNavigatorParamsList = {
  LoadingScreen: undefined;
};
