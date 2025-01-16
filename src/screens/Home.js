import React from "react";
import SearchIcon from "../../assets/search.svg";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { logout } from "../redux/auth/authSlice";
import { clearAsyncStorage } from "../utils/asyncStorage";
import { useDispatch } from "react-redux";
import { categories, products } from "../utils/data";

const Home = ({ navigation }) => {
  const dispatch = useDispatch();

  const goToProductPage = (category) => {
    navigation.navigate("Product", { category });
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          onPress: () => {
            // Clear token from local storage
            clearAsyncStorage();

            // Dispatch Redux action to reset auth state
            dispatch(logout());

            // Navigate to login screen
            navigation.replace("login");
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.searchContainer}>
            <Image source={SearchIcon} style={styles.searchIcon} />
            <TextInput
              style={styles.searchBar}
              placeholder="Search Tradezy.in"
              placeholderTextColor="#aaa"
            />
          </View>
          <TouchableOpacity onPress={handleLogout}>
            <Icon
              name="notifications"
              size={24}
              color="#fff"
              style={styles.filterIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Location */}
        <View style={styles.location}>
          <Icon
            name="location-on"
            size={24}
            color="#007ACC"
            style={styles.icon}
          />
          <Text style={styles.locationText}>
            Deliver to JK - Thoothukudi 628004
          </Text>
        </View>
        
        {/* Horizontal Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}
        >
          {categories.map((category, index) => (
            <View key={index} style={styles.category}>
              <Image
                source={{ uri: category.image }}
                style={styles.categoryImage}
              />
              <Text>{category.name}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Promo Section */}
        <View style={styles.promo}>
          <Image
            source={require("../../assets/Banner.svg")}
            style={styles.promoImage}
          />
        </View>

        {/* Vertical Products Section */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.productsScroll}
        >
          <Text style={styles.sectionTitle}>Deals for you</Text>
          <View style={styles.products}>
            {products.map((product, index) => (
              <View key={index} style={styles.product}>
                <Image
                  source={{ uri: product.image }}
                  style={styles.productImage}
                />
                <Text>{product.name}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingTop: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#7041EE",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  searchBar: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 5,
    marginRight: 10,
  },
  iconGroup: {
    flexDirection: "row",
  },
  icon: {
    fontSize: 18,
    color: "#fff",
    marginLeft: 3,
  },
  location: {
    padding: 15,
    backgroundColor: "#8D67F1",
    fontSize: 14,
    paddingBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  categoriesScroll: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  category: {
    alignItems: "center",
    marginRight: 20,
  },
  categoryImage: {
    width: 100,
    height: 95,
    borderRadius: 5,
  },
  promo: {
    alignItems: "center",
    marginVertical: 10,
  },
  promoImage: {
    width: "95%",
    height: 150,
    borderRadius: 10,
  },
  productsScroll: {
    flex: 1,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
  products: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  product: {
    width: "48%",
    marginBottom: 15,
    alignItems: "center",
  },
  productImage: {
    width: 170,
    height: 150,
    borderRadius: 10,
  },
  filterIcon: {
    marginLeft: 10,
    alignSelf: "center",
  },
  locationText: {
    fontSize: 14,
    color: "#fff",
    marginLeft: 10,
  },
});

export default Home;
