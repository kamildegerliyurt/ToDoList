import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import HomePage from './screens/HomePage'

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();



const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName='HomePage'
      screenOptions={{headerShown: false}}>
        <Stack.Screen name="HomePage" component={HomePage} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})