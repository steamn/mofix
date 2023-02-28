import {
    Image,
    ImageBackground,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {ThemeType} from 'context/types';

import useThemeStyles from 'hooks/useThemeStyles';
import {observer} from 'mobx-react';
import {AuthNavigatorParamsList} from 'nav/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppContext} from 'context/App';

export interface NavScreenProps {
    navigation: NativeStackNavigationProp<AuthNavigatorParamsList, 'Status'>;
}

const UserStatusScreen: React.FC<NavScreenProps> = ({navigation}) => {
    const style = useThemeStyles(styles);

    const date = new Date();
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    const fullDate = date.toLocaleString('ru-RU',
        options);

    const {
        stores: {payStore, userStore},
    } = useContext(AppContext);

    const [checkPaid, setCheckPaid] = useState<boolean>(false);

    useEffect(() => {
        userStore.getData();
    }, []);


    useEffect(() => {
        if (payStore.success) {
            navigation.navigate('Pay');
        }
    }, [payStore.success]);

    useEffect(() => {
        if (userStore.paid === 'PAID') {
            setCheckPaid(true);
        }
    }, [userStore.paid]);

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if (userStore.paid === 'PAID') {
                setCheckPaid(true);
            }
        });

        return unsubscribe;
    }, [navigation]);

    const [time, setTime] = React.useState();

    React.useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date().toLocaleString('ru-RU', {hour: 'numeric', minute: 'numeric', second: 'numeric'}));
        }, 10);
        return () => {
            clearInterval(timer);
        };
    }, []);


    return (
        <View style={style.container}>
            <View style={style.headerWrapper}>
                <Text style={style.headerTitle}>СТАТУС КАРТЫ</Text>
                {userStore.paid === 'PAID' ? (
                    <Text style={style.headerSubTitle}>Оплачена</Text>
                ) : (
                    <Text style={style.headerSubTitle}>Не оплачена</Text>
                )}
            </View>
            <View style={style.cardWrapper}>
                <ImageBackground
                    source={require('../../assets/images/card_background.jpg')}
                    resizeMode="cover"
                    imageStyle={{ borderRadius: 15}}
                    style={{
                        width: '100%',
                        height: '100%',
                    }}>
                    <View style={style.cardInside}>
                        <Text style={style.subTitle}>МОЯ КАРТА</Text>
                        <Text style={style.title}>MOMMYS</Text>
                    </View>
                </ImageBackground>
            </View>
            <View style={style.pinWrapper}>
                <Text style={style.dateTime}>{fullDate}</Text>
                <Text style={style.dateTime}>{time}</Text>
            </View>
            {!checkPaid ? (
                <View style={style.btnWrapper}>
                    <Pressable
                        style={style.btn}
                        onPress={() => payStore.sendTokenToPay()}>
                        <Text style={style.btnTitle}>Оплатить карту</Text>
                    </Pressable>
                </View>
            ) : null}
            {userStore.paid === 'PAID' ? (
                <View style={style.cardInfoBlock}>
                    <Text style={style.cardInfo}>Для получения скидки {"\n"} предъявите карту на кассе</Text>
                </View>
            ): ''}
        </View>
    );
};

export default observer(UserStatusScreen);

const styles = (theme: ThemeType | null) =>
    StyleSheet.create({
        container: {
            width: '100%',
            height: '100%',
            paddingHorizontal: 20,
            backgroundColor: theme?.colors?.background,
        },
        cardWrapper: {
            width: '100%',
            height: 238,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
        },
        codeWrapper: {
            width: '100%',
            height: 91,
            alignItems: 'center',
        },
        pinWrapper: {
            alignItems: 'center',
            marginTop: -70,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            paddingHorizontal: 15,


        },
        cardInside: {},
        subTitle: {
            fontSize: 14,
            lineHeight: 18,
            fontWeight: '700',
            color: theme?.colors?.text,
            marginTop: 20,
            marginLeft: 12,
        },
        title: {
            fontSize: 24,
            fontWeight: '700',
            lineHeight: 30,
            marginBottom: 17,
            color: theme?.colors?.text,
            marginLeft: 12,
        },
        headerWrapper: {
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 50,
            justifyContent: 'space-between',
            marginBottom: 25,
        },
        headerTitle: {
            fontSize: 18,
            lineHeight: 24,
            fontWeight: '400',
            color: theme?.colors?.text,
        },
        headerSubTitle: {
            fontSize: 18,
            lineHeight: 24,
            fontWeight: '700',
            color: theme?.colors?.text,
        },
        codeNumber: {
            fontSize: 18,
            lineHeight: 23,
            fontWeight: '400',
            color: theme?.colors?.text,
            marginTop: 10,
        },
        btnWrapper: {
            marginTop: 70,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        },
        btn: {
            justifyContent: 'center',
            alignItems: 'center',
            width: 180,
            height: 60,
            backgroundColor: theme?.colors?.background_form,
            borderRadius: 10,
        },
        btnTitle: {
            fontSize: 18,
            fontWeight: '700',
            color: theme?.colors?.text,
        },
        dateTime: {
            fontSize: 22,
            fontWeight: '700',
            color: theme?.colors?.text,
        },
        cardInfoBlock: {
            marginTop: 150,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        },

        cardInfo: {
            fontSize: 20,
            textAlign: 'center',
            fontWeight: '300',
            fontFamily: 'PTRootUI-Regular',
        }

    });
