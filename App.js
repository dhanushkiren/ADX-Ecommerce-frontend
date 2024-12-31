import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import FAQScreen from './src/screens/FAQScreen'; 

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FAQ" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="FAQ" component={FAQScreen} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;