import React, {useLayoutEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {color, globalStyle} from '../../utility';

const ShowFullImg = ({route, navigation}) => {
  const {params} = route;
  const {name, img, imgText} = params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: <Text>{name}</Text>,
    });
  }, [navigation]);
  return (
    <>
      {img ? (
        <Image
          source={{uri: img}}
          style={[globalStyle.flex1]}
          resizeMode="cover"
        />
      ) : (
        <View style={[globalStyle.flex1, {backgroundColor: color.BLACK}]}>
          <Text style={styles.text}>{imgText}</Text>
        </View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  text: {
    color: color.WHITE,
    fontSize: 200,
    fontWeight: 'bold',
  },
});
export default ShowFullImg;
