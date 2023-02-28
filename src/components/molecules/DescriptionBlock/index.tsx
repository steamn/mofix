import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Linking,
  ScrollView,
} from 'react-native';
import React from 'react';
import {ThemeType} from 'context/types';
import useTheme from 'hooks/useTheme';
import useThemeStyles from 'hooks/useThemeStyles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RenderHtml, {HTMLSource} from 'react-native-render-html';
import {useWindowDimensions} from 'react-native';
import CompanyInfo from 'atoms/CompanyInfo';
import FastImage from 'react-native-fast-image';

interface DataProps {
  id: number;
  name: string;
  pivot: {
    day_id: number;
    from_hours: string;
    from_minutes: string;
    to_hours: string;
    to_minutes: string;
  };
}

interface DescriptionBlockProps {
  phone: string;
  img?: string;
  text: string;
  data: DataProps[];
  category: string;
  name: string;
  address: string;
  onDuty: boolean;
  onpress?: () => void;
  fromH: string;
  fromM: string;
  toH: string;
  toM: string;
  descr: HTMLSource;
}

const DescriptionBlock = ({
  data,
  phone,
  img,
  text,
  category,
  name,
  address,
  onDuty,
  onpress,
  fromH,
  fromM,
  toH,
  toM,
  descr,
}: DescriptionBlockProps): JSX.Element => {
  const theme = useTheme();
  const style = useThemeStyles(styles);
  const {width} = useWindowDimensions();

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

  const dayTransf = (item: string) => {
    if (item === 'monday') {
      return 'пн';
    } else if (item === 'tuesday') {
      return 'вт';
    } else if (item === 'wednesday') {
      return 'ср';
    } else if (item === 'thursday') {
      return 'чт';
    } else if (item === 'friday') {
      return 'пт';
    } else if (item === 'saturday') {
      return 'сб';
    } else if (item === 'sunday') {
      return 'вс';
    } else {
      return;
    }
  };
  return (
    <ScrollView
      style={{flex: 1, marginBottom: 60}}
      showsVerticalScrollIndicator={false}>
      <CompanyInfo
        category={category}
        name={name}
        address={address}
        onDuty={onDuty}
        fromH={fromH}
        fromM={fromM}
        toH={toH}
        toM={toM}
        Style={{paddingHorizontal: 0}}
      />
      <View style={style.scedule}>
        {data.map((item: DataProps, idx) => {
          return (
            <View style={style.day} key={idx}>
              <Text style={style.dayTitle}>{dayTransf(item.name)}</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={style.daySubTitle}>{item.pivot.from_hours  == "0" ? "  В  " : item.pivot.from_hours + ":"}</Text>
                <Text style={style.daySubTitle}>{item.pivot.from_minutes  == "0" ? "" : item.pivot.from_minutes}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={style.daySubTitle}>{item.pivot.to_hours == "0" ? " " : item.pivot.to_hours + ":"}</Text>
                <Text style={style.daySubTitle}>{item.pivot.to_minutes == "0" ? "" : item.pivot.to_minutes}</Text>
              </View>
            </View>
          );
        })}
      </View>
      <View style={style.phoneBlock}>
        <Text style={style.phoneNumberTitle}>Номер телефона</Text>
        <View style={style.phoneRow}>
          <Text style={style.phoneNumber}>{phone}</Text>
          <Pressable onPress={() => Linking.openURL(`tel:${phone}`)}>
            <FontAwesome
              name={'phone'}
              color={theme?.colors?.background_form}
              size={28}
            />
          </Pressable>
        </View>
      </View>
      {img && (
        <FastImage
          style={style.img}
          source={{
            uri: img,
            headers: {Authorization: 'someAuthToken'},
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      )}
      <WebDisplay html={descr} />
    </ScrollView>
  );
};

export default DescriptionBlock;

const styles = (theme: ThemeType | null) =>
  StyleSheet.create({
    scedule: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomWidth: 0.5,
      borderBottomColor: theme?.colors?.text_gray,
    },
    day: {
      marginRight: 7,
      marginBottom: 15,
    },
    dayTitle: {
      fontSize: 15,
      lineHeight: 23,
      color: theme?.colors?.text,
      alignSelf: 'center',
      marginBottom: 5,
    },
    daySubTitle: {
      fontSize: 15,
      lineHeight: 23,
      color: theme?.colors?.text_gray,
    },
    phoneBlock: {
      borderBottomWidth: 0.5,
      borderBottomColor: theme?.colors?.text_gray,
      paddingBottom: 15,
      marginBottom: 20,
    },
    phoneNumberTitle: {
      fontSize: 18,
      lineHeight: 23,
      color: theme?.colors?.text_gray,
      paddingVertical: 10,
    },
    phoneRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    phoneNumber: {
      fontSize: 18,
      lineHeight: 23,
      fontWeight: '500',
      color: theme?.colors?.background_form,
    },
    img: {
      height: 180,
      width: '100%',
      borderRadius: 5,
    },
  });
