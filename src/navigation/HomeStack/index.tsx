import React, {useContext, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from 'screens/HomeScreen';
import NewsScreen from 'screens/NewsScreen';
import SettingsScreen from 'screens/SettingsScreen';
import PersonalDataScreen from 'screens/PersonalDataScreen';
import PositionScreen from 'screens/PositionScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Pressable} from 'react-native';
import InformationsScreen from 'screens/InformationsScreen';
import InfoLoyalScreen from 'screens/InfoLoyalScreen';
import {observer} from 'mobx-react';
import {AppContext} from 'context/App';

import useTheme from 'hooks/useTheme';
import PreloaderScreen from 'screens/PreloaderScreen';
import {HomeNavigatorParamsList} from 'nav/types';

const Stack = createNativeStackNavigator<HomeNavigatorParamsList>();

export const HomeStack: React.FC = observer(() => {
    const theme = useTheme();
    const {
        stores: {helperStore, informationStore},
    } = useContext(AppContext);

    useEffect(() => {
        helperStore.checkPreloader();
    }, []);

    return (
        <Stack.Navigator initialRouteName="Preloader">
            {!helperStore.userStatus && (
                <Stack.Screen
                    name="Preloader"
                    component={PreloaderScreen}
                    options={{headerShown: false}}
                />
            )}
            <Stack.Screen
                name={'Home'}
                component={HomeScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name={'News'}
                component={NewsScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name={'Settings'}
                component={SettingsScreen}
                options={({navigation}) => ({
                    title: 'Настройки',
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <Pressable onPress={() => navigation.goBack()}>
                            <AntDesign
                                name="arrowleft"
                                color={theme?.colors?.background_form}
                                size={24}
                            />
                        </Pressable>
                    ),
                })}
            />
            <Stack.Screen
                name={'PersonalData'}
                component={PersonalDataScreen}
                options={({navigation}) => ({
                    title: 'Личные данные',
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <Pressable onPress={() => navigation.goBack()}>
                            <AntDesign
                                name="arrowleft"
                                color={theme?.colors?.background_form}
                                size={24}
                            />
                        </Pressable>
                    ),
                })}
            />
            <Stack.Screen
                name={'Position'}
                component={PositionScreen}
                options={({navigation}) => ({
                    title: 'Город',
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <Pressable onPress={() => navigation.goBack()}>
                            <AntDesign
                                name="arrowleft"
                                color={theme?.colors?.background_form}
                                size={24}
                            />
                        </Pressable>
                    ),
                })}
            />
            <Stack.Screen
                name={'Information'}
                component={InformationsScreen}
                options={({navigation}) => ({
                    title: informationStore.title,
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <Pressable onPress={() => navigation.goBack()}>
                            <AntDesign
                                name="arrowleft"
                                color={theme?.colors?.text}
                                size={24}
                            />
                        </Pressable>
                    ),
                })}
            />
            <Stack.Screen
                name={'InfoLoyal'}
                component={InfoLoyalScreen}
                options={({navigation}) => ({
                    title: informationStore.title,
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <Pressable onPress={() => navigation.goBack()}>
                            <AntDesign
                                name="arrowleft"
                                color={theme?.colors?.text}
                                size={24}
                            />
                        </Pressable>
                    ),
                })}
            />
        </Stack.Navigator>
    );
});
