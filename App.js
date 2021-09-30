import 'react-native-gesture-handler';
import React from 'react';
import NavigationContain from './src/Navigation';
import {StoreProvider} from './src/Context/Store';
import {Loader} from './src/Component';

const App = () => (
  <StoreProvider>
    <NavigationContain />
    <Loader />
  </StoreProvider>
);

export default App;
