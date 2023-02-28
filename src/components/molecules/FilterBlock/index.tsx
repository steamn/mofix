import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {ThemeType} from 'context/types';
import useTheme from 'hooks/useTheme';
import useThemeStyles from 'hooks/useThemeStyles';
import {AppContext} from 'context/App';
import {observer} from 'mobx-react';
import FilterItem from 'atoms/FilterItem';
import MainButton from 'atoms/MainButton';

interface FilterBlockProps {
  onpress: () => void;
  btnOnPress: () => void;
}

const FilterBlock = ({onpress, btnOnPress}: FilterBlockProps): JSX.Element => {
  const theme = useTheme();
  const style = useThemeStyles(styles);
  const {
    stores: {filterStore, partnersStore},
  } = useContext(AppContext);

  const [filteredArr, setFilteredArr] = useState<number[]>([]);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    filterStore.getAllCategoriesList();
  }, []);

  useEffect(() => {
    setFilteredArr(partnersStore.checkedCategories);
  }, [pressed, filterStore.idsArray]);

  return (
    <View style={style.filterContainer}>
      <View style={style.filterHeader}>
        <Pressable style={style.headerBtn} onPress={onpress}>
          <Text style={style.filterHeaderBtnTitle}>Отмена</Text>
        </Pressable>
        <Text style={style.filterHeaderTitle}>Фильтры</Text>
        <Pressable style={style.headerBtn}>
          <Text
            style={style.filterHeaderBtnTitle}
            onPress={() => {
              partnersStore.clearCheckedCategories();
              partnersStore.getPartnersList();
              setPressed(!pressed);
            }}>
            Очистить
          </Text>
        </Pressable>
      </View>
      <FlatList
        data={filterStore.allCategoriesList}
        renderItem={({item}) => (
          <FilterItem
            title={item.name}
            onpress={() => {
              partnersStore.createCheckedCategories(item.id);
              setPressed(!pressed);
            }}
            checked={filteredArr.includes(item.id) ? true : false}
          />
        )}
        keyExtractor={item => item.id.toString()}
      />
      <View style={style.btn}>
        <MainButton onpress={btnOnPress} title={'Показать'} />
      </View>
    </View>
  );
};

export default observer(FilterBlock);

const styles = (theme: ThemeType | null) =>
  StyleSheet.create({
    filterContainer: {
      width: '100%',
      height: '100%',
      backgroundColor: theme?.colors?.background,
    },
    filterHeader: {
      width: '100%',
      height: 60,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    filterHeaderBtnTitle: {
      fontSize: 18,
      lineHeight: 23,
      fontWeight: '400',
      color: theme?.colors?.background_form,
    },
    filterHeaderTitle: {
      fontSize: 19,
      lineHeight: 24,
      fontWeight: '700',
      color: theme?.colors?.text,
    },
    btn: {
      paddingHorizontal: 20,
      marginVertical: 20,
    },
  });
