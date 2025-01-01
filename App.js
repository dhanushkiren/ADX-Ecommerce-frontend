import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./src/Navigation/TabNavigator.js"; // Import TabNavigator
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import PaymentPage from "./src/screens/PaymentPage.js";
import ProductPage from "./src/screens/ProductPage";
import EditProfile  from "./src/components/EditProfile";
import FAQScreen from './src/screens/FAQScreen'; 
import searchlist from './src/screens/searchlist';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName="searchlist" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="searchlist" component={searchlist} />
        <Stack.Screen name="FAQ" component={FAQScreen} />
        <Stack.Screen name="TabHome" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Payment" component={PaymentPage} />
        <Stack.Screen name="Product" component={ProductPage} />
        <Stack.Screen name="Profile" component={EditProfile} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        {/* <Stack.Screen name="Home" component={HomeScreen} /> */}

      </Stack.Navigator>
    </NavigationContainer>
  );
};


