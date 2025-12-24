import { StyleSheet } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import {Events, More, Payroll, Plan, Profile } from '@screens';

const Stack = createStackNavigator();

const MoreStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="MoreMainScreen" component={More} />

      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Payroll" component={Payroll} />
      <Stack.Screen name="Events" component={Events} />


     
    </Stack.Navigator>
  )
}

export default MoreStack

const styles = StyleSheet.create({})