import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EditProfile from "./src/components/EditProfile";
import { useState, useEffect } from 'react'; 
import OrderSplashscreen from './src/screens/OrderSplashscreen'; 
const Stack = createNativeStackNavigator();

export default function App() {
  const [isShowSplash, setIsShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer); 
  }, []); 

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Profile">
        <Stack.Screen name="Profile" component={EditProfile} />
        <Stack.Screen name="OrderSplash" component={OrderSplashscreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
