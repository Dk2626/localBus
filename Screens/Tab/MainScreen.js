import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from '../Stack/SearchScreen';
import ResultScreen from '../Stack/ResultScreen';

const Stack = createStackNavigator();

const MainScreen = () => {
  return (
    <Stack.Navigator
      initialRouteName='SearchScreen'
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name='SearchScreen' component={SearchScreen} />
      <Stack.Screen name='ResultScreen' component={ResultScreen} />
    </Stack.Navigator>
  );
};

export default MainScreen;

const styles = StyleSheet.create({});
