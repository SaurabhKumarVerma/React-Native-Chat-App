import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {Logo} from '../../Component';
import {color, globalStyle} from '../../utility';
import {getAsyncStorage, keys} from '../../AsyncStorage';
import {setUniqueValue} from '../../utility/Constant';

const Splash = ({navigation}) => {
  useEffect(() => {
    const redirect = setTimeout(() => {
      getAsyncStorage(keys.uuid)
        .then(uuid => {
          if (uuid) {
            setUniqueValue(uuid);
            navigation.replace('DashBoard');
          } else {
            navigation.replace('Login');
          }
        })
        .catch(error => {
          console.log('Error', error);
          navigation.replace('Login');
        });
    }, 3000);
    return () => clearTimeout(redirect);
  }, [navigation]);
  return (
    <View
      style={[globalStyle.containerCentered, {backgroundColor: color.BLACK}]}>
      <Logo />
    </View>
  );
};

export default Splash;
