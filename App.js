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
import SearchList from "./src/screens/searchlist";
import MenuBar from "./src/components/MenuBar"; // Import MenuBar for tab navigation

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ReduxStoreProvider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="MainTabs"
          screenOptions={{ headerShown: false }}
        >
          {/* Main Tabs */}
          <Stack.Screen name="MainTabs" component={MenuBar} />

          {/* Other screens */}
          <Stack.Screen name="SearchList" component={SearchList} />
          <Stack.Screen name="FAQ" component={FAQScreen} />
          <Stack.Screen name="Payment" component={PaymentPage} />
          <Stack.Screen name="Product" component={ProductPage} />
          <Stack.Screen name="Profile" component={EditProfile} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ReduxStoreProvider>
  );
}
