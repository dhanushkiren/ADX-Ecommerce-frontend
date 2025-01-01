import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import PaymentPage from "./src/screens/PaymentPage.js";
import ProductPage from "./src/screens/ProductPage";
import EditProfile from "./src/components/EditProfile";
import FAQScreen from "./src/screens/FAQScreen";
import searchlist from "./src/screens/searchlist";
import Home from "./src/screens/Home.js";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="searchlist" component={searchlist} />
        <Stack.Screen name="faq" component={FAQScreen} />
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="payment" component={PaymentPage} />
        <Stack.Screen name="product" component={ProductPage} />
        <Stack.Screen name="profile" component={EditProfile} />
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
