import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import NavigationContain from './src/Navigation';
import {StoreProvider} from './src/Context/Store';
import {Loader} from './src/Component';
// import {pushN} from './src/Component/PushNotification';
// import {
//   requestUserPermission,
//   notificationListner,
// } from './src/Component/PushNotification';
// const a = pushN();
const App = () => {
  useEffect(() => {
    // requestUserPermission();
    // notificationListner();
    // pushN();
  }, []);

  return (
    <StoreProvider>
      <NavigationContain />
      <Loader />
    </StoreProvider>
  );
};

export default App;
