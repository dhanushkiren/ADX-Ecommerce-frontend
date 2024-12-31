import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import PaymentPage from "./src/screens/PaymentPage.js";
import ProductPage from "./src/screens/ProductPage";
import EditProfile from "./src/components/EditProfile";
import { Provider as ReduxStoreProvider } from "react-redux";
import store from "./src/redux/store";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ReduxStoreProvider  store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Payment" component={PaymentPage} />
          <Stack.Screen name="Product" component={ProductPage} />
          <Stack.Screen name="Profile" component={EditProfile} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </ReduxStoreProvider>
  );
}
