import React, {useLayoutEffect} from 'react';
import {View, Text, Alert, SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {LogOut} from '../../Network';
import {color} from '../../utility';
import {clearAsyncStorage} from '../../AsyncStorage';

const DashBoard = ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon
          name="log-out"
          size={26}
          color={color.WHITE}
          style={{right: 19}}
          onPress={() =>
            Alert.alert(
              'Logout',
              'Are You Sure to Log Out',
              [
                {
                  text: 'Yes',
                  onPress: () => {
                    logout();
                  },
                },
                {
                  text: 'No',
                },
              ],
              {
                cancelable: false,
              },
            )
          }
        />
      ),
    });
  }, []);

  const logout = () => {
    LogOut()
      .then(() => {
        clearAsyncStorage()
          .then(() => {
            navigation.replace('Login');
          })
          .catch(error => alert(error));
      })
      .catch(error => alert(error));
  };
  return (
    <SafeAreaView>
      <View>
        <Text>DashBoard</Text>
      </View>
    </SafeAreaView>
  );
};
export default DashBoard;
