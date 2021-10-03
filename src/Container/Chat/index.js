/* eslint-disable no-alert */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useEffect,
  useLayoutEffect,
  useState,
  useContext,
  Fragment,
  useCallback,
} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from 'react-native';
import {ChatBox, InputField} from '../../Component';
import {launchImageLibrary} from 'react-native-image-picker';
import {color, globalStyle} from '../../utility';
import styles from './styles';
import {Store} from '../../Context/Store';
import {recieverMsg, senderMsg} from '../../Network';
import Icon from 'react-native-vector-icons/FontAwesome';
import Firebase from '../../Firebase';
import {deviceHeight} from '../../utility/StyleHelper/AppStyle';
import {smallDeviceHeight} from '../../utility/Constant';
import GlobalStyle from '../../utility/StyleHelper/GlobalStyle';
// import { requestUserPermission } from '../../Component/PushNotification';

const Chat = ({route, navigation}) => {
  const {params} = route;
  const {name, img, imgText, geustUserId, currentUser} = params;
  const [msgValue, setmsgValue] = useState('');
  const [messages, setmessages] = useState([]);

  const globalState = useContext(Store);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: <Text>{name}</Text>,
    });
  });
  //Storing user data
  useEffect(() => {
    try {
      Firebase.database()
        .ref('messages')
        .child(currentUser)
        .child(geustUserId)
        .on('value', dataSnapshot => {
          let msgs = [];
          dataSnapshot.forEach(child => {
            msgs.push({
              sendBy: child.val().message.sender,
              recievedBy: child.val().message.reciever,
              msg: child.val().message.msg,
              img: child.val().message.img,
            });
          });
          setmessages(msgs.reverse());
        });
    } catch (error) {
      alert(error);
    }
  }, []);

  // useEffect(() => {
  //   PushNotification.configure({
  //     onRegister: function (token) {
  //       console.log('TOKEN:', token);
  //     },
  //     onNotification: function (notification) {
  //       console.log('NOTIFICATION:', notification);
  //       // notification.finish(PushNotificationIOS.FetchResult.NoData);
  //     },

  //     onAction: function (notification) {
  //       console.log('ACTION:', notification.action);
  //       console.log('NOTIFICATION:', notification);
  //     },
  //     onRegistrationError: function (err) {
  //       console.error(err.message, err);
  //     },
  //     permissions: {
  //       alert: true,
  //       badge: true,
  //       sound: true,
  //     },
  //     popInitialNotification: true,
  //     requestPermissions: true,
  //   });
  // }, []);

  // const notification = () => {
  //   PushNotification.localNotification({
  //     title: 'My Notification Title', // (optional)
  //     message: 'My Notification Message', // (required)
  //   });
  // };

  // const showSuccessNotifications = () => {
  //   PushNotification.localNotification({
  //     channelId: 'default',
  //     message: 'New msg recivie',
  //   });
  // };

  const handleSend = () => {
    setmsgValue('');

    if (msgValue) {
      senderMsg(msgValue, currentUser, geustUserId, '')
        .then(() => {
          // showSuccessNotifications();
        })
        .catch(err => alert(err));

      //guest User
      recieverMsg(msgValue, currentUser, geustUserId, '')
        .then(() => {})
        .catch(err => alert(err));
    }
  };

  const handleCamera = () => {
    const option = {
      storageOptions: {
        skipBackup: true,
      },
    };

    launchImageLibrary(option, response => {
      if (response.didCancel) {
        console.log('User cancel image picker');
      } else if (response.error) {
        console.log(' image picker error', response.error);
      } else {
        // Base 64
        let source = response.assets[0].uri;

        senderMsg(msgValue, currentUser, geustUserId, source)
          .then(() => {})
          .catch(err => alert(err));

        // * guest user

        recieverMsg(msgValue, currentUser, geustUserId, source)
          .then(() => {})
          .catch(err => alert(err));
      }
    });
  };

  const imgTap = chatImg => {
    navigation.navigate('ShowFullImg', {name, img: chatImg});
  };

  const handleChange = text => {
    setmsgValue(text);
  };
  const renderItem = useCallback(item => {
    return (
      <ChatBox
        userId={item.item.sendBy}
        msg={item.item.msg}
        img={item.item.img}
        onImgTap={() => imgTap(item.item.img)}
      />
    );
  }, []);
  return (
    <>
      {/* {console.log('MESSSSSSSSSSSSSSAGE', messages)} */}
      <SafeAreaView style={[globalStyle.flex1, {backgroundColor: color.BLACK}]}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={deviceHeight > smallDeviceHeight ? 100 : 70}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={[globalStyle.flex1, {backgroundColor: color.BLACK}]}>
          <TouchableWithoutFeedback
            style={[GlobalStyle.flex1, {backgroundColor: color.BLACK}]}
            onPress={Keyboard.dismiss}>
            <Fragment>
              <FlatList
                inverted={true}
                data={messages}
                keyExtractor={(_, index) => index.toString()}
                renderItem={renderItem}
              />
              {/*Message*/}
              <View style={styles.sendMessageContainer}>
                <InputField
                  placeholder="Type Here"
                  numberOfLines={10}
                  inputStyle={styles.input}
                  value={msgValue}
                  onChangeText={text => handleChange(text)}
                />
                <View style={styles.sendBtnContainer}>
                  <Icon
                    name="camera"
                    color={color.WHITE}
                    size={30}
                    onPress={() => handleCamera()}
                    style={style.iconCamera}
                  />

                  <Icon
                    name="send"
                    color={color.WHITE}
                    size={30}
                    style={style.iconStyle}
                    onPress={() => handleSend()}
                  />
                </View>
              </View>
            </Fragment>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

const style = StyleSheet.create({
  iconStyle: {
    flex: -1,
    marginRight: 12,
    marginVertical: 10,
  },
  iconCamera: {
    alignContent: 'space-between',
    marginHorizontal: 10,
    marginVertical: 10,
  },
});

export default Chat;
