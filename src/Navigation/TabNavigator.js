import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from '../screens/Home';
import { View } from 'react-native'; // Placeholder for other tabs

const Tab = createBottomTabNavigator();

// Placeholder Component to display the plain colour screen for each an every tabs used as the icons in our Home Page
const PlaceholderScreen = () => {
  return <View style={{ flex: 1, backgroundColor: '#8D67F1' }} />;
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: '#8D67F1',
          paddingBottom: 5,
          height: 60,
        },
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#dcdcdc',
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Profile') {
            iconName = 'account';
          } else if (route.name === 'Cart') {
            iconName = 'cart';
          } else if (route.name === 'Wallet') {
            iconName = 'wallet';
          } else if (route.name === 'Menu') {
            iconName = 'menu';
          }

          return <MaterialCommunityIcons name={iconName} color={color} size={size} />;
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={PlaceholderScreen} 
        options={{
          tabBarLabel: 'Profile',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={PlaceholderScreen} 
        options={{
          tabBarLabel: 'Cart',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Wallet"
        component={PlaceholderScreen} 
        options={{
          tabBarLabel: 'Wallet',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Menu"
        component={PlaceholderScreen} 
        options={{
          tabBarLabel: 'Menu',
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
