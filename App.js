import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Orderscreencomponent from './src/components/Orderscreencomponent';
import Orderhistorycomponent from './src/components/Orderhistorycomponent';
import SearchBar from './src/components/SearchBar';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native';



const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Orders">
      <Stack.Screen name="Orders" component={Orderscreencomponent}
       options={{
        headerTitle: () => <SearchBar />, // Adding Search Bar in header
        headerStyle: {
          backgroundColor: '#6200EE', // Header background color
        },
        headerRight: () => (
          <Image source={require('./assets/filter.png')} style={styles.filterIcon} resizeMode="center" />
        ),
      }} />
      <Stack.Screen name="history" component={Orderhistorycomponent} 
        options={{
            headerTitle: () => <SearchBar />, // Adding Search Bar in header
            headerStyle: {
              backgroundColor: '#6200EE', // Header background color
            },
            headerRight: () => (
              <Image source={require('./assets/filter.png')} style={styles.filterIcon} resizeMode="center" />
            ),
          }} />
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
  filterIcon: {
    marginRight: 10,
    width: 18,
    height: 18, // Space between icon and input
  },
});

export default App;
