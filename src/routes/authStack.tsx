import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { SignIn } from '@screens';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SignIn" component={SignIn} />
     
    </Stack.Navigator>
  );
};
export default AuthStack;
