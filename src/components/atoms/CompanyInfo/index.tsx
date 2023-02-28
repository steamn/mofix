import {Pressable, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React from 'react';

import {ThemeType} from 'context/types';
import useTheme from 'hooks/useTheme';
import useThemeStyles from 'hooks/useThemeStyles';

export interface CompanyInfoProps {
  category: string;
  name: string;
  address: string;
  onDuty: boolean;
  onpress?: () => void;
  fromH: string;
  fromM: string;
  toH: string;
  toM: string;
  Style?: ViewStyle;
}

const CompanyInfo = ({
  category,
  name,
  address,
  onDuty,
  onpress,
  fromH,
  fromM,
  toH,
  toM,
  Style,
}: CompanyInfoProps): JSX.Element => {
  const theme = useTheme();
  const style = useThemeStyles(styles);
  return (
    <Pressable onPress={onpress} style={[style.container, {...Style}]}>
      <Text style={style.category}>{category}</Text>
      <Text style={style.name}>{name}</Text>
      <Text style={style.address}>{address}</Text>
      <Text style={style.timeTitle}>Время работы</Text>
      {onDuty ? (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={[style.timeSubTitle, {marginRight: 10}]}>Сегодня</Text>
          <Text style={style.timeSubTitle}>{fromH}</Text>
          <Text style={style.timeSubTitle}>:{fromM}-</Text>
          <Text style={style.timeSubTitle}>{toH}:</Text>
          <Text style={style.timeSubTitle}>{toM}</Text>
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 10,
              backgroundColor: '#75FB4C',
              marginLeft: 15,
              marginBottom: 10,
            }}
          />
        </View>
      ) : (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={style.timeSubTitle}>Закрыто</Text>
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 10,
              backgroundColor: '#E93323',
              marginLeft: 15,
              marginBottom: 10,
            }}
          />
        </View>
      )}
    </Pressable>
  );
};

export default CompanyInfo;

const styles = (theme: ThemeType | null) =>
  StyleSheet.create({
    container: {
      width: '100%',
      marginBottom: 5,
      justifyContent: 'flex-start',
      borderBottomWidth: 0.3,
      borderBottomColor: theme?.colors?.text_gray,
      paddingHorizontal: 20,
    },
    category: {
      fontSize: 15,
      lineHeight: 19,
      fontWeight: '500',
      fontFamily: 'PTRootUI-Regular',
      color: theme?.colors?.text_gray,
      marginBottom: 5,
      marginTop: 10,
    },
    name: {
      fontSize: 21,
      lineHeight: 26,
      fontWeight: '700',
      fontFamily: 'PTRootUI-Regular',
      color: theme?.colors?.text,
      marginBottom: 10,
    },
    address: {
      fontSize: 18,
      lineHeight: 23,
      fontWeight: '500',
      fontFamily: 'PTRootUI-Regular',
      color: theme?.colors?.text,
      marginBottom: 15,
    },
    timeTitle: {
      fontSize: 18,
      lineHeight: 23,
      fontWeight: '400',
      fontFamily: 'PTRootUI-Regular',
      color: theme?.colors?.text_gray,
      marginBottom: 5,
    },
    timeSubTitle: {
      fontSize: 18,
      lineHeight: 23,
      fontWeight: '500',
      fontFamily: 'PTRootUI-Regular',
      color: theme?.colors?.text,
      marginBottom: 15,
    },
  });
