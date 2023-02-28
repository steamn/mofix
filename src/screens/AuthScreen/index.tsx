import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {ThemeType} from 'context/types';
import useTheme from 'hooks/useTheme';
import useThemeStyles from 'hooks/useThemeStyles';
import {observer} from 'mobx-react';
import {AppContext} from 'context/App';

import {AuthNavigatorParamsList} from 'nav/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export interface NavScreenProps {
    navigation: NativeStackNavigationProp<AuthNavigatorParamsList, 'SendPhone'>;
}

const AuthScreen: React.FC<NavScreenProps> = ({navigation}) => {
    const theme = useTheme();
    const style = useThemeStyles(styles);
    const {
        stores: {authStore},
    } = useContext(AppContext);

    const [code, setCode] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    useEffect(() => {
        if (code.length === 4) {
            authStore.getToken({phone: authStore.phoneNumber, code: code});
        }
    }, [code]);

    useEffect(() => {
        if (authStore.checkCodeSuccess) {
            navigation.navigate('Status');
        }
    }, [authStore.checkCodeSuccess]);

    useEffect(() => {
        if (authStore.getTokenError) {
            setCode('');
            setModalVisible(true);
        }
    }, [authStore.getTokenError]);

    return (
        <View style={style.container}>
            <View style={style.phoneWrapper}>
                <Text style={style.phone}>{authStore.formattedPhone}</Text>
                <Text style={style.sendMess}>Мы отправили вам СМС с кодом</Text>
            </View>
            <View style={style.inputWrapper}>
                <TextInput
                    keyboardType={'numeric'}
                    caretHidden
                    style={style.input}
                    onChangeText={t => setCode(t)}
                    value={code}
                    maxLength={4}
                    autoFocus
                />
                {Array(4)
                    .fill('')
                    .map((_, index) => (
                        <View key={index.toString()} style={style.item}>
                            <Text style={{color: 'black', fontSize: 45}}>{code[index]}</Text>
                        </View>
                    ))}
            </View>
            <View style={style.warn}>
                <Text style={[style.sendMess, {textAlign: 'center'}]}>
                    Повторите отправку через 1 минуту
                </Text>
            </View>
            <View style={style.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                        authStore.clearTokenError();
                    }}>
                    <View style={style.centeredView}>
                        <View style={style.modalView}>
                            <Text style={style.modalText}>Неверный код!</Text>
                            <Text style={style.modalMessage}>
                                Вы ввели не правильный код подтвержения, попробуйте еще раз
                            </Text>
                            <View
                                style={{
                                    width: '100%',
                                    borderBottomWidth: 0.5,
                                    marginTop: 20,
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
                                        {color: theme?.colors?.blue, fontWeight: '400'},
                                    ]}>
                                    Ok
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
};

export default observer(AuthScreen);

const styles = (theme: ThemeType | null) =>
    StyleSheet.create({
        container: {
            width: '100%',
            height: '100%',
            backgroundColor: theme?.colors?.background,
            paddingHorizontal: 20,
        },
        phoneWrapper: {
            marginTop: 150,
        },
        phone: {
            fontSize: 35,
            color: theme?.colors?.text,
            lineHeight: 35,
            fontWeight: '700',
        },
        sendMess: {
            fontSize: 18,
            color: theme?.colors?.text_gray,
            lineHeight: 23,
            fontWeight: '400',
        },
        inputWrapper: {
            flexDirection: 'row',
            marginTop: 25,
            alignItems: 'center',
        },
        input: {
            position: 'absolute',
            zIndex: 2,
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
            opacity: 0,
        },
        secure: {
            width: 15,
            height: 15,
            borderRadius: 15,
            marginHorizontal: 10,
        },
        item: {
            width: 75,
            height: 95,
            borderRadius: 10,
            marginHorizontal: 8,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme?.colors?.light_grey,
        },
        warn: {
            width: '100%',
            alignItems: 'center',
            marginTop: 100,
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
            borderRadius: 20,
            width: 270,
            height: 140,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
        },
        button: {
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 5,
        },
        modalText: {
            textAlign: 'center',
            color: theme?.colors?.text,
            fontSize: 18,
            fontWeight: '700',
            lineHeight: 38,
        },
        modalMessage: {
            textAlign: 'center',
            color: theme?.colors?.text,
            fontSize: 13,
            fontWeight: '400',
            lineHeight: 18,
        },
    });
