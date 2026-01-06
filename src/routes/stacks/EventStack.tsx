import { StyleSheet } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import {Events, Plan } from '@screens';

const Stack = createStackNavigator();

const EventStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="EventsMainScreen" component={Events} />
      {/* <Stack.Screen name="EventsMainScreen" component={Plan} /> */}

     
    </Stack.Navigator>
  )
}

export default EventStack

const styles = StyleSheet.create({})