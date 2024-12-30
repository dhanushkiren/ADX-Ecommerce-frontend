import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PaymentPage from "./PaymentPage.js";
import ProductPage from "./src/screens/ProductPage";
import EditProfile  from "./src/components/EditProfile";



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Payment">
        <Stack.Screen name="Payment" component={PaymentPage} />
        <Stack.Screen name="Product" component={ProductPage} />
        <Stack.Screen name="Profile" component={EditProfile} />
        {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

