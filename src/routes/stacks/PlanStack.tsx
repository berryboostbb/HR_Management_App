import { StyleSheet } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import {Plan } from '@screens';

const Stack = createStackNavigator();

const PlanStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="PlanMainScreen" component={Plan} />
     
    </Stack.Navigator>
  )
}

export default PlanStack

const styles = StyleSheet.create({})