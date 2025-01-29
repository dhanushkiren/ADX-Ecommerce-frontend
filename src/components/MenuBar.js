import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { View, StyleSheet } from "react-native";
import Home from "../screens/Home";
import EditProfile from "./EditProfile";
import CartPage from "../screens/CartScreen";
import MenuOptions from "../screens/MenuOptions";
import ProductScreen from "../screens/searchlist";
import SearchBar from "../components/SearchBar";

const Tab = createBottomTabNavigator();

const MenuBar = () => {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: styles.tabBarStyle,
          tabBarActiveTintColor: "#ffffff",
          tabBarInactiveTintColor: "#dcdcdc",
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Profile") {
              iconName = "account";
            } else if (route.name === "Cart") {
              iconName = "cart";
            } else if (route.name === "product") {
              iconName = "wallet";
            } else if (route.name === "Menu") {
              iconName = "menu";
            }

            return <MaterialCommunityIcons name={iconName} color={color} size={size} />;
          },
          tabBarLabelStyle: styles.tabBarLabelStyle,
        })}
      >
        <Tab.Screen
          name="Home"
          options={{ tabBarLabel: "Home", headerShown: false }}
        >
          {props => (
            <>
              <SearchBar routeName={props.route.name} />
              <Home {...props} />
            </>
          )}
        </Tab.Screen>
        <Tab.Screen
          name="Profile"
          options={{ tabBarLabel: "Profile", headerShown: false }}
           initialParams={{ userId: 1 }}
        >
          {props => (
            <>
              <SearchBar routeName={props.route.name} />
              <EditProfile {...props} />
            </>
          )}
        </Tab.Screen>
        <Tab.Screen
          name="Cart"
          component={CartPage}
          options={{ tabBarLabel: "Cart", headerShown: false }}
        />
        <Tab.Screen
          name="product"
          options={{ tabBarLabel: "product", headerShown: false }}
        >
          {props => (
            <>
              <SearchBar routeName={props.route.name} />
              <ProductScreen {...props} />
            </>
          )}
        </Tab.Screen>
        <Tab.Screen
          name="Menu"
          options={{ tabBarLabel: "Menu", headerShown: false }}
        >
          {props => (
            <>
              <SearchBar routeName={props.route.name} />
              <MenuOptions {...props} />
            </>
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBarStyle: {
    backgroundColor: "#8D67F1",
    paddingBottom: 5,
    height: 60,
  },
  tabBarLabelStyle: {
    fontSize: 12,
    fontWeight: "600",
  },
});

export default MenuBar;
