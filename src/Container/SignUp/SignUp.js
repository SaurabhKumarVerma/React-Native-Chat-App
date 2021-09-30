import React, {useState, useContext} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import {color, globalStyle} from '../../utility';
import {InputField, Logo, RoundCornerButton} from '../../Component';
import {Store} from '../../Context/Store';
import {LOADING_START, LOADING_STOP} from '../../Context/Action/Types';
import {AddUser, SignInRequest} from '../../Network';
import firebase from '../../Firebase/index';
import {setAsyncStorage, keys} from '../../AsyncStorage';
import {setUniqueValue, keyboardVerticalOffset} from '../../utility/Constant';

const SignUp = ({navigation}) => {
  const globalState = useContext(Store);
  const {dispatchLoaderAction} = globalState;

  const [credentials, setCredentials] = useState({
    ename: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showLogo, toggleLogo] = useState(true);

  const handleChange = (name, value) => {
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const onSignUpPress = () => {
    if (!name) {
      alert('Enter name');
    } else if (!password) {
      alert('Enter Email');
    } else if (!password) {
      alert('Enter Password');
    } else if (password !== confirmPassword) {
      alert('Password Not match');
    } else {
      dispatchLoaderAction({
        type: LOADING_START,
      });
      SignInRequest(email, password)
        .then(res => {
          if (!res.additionalUserInfo) {
            dispatchLoaderAction({
              type: LOADING_STOP,
            });
            alert(res);
            return;
          }
          let uid = firebase.auth().currentUser.uid;
          let profileImg = '';
          AddUser(name, email, uid, profileImg)
            .then(() => {
              setAsyncStorage(keys.uuid, uid);
              setUniqueValue(uid);
              dispatchLoaderAction({
                type: LOADING_STOP,
              });
              navigation.replace('DashBoard');
            })
            .catch(error => {
              dispatchLoaderAction({
                type: LOADING_STOP,
              });
            });
        })
        .catch(error => {
          dispatchLoaderAction({
            type: LOADING_STOP,
          });
          console.log('error', error);
        });
    }
  };

  const handleFocus = () => {
    setTimeout(() => {
      toggleLogo(false);
    }, 200);
  };

  const handleBlur = () => {
    setTimeout(() => {
      toggleLogo(false);
    }, 200);
  };
  const {name, email, password, confirmPassword} = credentials;
  return (
    <KeyboardAvoidingView
      style={[globalStyle.flex1, {backgroundColor: color.BLACK}]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={keyboardVerticalOffset}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView
          style={[globalStyle.flex1, {backgroundColor: color.BLACK}]}>
          {showLogo && (
            <View style={[globalStyle.containerCentered]}>
              <Logo />
            </View>
          )}
          <View style={[globalStyle.flex2, globalStyle.sectionCentered]}>
            <InputField
              placeholder="Enter Name"
              value={name}
              onChangeText={text => handleChange('name', text)}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <InputField
              placeholder="Enter Email"
              value={email}
              onChangeText={text => handleChange('email', text)}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <InputField
              placeholder="Password"
              secureTextEntry={true}
              value={password}
              onChangeText={text => handleChange('password', text)}
              pattern={[
                '^.{8,}$', // min 8 chars
                '(?=.*\\d)', // number required
                '(?=.*[A-Z])', // uppercase letter
              ]}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <InputField
              placeholder="confirmPassword"
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={text => handleChange('confirmPassword', text)}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <RoundCornerButton title="SignUp" onPress={onSignUpPress} />
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text
                style={{
                  fontSize: 28,
                  fontWeight: 'bold',
                  color: color.LIGHT_GREEN,
                }}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
