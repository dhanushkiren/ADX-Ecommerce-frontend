import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from './src/screens/Home';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
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
            } else if (route.name === 'Orders') {
              iconName = 'clipboard-text';
            }

            return <MaterialCommunityIcons name={iconName} color={color} size={size} />;
          },
          tabBarLabelStyle: {
            fontSize: 12, // Adjust font size for tab labels
            fontWeight: '600', // Make text slightly bold
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
        component={() => <Home screenName="Profile" />}
        options={{
          tabBarLabel: 'Profile',
          headerShown: false,
        }}
        />
        <Tab.Screen
        name='Cart'
        component={() => <Home screenName="Cart" />}
        options={{
          tabBarLabel: 'Cart',
          headerShown: false,
        }}
        />
        <Tab.Screen
        name='Wallet'
        component={() => <Home screenName="Wallet" />}
        options={{
          tabBarLabel: 'Wallet',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons 
              name="wallet" 
              size={size} 
              color={color} 
            />
          ),
        }}
      />
      <Tab.Screen
        name='Menu'
        component={() => <Home screenName="Menu" />}
        options={{
          tabBarLabel: 'Menu',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons 
              name="menu" 
              size={size} 
              color={color} 
            />
          ),
        }}
      />
    

        {/* Add other screens like Profile, Cart, Orders here */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
