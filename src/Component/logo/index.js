import React from 'react';
import {Text, View} from 'react-native';
import style from './style';
export default ({logoStyle, logoTextStyle}) => (
  <View style={[style.logo, logoStyle]}>
    <Text style={[style.text, logoTextStyle]}>S</Text>
  </View>
);
