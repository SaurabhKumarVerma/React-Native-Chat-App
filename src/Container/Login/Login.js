import React, {useContext, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from 'react-native';
import {color, globalStyle} from '../../utility';
import {InputField, Logo, RoundCornerButton} from '../../Component';
import {Store} from '../../Context/Store';
import {LOADING_START, LOADING_STOP} from '../../Context/Action/Types';
import {LoginRequest} from '../../Network';
import {keys, setAsyncStorage} from '../../AsyncStorage';
import {setUniqueValue, keyboardVerticalOffset} from '../../utility/Constant';

const Login = ({navigation}) => {
  const globalState = useContext(Store);
  const {dispatchLoaderAction} = globalState;

  const [showLogo, toggleLogo] = useState(true);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleChange = (name, value) => {
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const onLoginPress = () => {
    if (!password) {
      alert('Enter Email');
    } else if (!password) {
      alert('Enter Password');
    } else {
      dispatchLoaderAction({
        type: LOADING_START,
      });
      LoginRequest(email, password)
        .then(res => {
          if (!res.additionalUserInfo) {
            dispatchLoaderAction({
              type: LOADING_STOP,
            });
            alert(res);
            return;
          }
          setAsyncStorage(keys.uuid, res.user.uid);
          setUniqueValue(res.user.uid);
          dispatchLoaderAction({
            type: LOADING_STOP,
          });
          navigation.replace('DashBoard');
        })
        .catch(error => {
          dispatchLoaderAction({
            type: LOADING_STOP,
          });
          alert(error);
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
    }, 10);
  };

  const {email, password} = credentials;
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
            <RoundCornerButton title="Login" onPress={onLoginPress} />
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text
                style={{
                  fontSize: 28,
                  fontWeight: 'bold',
                  color: color.LIGHT_GREEN,
                }}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;
