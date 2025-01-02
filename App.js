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
import FAQScreen from "./src/screens/FAQScreen";
import searchlist from "./src/screens/searchlist";
import Home from "./src/screens/Home.js";
import SplashScreen from "./src/screens/SplashScreen.js";
import SearchBar from "./src/components/SearchBar.js";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // <ReduxStoreProvider store={store}>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="search"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="searchlist" component={searchlist} />
        <Stack.Screen name="splash" component={SplashScreen} />
        <Stack.Screen name="faq" component={FAQScreen} />
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="payment" component={PaymentPage} />
        <Stack.Screen name="product" component={ProductPage} />
        <Stack.Screen name="profile" component={EditProfile} />
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="register" component={RegisterScreen} />
        <Stack.Screen name="search" component={SearchBar} />
      </Stack.Navigator>
    </NavigationContainer>
    // </ReduxStoreProvider>
  );
}
