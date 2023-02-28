import {
    ActivityIndicator,
    ImageBackground,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import TextInputMask from 'react-native-text-input-mask';
import {ThemeType} from 'context/types';
import useTheme from 'hooks/useTheme';
import useThemeStyles from 'hooks/useThemeStyles';
import {observer} from 'mobx-react';
import {AppContext} from 'context/App';

import {AuthNavigatorParamsList} from 'nav/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export interface NavScreenProps {
    navigation: NativeStackNavigationProp<AuthNavigatorParamsList, 'Card'>;
}

const CardScreen: React.FC<NavScreenProps> = ({navigation}) => {
    const theme = useTheme();
    const style = useThemeStyles(styles);

    const {
        stores: {authStore},
    } = useContext(AppContext);

    const [modalVisible, setModalVisible] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState<string>();
    const [formattedPhoneNumber, setFormattedPhoneNumber] = useState<string>('');

    useEffect(() => {
        if (authStore.error && !authStore.sendPhoneSuccess) {
            setModalVisible(true);
        }
    }, [authStore.error, authStore.sendPhoneSuccess]);


    if (authStore.Loading) {
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
            <View style={style.upBlock}>
                <Text style={style.mainTitle}>Карта</Text>
                <View style={style.cardWrapper}>
                    <ImageBackground
                        source={require('../../assets/images/card_background.jpg')}
                        resizeMode="cover"
                        imageStyle={{ borderRadius: 15}}
                        style={style.img}>
                        <View style={style.cardInside}>
                            <Text style={style.subTitle}>МОЯ КАРТА</Text>
                            <Text style={style.title}>MOMMYS</Text>
                            <Text style={style.description}>
                                Введите номер телефона, чтобы привязать или получить дисконтную
                                карту
                            </Text>
                            <TextInputMask
                                style={style.input}
                                keyboardType={'numeric'}
                                returnKeyType="done"
                                onChangeText={(formatted, extracted) => {
                                    setFormattedPhoneNumber(formatted); // +1 (123) 456-78-90
                                    setPhoneNumber(extracted); // 1234567890
                                }}
                                mask={'+7 ([000]) [000] [00] [00]'}
                            />
                        </View>
                    </ImageBackground>
                </View>
            </View>
            <Pressable
                onPress={() => {
                    if (phoneNumber) {
                        authStore.savePhoneNumber(`7${phoneNumber}`);
                        authStore.saveFormattedPhoneNumber(formattedPhoneNumber);
                        authStore.sendPhoneNumber(`7${phoneNumber}`);
                        navigation.navigate('SendPhone');
                    }
                }}
                style={[
                    style.btn,
                    {
                        backgroundColor:
                            phoneNumber && phoneNumber?.length >= 10
                                ? theme?.colors?.background_form
                                : theme?.colors?.background_inact,
                    },
                ]}
                disabled={phoneNumber && phoneNumber?.length >= 10 ? false : true}>
                <Text
                    style={[
                        style.btnTitle,
                        {
                            color:
                                phoneNumber && phoneNumber?.length >= 10
                                    ? theme?.colors?.text
                                    : theme?.colors?.text_gray,
                        },
                    ]}>
                    {' '}
                    Далее
                </Text>
            </Pressable>
            <View style={style.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={style.centeredView}>
                        <View style={style.modalView}>
                            <Text style={style.modalText}>{authStore.error}</Text>
                            <View
                                style={{
                                    width: '100%',
                                    borderBottomWidth: 0.5,
                                    marginTop: 30,
                                    borderColor: theme?.colors?.text_gray,
                                }}
                            />
                            <Pressable
                                style={style.button}
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                    authStore.cancelError();
                                }}>
                                <Text
                                    style={[
                                        style.modalText,
                                        {
                                            color: theme?.colors?.blue,
                                            fontWeight: '400',
                                            marginTop: 5,
                                        },
                                    ]}>
                                    OK
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
};

export default observer(CardScreen);

const styles = (theme: ThemeType | null) =>
    StyleSheet.create({
        container: {
            width: '100%',
            height: '100%',
            paddingVertical: 30,
            alignItems: 'center',
            paddingHorizontal: 20,
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: theme?.colors?.background,
        },
        upBlock: {
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        },
        cardInside: {
            padding: 20,
        },
        img: {
            width: '100%', 
            height: '100%',
    },
        mainTitle: {
            fontSize: 34,
            lineHeight: 43,
            fontWeight: '600',
            marginTop: 30,
            marginBottom: 10,
            alignSelf: 'flex-start',
            color: theme?.colors?.text,
        },
        cardWrapper: {
            width: '100%',
            height: 265,
            borderRadius: 10,
            marginBottom: 20
        },
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
        description: {
            fontSize: 17,
            lineHeight: 20,
            color: theme?.colors?.text,
            marginBottom: 5,
            paddingLeft: 10,
            width: '100%',
        },
        input: {
            backgroundColor: theme?.colors?.background,
            height: 40,
            borderRadius: 5,
            width: '95%',
            marginTop: 10,
            paddingLeft: 10,
            marginLeft: 12,
            color: theme?.colors?.text,
        },
        btn: {
            width: 128,
            height: 50,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'flex-end',
        },
        btnTitle: {
            fontSize: 18,
            fontWeight: '700',
            lineHeight: 23,
        },
        centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 22,
        },
        modalView: {
            margin: 20,
            backgroundColor: 'white',
            borderRadius: 14,
            width: 280,
            height: 140,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 30,
        },
        button: {
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 5,
        },
        modalText: {
            marginTop: 20,
            paddingHorizontal: 20,
            textAlign: 'center',
            color: theme?.colors?.text,
            fontSize: 18,
            fontWeight: '700',
            lineHeight: 23,
        },
    });
