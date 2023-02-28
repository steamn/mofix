import {StyleSheet, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from 'context/App';
import SettingsRowItem from 'atoms/SettingsRowItem';
import {ThemeType} from 'context/types';
import useThemeStyles from 'hooks/useThemeStyles';
import {observer} from 'mobx-react';

const PositionScreen = () => {
  const style = useThemeStyles(styles);
  const {
    stores: {geoPositionStore},
  } = useContext(AppContext);

  const [data, setData] = useState<string>('');

  useEffect(() => {
    if (geoPositionStore.city) {
      setData(geoPositionStore.city);
    } else {
      setData('Москва');
    }
  }, []);

  useEffect(() => {
    if (data) {
      geoPositionStore.setCity(data);
    }
  }, [data]);

  return (
    <View style={style.container}>
      <View style={style.context}>
        <SettingsRowItem
          title={'Москва'}
          onpress={() => setData('Москва')}
          rowType={'check'}
          checked={data === 'Москва' ? true : false}
          Style={style.row}
        />
        <SettingsRowItem
          title={'Санкт-Петербург'}
          onpress={() => setData('Санкт-Петербург')}
          rowType={'check'}
          checked={data === 'Санкт-Петербург' ? true : false}
          Style={style.row}
        />
      </View>
    </View>
  );
};

export default observer(PositionScreen);

const styles = (theme: ThemeType | null) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    context: {
      height: '100%',
      width: '100%',
      paddingHorizontal: 16,
    },
    row: {
      borderBottomWidth: 0.3,
      borderBottomColor: 'grey',
      height: 50,
    },
  });
