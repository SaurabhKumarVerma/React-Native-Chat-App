import React from 'react';
import {Image, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './style';
import {globalStyle, color} from '../../utility';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default ({img, name, onImgTap, onEditImgTap}) => (
  <View style={[globalStyle.sectionCentered, styles.container]}>
    <View style={styles.imgContainer}>
      <TouchableOpacity onPress={onImgTap} activeOpacity={0.8}>
        {img ? (
          <Image source={{uri: img}} style={styles.img} resizeMode="cover" />
        ) : (
          <View
            style={[
              globalStyle.sectionCentered,
              styles.img,
              {backgroundColor: color.DARK_GRAY},
            ]}>
            <Text style={styles.name}>{name.charAt(0)}</Text>
          </View>
        )}
      </TouchableOpacity>
      <View style={[globalStyle.sectionCentered, styles.editImgContainer]}>
        <Icon
          name="add-a-photo"
          size={20}
          onPress={onEditImgTap}
          color={color.WHITE}
        />
      </View>
    </View>
    <Text style={styles.welcome}>{name}</Text>
  </View>
);
