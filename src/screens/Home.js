import React, { useEffect } from "react";
import SearchIcon from "../../assets/search.png";
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
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsRequest } from `"../redux/home/homeSlice"`; // Import the action
import { logout } from "../redux/auth/authSlice";
import { clearAsyncStorage } from "../utils/asyncStorage";
import { categories, products } from "../utils/data";


const Home = ({ navigation }) => {
  const dispatch = useDispatch();

  // Select the products, loading, and error from the Redux store
  const { products, loading, error } = useSelector((state) => state.home);

  useEffect(() => {
    // Dispatch action to fetch products when the component mounts
    dispatch(fetchProductsRequest());
  }, [dispatch]);

  const goToProductPage = (product) => {
    navigation.navigate("Product", { product });
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

  const categories = [
    { name: "Mobiles", image: "https://m.media-amazon.com/images/I/81XmCGfKlWL._AC_UL480_QL65_.jpg" },
    { name: "Beauty", image: "https://m.media-amazon.com/images/I/51aiuoKu5HL._AC_UL480_FMwebp_QL65_.jpg" },
    { name: "Fashion", image: "https://m.media-amazon.com/images/I/71mX4WATh-L._AC_UL480_FMwebp_QL65_.jpg" },
    { name: "SkinCare", image: "https://m.media-amazon.com/images/I/71Epv8aPEoL._AC_UL480_FMwebp_QL65_.jpg" },
    { name: "Dress", image: "https://m.media-amazon.com/images/I/71X5DF+c+gL._AC_UL480_FMwebp_QL65_.jpg" },
  ];

  // Handle loading state
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#7041EE" />
      </View>
    );
  }

  // Handle error state
  if (error) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "red", textAlign: "center" }}>Error: {error}</Text>
      </View>
    );
  }

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

          <Icon name="location-on" size={24} color="#007ACC" style={styles.icon} />
          <Text style={styles.locationText}>Deliver to JK - Thoothukudi 628004</Text>
        </View>

        {/* Categories Section */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>

          {categories.map((category, index) => (
            <View key={index} style={styles.category}>
              <Image source={{ uri: category.image }} style={styles.categoryImage} />
              <Text>{category.name}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Promo Section */}
        <View style={styles.promo}>
          <Image source={require("../../assets/Banner.png")} style={styles.promoImage} />
        </View>

        {/* Products Section */}
        <Text style={styles.sectionTitle}>Deals for you</Text>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.productsScroll}>
          <View style={styles.products}>
            {products.map((product, index) => (
              <TouchableOpacity
                key={index}
                style={styles.productCard}
                onPress={() => goToProductPage(product)}
              >
                <Image source={{ uri: product.image }} style={styles.productImage} />
                <View style={styles.productDetails}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productPrice}>{product.price}</Text>
                </View>
              </TouchableOpacity>
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
  productCard: {
    width: "48%",
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productImage: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  productDetails: {
    padding: 10,
    alignItems: "center",
  },
  productName: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    color: "#7041EE",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#6200ea",
    padding: 10,
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
