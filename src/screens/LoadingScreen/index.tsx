import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {ThemeType} from 'context/types';
import useTheme from 'hooks/useTheme';
import useThemeStyles from 'hooks/useThemeStyles';
import {observer} from 'mobx-react';
import {AppContext} from 'context/App';

const LoadingScreen = () => {
  const theme = useTheme();
  const style = useThemeStyles(styles);
  const {
    stores: {partnersStore, filterStore},
  } = useContext(AppContext);

  useEffect(() => {
    partnersStore.getPartnersList();
    filterStore.getAllCategoriesList();
  }, []);

  return (
    <View style={style.container}>
      <ActivityIndicator
        color={theme?.colors?.background_form}
        size={'large'}
      />
    </View>
  );
};

export default observer(LoadingScreen);

const styles = (theme: ThemeType | null) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme?.colors?.background,
    },
  });
