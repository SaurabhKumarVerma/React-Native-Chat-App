/* eslint-disable no-shadow */
/* eslint-disable no-alert */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useLayoutEffect, useContext, useState} from 'react';
import {Alert, SafeAreaView, FlatList, View} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {launchImageLibrary} from 'react-native-image-picker';
import {LogOut, Updateuser} from '../../Network';
import {color, globalStyle} from '../../utility';
import {clearAsyncStorage} from '../../AsyncStorage';
import {Store} from '../../Context/Store';
import {LOADING_START, LOADING_STOP} from '../../Context/Action/Types';
import firebase from '../../Firebase';
import {smallDeviceHeight, uuid} from '../../utility/Constant';
import {Profile, ShowUser} from '../../Component';
import {deviceHeight} from '../../utility/StyleHelper/AppStyle';
import StickyHeader from '../../Component/StickyHeader';

const DashBoard = ({navigation}) => {
  const globalState = useContext(Store);
  const {dispatchLoaderAction} = globalState;

  const [userDetail, setUserDetail] = useState({
    id: '',
    name: '',
    profileImg: '',
  });
  const [allUsers, setAllUsers] = useState([]);
  const [getScrollPosition, setScrollPosition] = useState(0);

  const {name, profileImg} = userDetail;
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

  useEffect(() => {
    dispatchLoaderAction({
      type: LOADING_START,
    });

    try {
      firebase
        .database()
        .ref('users')
        .on('value', dataSnapShot => {
          let users = [];
          let currentUser = {
            id: '',
            name: '',
            profileImg: '',
          };
          dataSnapShot.forEach(child => {
            if (uuid === child.val().uuid) {
              currentUser.id = uuid;
              currentUser.name = child.val().name;
              currentUser.profileImg = child.val().profileImg;
            } else {
              users.push({
                id: child.val().uuid,
                name: child.val().name,
                profileImg: child.val().profileImg,
              });
            }
          });
          setUserDetail(currentUser);
          console.log('SetUSERDETAIL', userDetail);
          setAllUsers(users);
          console.log('setAllUsers', allUsers);
          dispatchLoaderAction({
            type: LOADING_STOP,
          });
        });
    } catch (error) {
      alert(error);
      dispatchLoaderAction({
        type: LOADING_STOP,
      });
    }
  }, []);

  const selectPic = () => {
    const option = {
      maxWidth: 400,
      maxHeight: 400,
      // includeBase64: true,
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(option, response => {
      console.log('response', response);
      if (response.didCancel) {
        console.log('User cancel');
      } else if (response.error) {
        console.log('Picker Not Responding', response.error);
      } else {
        let source = response.assets[0].uri;
        console.error('Source', source);
        dispatchLoaderAction({
          type: LOADING_START,
        });
        console.log(uuid);
        Updateuser(uuid, source)
          .then(() => {
            setUserDetail({
              ...userDetail,
              profileImg: source,
            });
          })
          .catch(error => {
            dispatchLoaderAction({
              type: LOADING_STOP,
            });
            alert(error);
          });
        console.log(userDetail);
      }
    });
  };

  const imgTap = (profileImg, name) => {
    if (!profileImg) {
      navigation.navigate('ShowFullImg', {
        name,
        imgText: name.charAt(0),
      });
    } else {
      navigation.navigate('ShowFullImg', {
        name,
        img: profileImg,
      });
    }
  };
  // Sticky Header
  const getOpacity = () => {
    if (deviceHeight < smallDeviceHeight) {
      return deviceHeight / 4;
    } else {
      return deviceHeight / 6;
    }
  };
  //chat
  const nameTap = (profileImg, name, geustUserId) => {
    if (!profileImg) {
      navigation.navigate('Chat', {
        name,
        geustUserId,
        imgText: name.charAt(0),
        currentUser: uuid,
      });
    } else {
      navigation.navigate('Chat', {
        name,
        geustUserId,
        img: profileImg,
        currentUser: uuid,
      });
    }
  };
  return (
    <SafeAreaView style={[globalStyle.flex1, {backgroundColor: color.WHITE}]}>
      {getScrollPosition > getOpacity() && (
        <StickyHeader
          name={name}
          img={profileImg}
          onImgTap={(_, index) => index.toString()}
        />
      )}
      <FlatList
        alwaysBounceVertical={false}
        data={allUsers}
        onScroll={event => setScrollPosition(event.nativeEvent.contentOffset.y)}
        keyExtractor={(_, index) => index.toString()}
        ListHeaderComponent={
          <View
            style={{
              opacity:
                getScrollPosition < getOpacity()
                  ? (getOpacity() - getScrollPosition) / 10
                  : 0,
            }}>
            <Profile
              img={profileImg}
              name={name}
              onEditImgTap={selectPic}
              onImgTap={() => imgTap(profileImg, name)}
            />
          </View>
        }
        renderItem={({item}) => (
          <ShowUser
            name={item.name}
            img={item.profileImg}
            onImgTap={() => imgTap(item.profileImg, item.name)}
            onNameTap={() => nameTap(item.profileImg, item.name, item.id)}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default DashBoard;
