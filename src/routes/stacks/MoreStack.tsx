import { StyleSheet } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import {Plan, Profile } from '@screens';

const Stack = createStackNavigator();

const MoreStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ProfileMainScreen" component={Profile} />
     
    </Stack.Navigator>
  )
}

export default MoreStack

const styles = StyleSheet.create({})