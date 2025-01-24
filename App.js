import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EditProfile from "./src/components/EditProfile";
import ConfirmOrder from "./src/screens/orders/ConfirmOrder";
import Placeorder from "./src/screens/orders/Placeorder";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import PaymentPage from "./src/screens/PaymentPage.js";
import ProductPage from "./src/screens/ProductPage";
import Orderscreencomponent from "./src/screens/orders/Orderscreencomponent";
import Orderhistorycomponent from "./src/screens/orders/Orderhistorycomponent";
import { StyleSheet, Image } from "react-native";
import {
  Provider as ReduxStoreProvider,
  useDispatch,
  useSelector,
} from "react-redux";
import { store } from "./src/redux/store";
import FAQScreen from "./src/screens/FAQScreen";
import ProductScreen from "./src/screens/searchlist.js";
import Home from "./src/screens/Home.js";
import SplashScreen from "./src/screens/SplashScreen.js";
import SearchBar from "./src/components/SearchBar.js";
import CartScreen from "./src/screens/CartScreen";
import { loginSuccess } from "./src/redux/auth/authSlice.js";
import { clearAsyncStorage, retrieveData } from "./src/utils/asyncStorage.js";
import MenuBar from "./src/components/MenuBar.js";
import SearchResults from "./src/screens/SearchResults.js";
import UserDashboard from "./src/screens/UserDashboard";
import ChatBot from "./src/screens/ChatBot.js";

const Stack = createNativeStackNavigator();


function MyStack() {
  const [loading, setLoading] = useState(true); // Add loading state
  const dispatch = useDispatch(); // Dispatch action
  const token = useSelector((state) => state.auth.token); // Select token from Redux state
  const homeLoading = useSelector((state) => state.home.loading); // Get loading status for home
  const products = useSelector((state) => state.home.products); // Get products from home state
  const homeError = useSelector((state) => state.home.error); // Get error state for home

  console.log("dk token :::", token);

  useEffect(() => {
    // clearAsyncStorage();
    const checkAuth = async () => {
      const storedToken = await retrieveData("token");
      console.log("Stored token::", storedToken);
      if (storedToken) {
        dispatch(loginSuccess({ token: storedToken }));
      }
      setLoading(false); // Mark loading as complete
    };

    checkAuth();
  }, [dispatch]);


  // useEffect(() => {
  //   // Fetch home products once user is logged in
  //   if (token) {
  //     dispatch(homeRequest(token)); // Pass token to fetch products
  //   }
  // }, [dispatch, token]);

  if (loading) {
    // Show a splash screen or placeholder while checking token or fetching products
    return <SplashScreen />;
  }

  return (
    
      <Stack.Navigator
        // initialRouteName={token ? "home" : "login"}
        initialRouteName="menu"
        screenOptions={{ headerShown: false }}
      >
        {/* Define your screens */}
        <Stack.Screen name="menu" component={MenuBar} />
        <Stack.Screen name="searchlist" component={ProductScreen} />
        <Stack.Screen name="splash" component={SplashScreen} />
        <Stack.Screen name="faq" component={FAQScreen} />
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="payment" component={PaymentPage} />
        <Stack.Screen name="product" component={ProductPage} />
        <Stack.Screen name="profile" component={EditProfile} />
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="register" component={RegisterScreen} />
        <Stack.Screen name="search" component={SearchBar} />
        <Stack.Screen name="cart" component={CartScreen} />
        <Stack.Screen name="Confirm Order" component={ConfirmOrder} />
        <Stack.Screen name="Order Checkout" component={Placeorder} />
        <Stack.Screen name="Orders" component={Orderscreencomponent} />
        <Stack.Screen name="history" component={Orderhistorycomponent} />
        <Stack.Screen name="SearchResults" component={SearchResults} />
        <Stack.Screen name="UserDashboard" component={UserDashboard} />
        <Stack.Screen name="ChatBot" component={ChatBot} />
      </Stack.Navigator>
    
  );
}

export default function App() {
  return (
    <ReduxStoreProvider store={store}>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </ReduxStoreProvider>
  );
}

