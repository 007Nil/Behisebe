import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import App from '../../App';
import QrCodeScanner from '../screens/QrCodeScanner';
// import PayNow from '../screens/PayNow';
// import UPIPass from '../screens/UPIPass';

const stack = createStackNavigator();
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen
          name="App"
          component={App}
          options={{headerShown: true}}
        />
         <stack.Screen
          name="QrCodeScanner"
          component={QrCodeScanner}
          options={{headerShown: false}}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;