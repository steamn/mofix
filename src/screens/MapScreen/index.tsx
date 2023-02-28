import {
  ActivityIndicator,
  Dimensions,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import React, {LegacyRef, useContext, useEffect, useRef, useState} from 'react';
import MapView, {Camera, Marker} from 'react-native-maps';
import {ThemeType} from 'context/types';
import useTheme from 'hooks/useTheme';
import useThemeStyles from 'hooks/useThemeStyles';
import CompanyInfo from 'atoms/CompanyInfo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {AppContext} from 'context/App';
import DescriptionBlock from 'molecules/DescriptionBlock';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {observer} from 'mobx-react';
import FilterBlock from 'molecules/FilterBlock';
import {IPartner} from 'src/models/partner';
import {MarkerIcon} from 'icons/MarkerIcon';
import Entypo from 'react-native-vector-icons/Entypo';

import {MapNavigatorParamsList} from 'nav/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {IRegion} from 'src/models/region';
import moment from 'moment';

export interface NavScreenProps {
  navigation: NativeStackNavigationProp<MapNavigatorParamsList, 'MapScreen'>;
}

const MapScreen: React.FC<NavScreenProps> = ({navigation}) => {
  const theme = useTheme();
  const style = useThemeStyles(styles);
  const {
    stores: {helperStore, partnersStore, geoPositionStore},
  } = useContext(AppContext);

  const map: LegacyRef<MapView> = useRef(null);

  const [location, setLocation] = useState<IRegion | null>(null);

  const [isShow, setisShow] = useState<boolean>(false);
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

  //date
  const day = moment().isoWeekday() - 1;
  const hour = moment().hour() + 1;
  const currentWorkingState = (fromH: number, toH: number) => {
    if (fromH && fromH !== 0 && fromH >= hour && toH < hour) {
      return true;
    } else {
      return false;
    }
  };
  //coords
  const msk = {
    latitude: 55.751244,
    longitude: 37.618423,
    latitudeDelta: 0.1,
    longitudeDelta:
      (Dimensions.get('window').width / Dimensions.get('window').height) * 0.1,
  };
  const spb = {
    latitude: 59.93863,
    longitude: 30.31413,
    latitudeDelta: 0.1,
    longitudeDelta:
      (Dimensions.get('window').width / Dimensions.get('window').height) * 0.1,
  };

  const zoomIn = () => {
    if (location) {
      setLocation({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: location.latitudeDelta * 1.5,
        longitudeDelta: location.longitudeDelta * 1.5,
      });
      map.current?.animateToRegion(location, 100);
    }
  };
  const zoomOut = () => {
    if (location) {
      setLocation({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: location.latitudeDelta / 1.5,
        longitudeDelta: location.longitudeDelta / 1.5,
      });
      map.current?.animateToRegion(location, 100);
    }
  };

  useEffect(() => {
    if (!geoPositionStore.city.length || geoPositionStore.city === 'Москва') {
      setLocation(msk);
    } else {
      setLocation(spb);
    }
  }, []);

  useEffect(() => {
    setPartnersOnMap(partnersStore.parnersList);
  }, [partnersStore.parnersList]);

  useEffect(() => {
    if (!showFilter) {
      helperStore.setTopTabBarHeight(50);
    }
  }, [showFilter]);

  if (!location) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color={theme?.colors?.text_gray} size={'large'} />
      </View>
    );
  }

  return (
    <View style={StyleSheet.absoluteFillObject}>
      {Platform.OS === 'android' ? (
        <MapView
          ref={map}
          minZoomLevel={5}
          maxZoomLevel={15}
          initialRegion={location}
          style={StyleSheet.absoluteFillObject}
          showsPointsOfInterest={false}
          zoomControlEnabled={false}
          zoomEnabled={true}
          onPress={() => setisShow(false)}>
          {partnersOnMap.map(item => (
            <Marker
              coordinate={{
                latitude: +item.latitude,
                longitude: +item.longitude,
              }}
              tracksViewChanges={false}
              key={item.id}
              onPress={() => {
                setisShow(true);
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
              }}>
              <MarkerIcon />
            </Marker>
          ))}
        </MapView> 
      ) : (
        <MapView
          ref={map}
          minZoomLevel={5}
          maxZoomLevel={15}
          initialRegion={location}
          style={StyleSheet.absoluteFillObject}
          showsPointsOfInterest={false}
          zoomControlEnabled={false}
          onPress={() => setisShow(false)}>
          {partnersOnMap.map(item => (
            <Pressable
              key={item.id}
              onPress={() => {
                setisShow(true);
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
              }}>
              <Marker
                coordinate={{
                  latitude: +item.latitude,
                  longitude: +item.longitude,
                }}
                tracksViewChanges={false}
                stopPropagation={true}
                key={item.id}>
                <MarkerIcon />
              </Marker>
            </Pressable>
          ))}
        </MapView>
      )}
      <View>
        <Pressable
          style={[style.zoomBtn, {right: 10, top: 180}]}
          onPress={zoomOut}>
          <Entypo
            name="plus"
            size={40}
            color={theme?.colors?.background_form}
          />
        </Pressable>
      </View>
      <Pressable
        style={[style.zoomBtn, {right: 10, top: 250}]}
        onPress={zoomIn}>
        <Entypo name="minus" size={40} color={theme?.colors?.background_form} />
      </Pressable>
      {isShow ? (
        <View style={style.infoBlock}>
          <CompanyInfo
            category={data.category}
            name={data.name}
            address={data.address}
            onDuty={data.open}
            onpress={() => {
              setShowDescr(true);
              setisShow(false);
              helperStore.setTopTabBarHeight(0);
            }}
            fromH={data.fromH}
            fromM={data.fromM}
            toH={data.toH}
            toM={data.toM}
            Style={{borderBottomColor: theme?.colors?.background}}
          />
        </View>
      ) : null}
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
              size={24}
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
          setisShow(false);
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

export default observer(MapScreen);

const styles = (theme: ThemeType | null) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    infoBlock: {
      width: '100%',
      height: 200,
      zIndex: 10,
      position: 'absolute',
      bottom: 0,
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
      backgroundColor: theme?.colors?.background,
      position: 'absolute',
      bottom: 220,
      right: 10,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 5,
    },
    zoomBtn: {
      width: 44,
      height: 44,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme?.colors?.background,
      position: 'absolute',
    },
  });
