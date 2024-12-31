import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import searchlist from './src/screens/searchlist';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="searchlist" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="searchlist" component={searchlist} />
       
       </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;