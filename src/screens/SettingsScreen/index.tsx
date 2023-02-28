import {
  Image,
  Linking,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import SettingsRowItem from 'atoms/SettingsRowItem';
import LinksRow from 'atoms/LinksRow';
import MainButton from 'atoms/MainButton';
import {AppContext} from 'context/App';
import {observer} from 'mobx-react';
import {ThemeType} from 'context/types';
import useTheme from 'hooks/useTheme';
import useThemeStyles from 'hooks/useThemeStyles';

import {HomeNavigatorParamsList} from 'nav/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

interface CityRowProps {
  city: string;
  onpress: () => void;
}

export interface NavScreenProps {
  navigation: NativeStackNavigationProp<HomeNavigatorParamsList, 'Settings'>;
}

const CityRow = ({city = 'Москва', onpress}: CityRowProps): JSX.Element => {
  const theme = useTheme();
  const style = useThemeStyles(styles);
  return (
    <TouchableOpacity style={style.addBlock} onPress={onpress}>
      <Text
        style={{
          fontSize: 18,
          lineHeight: 23,
          fontWeight: '500',
          color: theme?.colors?.text,
        }}>
        Город
      </Text>
      <Text
        style={{fontSize: 18, lineHeight: 23, color: theme?.colors?.text_gray}}>
        {city}
      </Text>
    </TouchableOpacity>
  );
};

const SettingsScreen: React.FC<NavScreenProps> = ({navigation}) => {
  const theme = useTheme();
  const style = useThemeStyles(styles);

  const {
    stores: {geoPositionStore, informationStore, authStore, helperStore},
  } = useContext(AppContext);

  const [isNotification, setIsNotification] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScrollView contentContainerStyle={style.container}>
      <View>
        <View style={style.block}>
          <Text style={style.blockTitle}>Общее</Text>
          {authStore.token ? (
            <SettingsRowItem
              title="Личные данные"
              onpress={() => {
                if (authStore.token) {
                  navigation.navigate('PersonalData');
                } else {
                  setModalVisible(!modalVisible);
                }
              }}
              rowType="chevron"
            />
          ) : null}
          {/* <SettingsRowItem
            title="Уведомления"
            onpress={() => setIsNotification(!isNotification)}
            rowType="check"
            checked={isNotification}
          /> */}
          <CityRow
            onpress={() => navigation.navigate('Position')}
            city={geoPositionStore.city ? geoPositionStore.city : 'Москва'}
          />
        </View>
        <View style={style.block}>
          <Text style={style.blockTitle}>Контакты</Text>
          <LinksRow
            title={'Наш сайт'}
            onpress={() => Linking.openURL('https://mommysapp.ru/')}
            icon={'web'}
          />
          <LinksRow
            title={'Почта'}
            onpress={() => Linking.openURL('mailto:sprosimommys@gmail.com')}
            icon={'mail'}
          />
        </View>
        <View style={[style.block, {borderBottomColor: 'white'}]}>
          <Text style={style.blockTitle}>Юридическая информация:</Text>
          <SettingsRowItem
            title="Условия программы лояльности"
            onpress={() => {
              informationStore.setTitle('Условия программы лояльности');
              navigation.navigate('Information');
            }}
            rowType="chevron"
          />
          <SettingsRowItem
            title="Обработка персональных данных"
            onpress={() => {
              informationStore.setTitle('Обработка персональных данных');
              navigation.navigate('Information');
            }}
            rowType="chevron"
          />
        </View>
      </View>
      {authStore.token ? (
        <MainButton
          title="Выход"
          onpress={() => {
            authStore.removeToken();
            helperStore.removeStatus();
            authStore.cancelCheckCodeSuccess();
          }}
        />
      ) : null}
    </ScrollView>
  );
};

export default observer(SettingsScreen);

const styles = (theme: ThemeType | null) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      paddingHorizontal: 16,
      justifyContent: 'space-between',
    },
    block: {
      borderBottomWidth: 0.3,
      borderBottomColor: 'grey',
      paddingBottom: 10,
    },
    blockTitle: {
      color: theme?.colors?.text_gray,
      fontSize: 18,
      lineHeight: 23,
      fontWeight: '400',
      paddingVertical: 10,
    },
    addBlock: {
      width: '100%',
      height: 40,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 10,
    },
    socialBlock: {
      flexDirection: 'row',
      paddingVertical: 10,
    },
    socialImg: {
      marginRight: 20,
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
      padding: 20,
      width: '90%',
      height: 230,
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
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 50,
      backgroundColor: theme?.colors?.background_form,
    },
    modalText: {
      textAlign: 'center',
      color: theme?.colors?.background_form,
      fontSize: 18,
      fontWeight: '600',
    },
  });
