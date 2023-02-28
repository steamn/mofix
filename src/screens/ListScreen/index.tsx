import {
  ActivityIndicator,
  BackHandler,
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {ThemeType} from 'context/types';
import useTheme from 'hooks/useTheme';
import useThemeStyles from 'hooks/useThemeStyles';
import CompanyInfo from 'atoms/CompanyInfo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DescriptionBlock from 'molecules/DescriptionBlock';
import {AppContext} from 'context/App';
import {observer} from 'mobx-react';
import {IPartner} from 'src/models/partner';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FilterBlock from 'molecules/FilterBlock';

import {MapNavigatorParamsList} from 'nav/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {toJS} from 'mobx';
import moment from 'moment';

export interface NavScreenProps {
  navigation: NativeStackNavigationProp<MapNavigatorParamsList, 'ListScreen'>;
}

const ListScreen: React.FC<NavScreenProps> = ({navigation}) => {
  const theme = useTheme();
  const style = useThemeStyles(styles);

  const {
    stores: {helperStore, partnersStore, filterStore},
  } = useContext(AppContext);

  const [showDescr, setShowDescr] = useState<boolean>(false);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [partnersOnMap, setPartnersOnMap] = useState<IPartner[]>([]);
  const [data, setData] = useState<{
    category: string;
    name: string;
    address: string;
    fromH: string;
    fromM: string;
    toH: string;
    toM: string;
    open: boolean;
  }>({
    category: '',
    name: '',
    address: '',
    fromH: '',
    fromM: '',
    toH: '',
    toM: '',
    open: false,
  });

  const day = moment().isoWeekday() - 1;
  const hour = moment().hour() + 1;
  const currentWorkingState = (fromH: number, toH: number) => {
    if (fromH && fromH !== 0 && fromH >= hour && toH < hour) {
      return false;
    } else {
      return false;
    }
  };

  useEffect(() => {
    partnersStore.getPartnersList();
    filterStore.getAllCategoriesList();
  }, []);

  useEffect(() => {
    const backAction = () => {
      helperStore.setTopTabBarHeight(50);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    setPartnersOnMap(toJS(partnersStore.parnersList));
  }, [partnersStore.parnersList]);

  useEffect(() => {
    if (!showFilter) {
      helperStore.setTopTabBarHeight(50);
    }
  }, [showFilter]);

  if (!partnersOnMap) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color={theme?.colors?.text_gray} size={'large'} />
      </View>
    );
  }

  return (
    <View style={style.container}>
      <FlatList
        data={partnersOnMap}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => {
          return (
            <CompanyInfo
              category={item.category.name}
              name={item.title}
              address={item.address}
              onDuty={item.isOpen}
              onpress={() => {
                helperStore.setTopTabBarHeight(0);
                setShowDescr(true),
                  setData({
                    category: item.category.name,
                    name: item.title,
                    address: item.address,
                    fromH: item.days[day].pivot.from_hours,
                    fromM: item.days[day].pivot.from_minutes,
                    toH: item.days[day].pivot.to_hours,
                    toM: item.days[day].pivot.to_minutes,
                    open: item.isOpen,
                  });
                partnersStore.getPartner(item.id.toString());
              }}
              fromH={item.days[day].pivot.from_hours}
              fromM={item.days[day].pivot.from_minutes}
              toH={item.days[day].pivot.to_hours}
              toM={item.days[day].pivot.to_minutes}
            />
          );
        }}
      />
      {showDescr ? (
        <View style={style.descrWrapper}>
          <Pressable
            onPress={() => {
              setShowDescr(false);
              helperStore.setTopTabBarHeight(50);
              partnersStore.cleanPartner();
            }}
            style={{marginTop: 20, marginLeft: 20, marginBottom: 10}}>
            <AntDesign
              name="arrowleft"
              color={theme?.colors?.background_form}
              size={30}
            />
          </Pressable>
          <View style={{width: '100%', height: '100%', paddingHorizontal: 20}}>
            {partnersStore.partner ? (
              <DescriptionBlock
                phone={partnersStore.partner?.phone}
                text={'22'}
                data={partnersStore.partner?.days}
                img={`https://pqdev.ru/storage/${partnersStore.partner?.image}`}
                category={data.category}
                name={data.name}
                address={data.address}
                onDuty={data.open}
                fromH={data.fromH}
                fromM={data.fromM}
                toH={data.toH}
                toM={data.toM}
                descr={`${partnersStore.partner?.desc}`}
              />
            ) : null}
          </View>
        </View>
      ) : null}
      <Pressable
        style={style.filterIcon}
        onPress={() => {
          setShowFilter(true);
          helperStore.setTopTabBarHeight(0);
        }}>
        <Fontisto
          name={'filter'}
          color={theme?.colors?.background_form}
          size={20}
        />
      </Pressable>
      {showFilter ? (
        <FilterBlock
          onpress={() => {
            setShowFilter(false);
            helperStore.setTopTabBarHeight(50);
          }}
          btnOnPress={() => {
            if (partnersStore.checkedCategories.length > 0) {
              partnersStore.getCheckedPartnersList();
            }
            setShowFilter(false);
          }}
        />
      ) : null}
    </View>
  );
};

export default observer(ListScreen);

const styles = (theme: ThemeType | null) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      backgroundColor: theme?.colors?.background,
    },
    descrWrapper: {
      width: '100%',
      height: '100%',
      zIndex: 1,
      backgroundColor: theme?.colors?.background,
    },
    filterIcon: {
      width: 44,
      height: 44,
      borderRadius: 50,
      backgroundColor: '#edf0f5',
      position: 'absolute',
      bottom: 150,
      right: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
