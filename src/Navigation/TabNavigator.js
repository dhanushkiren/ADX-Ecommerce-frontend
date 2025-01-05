// src/navigation/TabNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MenuBar from './src/components/MenuBar'; // Adjust the path based on your project structure

const TabNavigator = () => {
  return (
    <NavigationContainer>
      <MenuBar />
    </NavigationContainer>
  );
};

export default TabNavigator;
