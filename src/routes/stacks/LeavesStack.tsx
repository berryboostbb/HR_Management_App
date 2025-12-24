import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Leaves } from '@screens';

const Stack = createStackNavigator();

const LeavesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="LeavesMainScreen" component={Leaves} />
     
    </Stack.Navigator>
  )
}

export default LeavesStack

const styles = StyleSheet.create({})