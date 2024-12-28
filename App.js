import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Orderscreencomponent from './src/components/Orderscreencomponent';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native';



const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Orders" component={Orderscreencomponent} />
      </Stack.Navigator>
    </NavigationContainer>
   
  
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1, // Occupies the entire screen
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    backgroundColor: '#ffffff', // Set a visible background color
  },
  text: {
    fontSize: 24,
    color: '#333',
  },
});

export default App;
