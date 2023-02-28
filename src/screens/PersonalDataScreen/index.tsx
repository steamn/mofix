import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import DatePicker from 'react-native-date-picker';
import {ThemeType} from 'context/types';
import useTheme from 'hooks/useTheme';
import useThemeStyles from 'hooks/useThemeStyles';
import MainButton from 'atoms/MainButton';
import {observer} from 'mobx-react';
import {AppContext} from 'context/App';

const PersonalDataScreen = () => {
  const theme = useTheme();
  const style = useThemeStyles(styles);

  const {
    stores: {userStore},
  } = useContext(AppContext);

  const [name, setName] = useState<string>('');
  // const [surname, setSurname] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date(1990, 0, 2));
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setName(userStore.name);
    if (userStore.birthday) {
      setDate(new Date(userStore.birthday));
    } else {
      setDate(new Date(1990, 0, 2));
    }
  }, []);

  if (!date) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color={theme?.colors?.text} size={'large'} />
      </View>
    );
  }

  return (
    <View style={style.container}>
      <View style={style.row}>
        <Text style={style.title}>Имя</Text>
        <TextInput
          style={style.input}
          onChangeText={setName}
          value={name}
          placeholder={'Ваше имя'}
          placeholderTextColor={theme?.colors?.text_gray}
        />
      </View>
      {/* <View style={style.row}>
        <Text style={style.title}>Фамилия</Text>
        <TextInput
          style={style.input}
          onChangeText={setSurname}
          value={surname}
          placeholder={'Ваша фамилия'}
          placeholderTextColor={theme?.colors?.text_gray}
        />
      </View> */}
      <View style={style.row}>
        <Text style={style.title}>Дата рождения</Text>
        <Pressable onPress={() => setOpen(true)} style={style.dateWrapper}>
          <Text style={style.date}>{date.toLocaleDateString()}</Text>
        </Pressable>
      </View>
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
        mode={'date'}
      />
      <View style={{marginTop: 50, width: '100%', height: '100%'}}>
        <MainButton
          onpress={() => {
            userStore.setData({
              name: name,
              birthday: date,
            });
          }}
          title={'Сохранить'}
        />
      </View>
    </View>
  );
};

export default observer(PersonalDataScreen);

const styles = (theme: ThemeType | null) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      backgroundColor: theme?.colors?.background,
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      height: 60,
      paddingVertical: 10,
      justifyContent: 'space-between',
    },
    title: {
      fontSize: 18,
      fontWeight: '500',
      lineHeight: 23,
      color: theme?.colors?.text,
    },
    input: {
      color: theme?.colors?.text,
      width: '50%',
      paddingLeft: 10,
      height: 40,
      backgroundColor: '#f7f5f5',
      borderRadius: 10,
    },
    date: {
      color: theme?.colors?.text,
    },
    dateWrapper: {
      width: '50%',
      height: 40,
      paddingLeft: 10,
      backgroundColor: '#f7f5f5',
      borderRadius: 10,
      justifyContent: 'center',
    },
  });
