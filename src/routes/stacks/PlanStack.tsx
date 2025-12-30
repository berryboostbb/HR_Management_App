import { StyleSheet } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import {Events } from '@screens';

const Stack = createStackNavigator();

const EventStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="EventsMainScreen" component={Events} />
     
    </Stack.Navigator>
  )
}

export default EventStack

const styles = StyleSheet.create({})