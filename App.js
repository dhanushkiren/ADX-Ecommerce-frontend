import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductPage from "./ProductPage";
import EditProfile  from "./src/components/EditProfile";
import ConfirmOrder from "./src/screens/orders/ConfirmOrder";
import Placeorder from "./src/screens/orders/Placeorder";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName="Product Page" >
      <Stack.Screen name="Product Page" component={ProductPage} options={{
              headerShown: false,
      }} />


      <Stack.Screen name="Order Checkout" component={Placeorder}  options={{
          headerTitleStyle: {
            alignSelf: "center",
            fontSize: 18,
            fontWeight: "bold",
            color: "#FFF",
          },
          headerStyle: {
            backgroundColor: "#6200EE",
          }}}/>
        
        <Stack.Screen name="Confirm Order" component={ConfirmOrder}
        options={{
          headerTitleStyle: {
            alignSelf: "center",
            fontSize: 18,
            fontWeight: "bold",
            color: "#FFF",
          },
          headerStyle: {
            backgroundColor: "#6200EE",
          },
        }} />
        <Stack.Screen name="Profile" component={EditProfile} />
        {/* <Stack.Screen name="Home" component={HomeScreen} /> */}

      </Stack.Navigator>
    </NavigationContainer>
  );
}