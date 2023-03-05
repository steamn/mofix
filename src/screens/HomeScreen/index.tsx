import {
    ActivityIndicator,
    FlatList,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    RefreshControl
} from 'react-native';
import React, {useContext, useEffect, useState,useCallback} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AdvertBlock from 'atoms/AdvertBlock';
import NewsBlock from 'atoms/NewsBlock';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import {PullToRefreshView} from "react-native-smooth-pull-to-refresh";

import {ThemeType} from 'context/types';
import useTheme from 'hooks/useTheme';
import useThemeStyles from 'hooks/useThemeStyles';
import {observer} from 'mobx-react';
import {AppContext} from 'context/App';
import {HomeNavigatorParamsList} from 'nav/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {API_KEY} from '@env';
import axios from 'axios';
import {INews} from 'src/models/news';
import settingsScreen from "screens/SettingsScreen";

export interface NavScreenProps {
  navigation: NativeStackNavigationProp<HomeNavigatorParamsList, 'Home'>;
}

const HomeScreen: React.FC<NavScreenProps> = ({navigation}) => {
  const theme = useTheme();
  const style = useThemeStyles(styles);
  const {
    stores: {newsStore, promoStore, helperStore, authStore},
  } = useContext(AppContext);
  const baseUrl = API_KEY;

  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<INews[]>([]);
  const [loading, setLoading] = useState(false);
  const [promoLoaded, setPromoLoaded] = useState(false);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = useCallback(async () => {

      setRefreshing(true);
      // setLoading(true);
      setCurrentPage(1);
      // setData([])
      const res = await axios.get(`${baseUrl}news?page=1`);

      setData(res.data.data);
      setLoading(false);

      promoStore.getPromoList();
      newsStore.setNewsList(res.data.data);

      setRefreshing(false);

  }, []);



    const renderLoader = () => {
    return loading ? (
      <View style={style.loader}>
        <ActivityIndicator size={'large'} color={theme?.colors?.light_grey} />
      </View>
    ) : null;
  };

  async function loadApi() {

    if (loading) return;
    setLoading(true);
    const res = await axios.get(`${baseUrl}news?page=${currentPage}`);

    setData([...data, ...res.data.data]);
    setCurrentPage(currentPage + 1);
    setLoading(false);
  }

  useEffect(() => {
    loadApi();
    promoStore.getPromoList();
  }, []);

  useEffect(() => {
    newsStore.setNewsList(data);
  }, [data]);

  useEffect(() => {
    setPromoLoaded(!promoLoaded);
  }, [promoStore.promoList]);

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const Header = () => {
    return (
      <>
        <Text style={style.blockTitle}>Акции</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            height: 255,
            width: '100%',

          }}>
          <View style={style.advertWrapper}>
            {promoStore.promoList.map((item,index) => {
              return (
                <AdvertBlock
                  img={`https://pqdev.ru/storage/${item.image}`}
                  date={new Date(item.promo_end).toLocaleString(
                    'ru-RU',
                    options,
                  )}
                  desc={item.title}
                  onpress={() => {
                    promoStore.getPromoItem(item.id.toString());
                    helperStore.setPromoOrNewsType('promo');
                    navigation.navigate('News');
                  }}
                  key={index}
                />
              );
            })}
          </View>
        </ScrollView>
      </>
    );
  };


  return (
    <SafeAreaView style={style.container}>
        <Pressable
            style={style.settings}
            onPress={() => navigation.navigate('Settings')}>
            <Ionicons
                name="person"
                color={theme?.colors?.background_form}
                size={30}
            />
        </Pressable>

        <FlatList
            ListHeaderComponent={() => (
                <View>
                    {promoStore.promoList.length ? <Header /> : null}
                    <Text style={style.blockTitle}>Новости</Text>
                </View>
            )}
            showsVerticalScrollIndicator={false}
            data={data}
            style={style.newsList}
            renderItem={({item}) => (
                <NewsBlock
                    img={`https://pqdev.ru/${item.image}`}
                    desc={item.title}
                    onpress={() => {
                        newsStore.getNewsItem(+item.id);
                        helperStore.setPromoOrNewsType('news');
                        navigation.navigate('News');
                    }}
                />
            )}
            keyExtractor={item => item.id.toString()}
            ListFooterComponent={renderLoader}
            onEndReached={loadApi}
            onEndReachedThreshold={0.1}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        />

    </SafeAreaView>
  );




};

export default observer(HomeScreen);

const styles = (theme: ThemeType | null) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      paddingHorizontal: 16,
      backgroundColor: theme?.colors?.background,
    },
    settings: {
      alignItems: 'flex-end',
      marginTop: 10,
    },
    advertWrapper: {
      width: '100%',
      height: '100%',
      flexDirection: 'row',
    },
    blockTitle: {
      fontSize: 21,
      lineHeight: 26,
      fontWeight: '600',
      marginVertical: 10,
      color: theme?.colors?.text,
    },
    newsList: {width: '100%', height: '100%'},
    loader: {
      marginVertical: 10,
      alignItems: 'center',
      width: '100%',
    },
  });
