import React, {useEffect, useContext} from 'react';
import {View, Text} from 'react-native';
import {AppContext} from 'context/App';

export const Main = () => {
  const {} = useContext(AppContext);
  useEffect(() => {
    // console.log(userMock);
  }, []);
  return (
    <View>
      <Text>Hello from Main</Text>
    </View>
  );
};
