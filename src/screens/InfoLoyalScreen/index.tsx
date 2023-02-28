import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';

import {ThemeType} from 'context/types';
import useTheme from 'hooks/useTheme';
import useThemeStyles from 'hooks/useThemeStyles';
import {observer} from 'mobx-react';
import {HomeNavigatorParamsList} from 'nav/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export interface NavScreenProps {
    navigation: NativeStackNavigationProp<HomeNavigatorParamsList, 'InfoLoyal'>;
}

const InfoLoyalScreen: React.FC<NavScreenProps> = ({navigation}) => {
    const theme = useTheme();
    const style = useThemeStyles(styles);
    return (
        <ScrollView>
            <View style={style.container}>
                <Text style={style.subtitle}>Правила пользования картой лояльности MOMMYS</Text>
                <Text style={style.baseText}>
                    Карта с логотипом MOMMYS предоставляет ее владельцу право на получение скидок или льгот у компаний-партнеров Программы лояльности MOMMYS при условии соблюдения следующих правил:{"\n"}
                    Перед использованием карты убедитесь, что на карте присутствует логотип MOMMYS
                    Размер и условия предоставления скидок смотрите на сайте www.mommys.ru в разделе о партнерах.{"\n"}
                    При покупке товаров (услуг) у компаний-партнеров Программы лояльности MOMMYS предъявляйте карту продавцу до пробития кассового чека (до подсчета стоимости покупки, до подписания договора).{"\n"}
                    Скидка на цены во время распродаж и акций, а также на покупки в кредит предоставляется на усмотрение компании.{"\n"}
                    Компания-партнер Программы лояльности MOMMYS имеет право установить перечень товаров (услуг), на которые скидка по карте лояльности MOMMYS распространяться не будет.
                    Обращаем внимание, что сообщество MOMMYS не несет ответственности за возможные изменения, произошедшие со времени выпуска карт лояльности, касающиеся условий предоставления скидок и их размеров, форс-мажорные обстоятельства, ликвидацию и перемену собственности компании.{"\n"}
                    Карта не является платежным средством.{"\n"}
                    Каждая карта привязана к ее покупателю, при возникновении у компании-партнера сомнений в истинности ее владельца, партнер может проверить ФИО держателя по базе владельцев карт MOMMYS.{"\n"}
                    Карта MOMMYS не может передаваться другим лицам с целью получения по ней скидок и льгот. В случае нарушения этого правила карта может быть аннулирована.
                    {"\n"}{"\n"}
                    Наличие номера карты или фамилии ее держателя НЕ являются основаниями для предоставления скидки. Скидка предоставляется только при предъявлении карты ее владельцем. {"\n"}
                </Text>
            </View>
        </ScrollView>
    );
};

export default observer(InfoLoyalScreen);

const styles = (theme: ThemeType | null) =>
    StyleSheet.create({
        container: {
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            paddingHorizontal: 20,
            color: "red"
        },
        subtitle: {
            paddingBottom: 20,
            paddingTop: 10,
            fontSize: 18,
            fontWeight:"bold",
            fontFamily: 'PTRootUI-Regular',
            color: theme?.colors?.text,

        },
        baseText: {
            fontFamily: 'PTRootUI-Regular',
            color: theme?.colors?.text,
            lineHeight: 22,
            fontSize: 15
        }

    });
