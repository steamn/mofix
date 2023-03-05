import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  StatusBar,
    ActivityIndicator,
  Platform
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {ThemeType} from 'context/types';
import useTheme from 'hooks/useTheme';
import useThemeStyles from 'hooks/useThemeStyles';
import {observer} from 'mobx-react';
import {AppContext} from 'context/App';
import {toJS} from 'mobx';
import {INews} from 'src/models/news';
import {IPromo} from 'src/models/promo';
import {HomeNavigatorParamsList} from 'nav/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import RenderHtml from 'react-native-render-html';

export interface NavScreenProps {
  navigation: NativeStackNavigationProp<HomeNavigatorParamsList, 'News'>;
}

const NewsScreen: React.FC<NavScreenProps> = ({navigation}) => {
  const theme = useTheme();
  const style = useThemeStyles(styles);

  const tagsStyles = {
    body: {
      whiteSpace: 'normal',
      color: theme?.colors?.text,
      fontSize: 16,
      lineHeight: 24,
    },
    a: {
      color: theme?.colors?.blue,
      textDecorationLine: 'none',
    },
    link: {
      color: theme?.colors?.background_form,
    },
    p: {
      margin: 0,
    },
    br: {
      height: 0,
    },
  };

  const checkImg = (text: string | undefined) => {
    const reW = /img src/;
    const re = /\.\.\/\.\.\/\.\.\//g;
    const path = 'https://pqdev.ru/';
    let newText = '';
    if (text && text.match(reW)) {
      newText = text.replace(re, path);
      return newText;
    } else {
      return text;
    }
  };

  const {
    stores: {newsStore, promoStore, helperStore},
  } = useContext(AppContext);

  const [newsContent, setNewsContent] = useState<INews | undefined>(undefined);
  const [promoContent, setPromoContent] = useState<IPromo | null>(null);
  const [ loader, setLoader ] = React.useState<boolean>(true);


  useEffect(() => {
    setNewsContent(newsStore.newsItem);
  }, [newsStore.newsItem]);

  useEffect(() => {
    setPromoContent(promoStore.promoItem);
  }, [promoStore.promoItem]);

  useEffect(() => {

    const unsubscribe = navigation.addListener('focus', () => {
      setTimeout(function(){
        setLoader(false)
      }, 1500)
    });

  }, [promoContent?.image]);


  function WebDisplay({html}) {
    const {width: contentWidth} = useWindowDimensions();
    return (
      <RenderHtml
        contentWidth={contentWidth}
        source={{html}}
        tagsStyles={tagsStyles}
      />
    );
  }
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };


  if(loader)
  {
    return (
      <View style={style.loader}>
        <ActivityIndicator size="large" color={theme?.colors?.light_grey} />
      </View>
    )
  }

  return (

      <View style={{width: '100%', flex:1}}>
        <Pressable
            onPress={() => {
              setNewsContent(undefined);
              setPromoContent(null);
              navigation.goBack();
            }}
            style={style.arrow}>
          <AntDesign
              name="arrowleft"
              color={theme?.colors?.background_form}
              size={35}
          />
        </Pressable>
        <ScrollView showsVerticalScrollIndicator={false} style={style.container}>
          <StatusBar translucent={true} hidden={false} backgroundColor="transparent" barStyle={'dark-content'}   />

          <View style={style.imgWrapper}>
            <Image
                source={{
                  uri:
                      helperStore.newsOrPromoType === 'news'
                          // ? `https://pqdev.ru/storage/${newsContent?.image}`
                          ? `https://pqdev.ru/${newsContent?.image}`
                          : `https://pqdev.ru/storage/${promoContent?.image}`,
                }}
                style={style.img}
                resizeMode="cover"
            />
          </View>


          <View style={style.content}>
            <Text style={style.title}>
              {helperStore.newsOrPromoType === 'news'
                  ? toJS(newsContent?.title)
                  : toJS(promoContent?.title)}
            </Text>
            <Text style={style.date}>
              {helperStore.newsOrPromoType === 'promo'
                  ? new Date(promoContent?.promo_start).toLocaleString(
                      'ru-RU',
                      options,
                  ) +
                  ' - ' +
                  new Date(promoContent?.promo_end).toLocaleString('ru-RU', options)
                  : null}
            </Text>
            <WebDisplay
                html={
                  helperStore.newsOrPromoType === 'news'
                      ? `${checkImg(newsContent?.content)}`
                      : `${checkImg(promoContent?.content)}`
                }
            />
          </View>




        </ScrollView>

      </View>

  );
};

export default observer(NewsScreen);

const styles = (theme: ThemeType | null) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme?.colors?.background,
      // position:'absolute',
      // top:-200,
      // left: 0
    },
    imgWrapper: {
      width: '100%',
      height: 250,
      // marginBottom: -10,
    },
    arrow: {
      position: 'absolute',
      top: Platform.OS === 'ios' ? 56 : 56,
      left: 30,
      zIndex:9999
    },
    img: {
      width: '100%',
      height: '100%',
    },
    content: {
      width: '100%',
      height: '100%',
      borderRadius: 10,
      paddingHorizontal: 16,
      zIndex: 10,
      backgroundColor: theme?.colors?.background,
    },
    title: {
      fontSize: 20,
      fontWeight: '600',
      lineHeight: 24,
      marginVertical: 15,
      color: theme?.colors?.text,
    },
    text: {
      fontSize: 16,
      lineHeight: 22,
      marginBottom: 20,
      color: theme?.colors?.text,
    },
    date: {
      fontSize: 16,
      lineHeight: 22,
      marginBottom: 20,
      color: theme?.colors?.text_gray,

    },

    loader: {
      width:'100%',
      height:'100%',
      justifyContent:'center',
      alignItems:'center',
      position:'absolute',
      bottom:0,
      left:0,
      zIndex:9999,
      backgroundColor:'white'
    },

  });
