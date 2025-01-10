import React from "react";
import SearchIcon from "../../assets/Search.png";
import { TouchableWithoutFeedback } from "react-native";
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
import { SearchBar } from "react-native-screens";

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const goToProductPage = (category) => {
    navigation.navigate('Product', { category });
  };

  const categories = [
    {
      name: "Mobiles",
      image:
        "https://m.media-amazon.com/images/I/81XmCGfKlWL._AC_UL480_QL65_.jpg",
    },
    {
      name: "Beauty",
      image:
        "https://m.media-amazon.com/images/I/51aiuoKu5HL._AC_UL480_FMwebp_QL65_.jpg",
    },
    {
      name: "Fashion",
      image:
        "https://m.media-amazon.com/images/I/71mX4WATh-L._AC_UL480_FMwebp_QL65_.jpg",
    },
    {
      name: "SkinCare",
      image:
        "https://m.media-amazon.com/images/I/71Epv8aPEoL._AC_UL480_FMwebp_QL65_.jpg",
    },
    {
      name: "Dress",
      image:
        "https://m.media-amazon.com/images/I/71X5DF+c+gL._AC_UL480_FMwebp_QL65_.jpg",
    },
  ];
  

  const products = [
    {
      name: "",
      image:
        "https://images-eu.ssl-images-amazon.com/images/G/31/img21/june/CE/GW/QC/PC/PC_QuadCard_boAt_0.5x._SY116_CB553870684_.jpg",
    },
    {
      name: "",
      image:
        "https://images-eu.ssl-images-amazon.com/images/G/31/img21/june/CE/GW/QC/PC/PC_QuadCard_Boult_0.5x._SY116_CB553870684_.jpg",
    },
    {
      name: "",
      image:
        "https://images-eu.ssl-images-amazon.com/images/G/31/img21/june/CE/GW/QC/PC/PC_QuadCard_Noise_0.5x._SY116_CB553870684_.jpg",
    },
    {
      name: "",
      image:
        "https://images-eu.ssl-images-amazon.com/images/G/31/img21/june/CE/MSO/PD3/PC_QuadCard_Zeb_0.5x_1._SY116_CB570220221_.jpg",
    },
  ];


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
            <Image source={SearchIcon} style={styles.searchIcon}
             />
            <TextInput
              style={styles.searchBar}
              placeholder="Search Tradezy.in"
              placeholderTextColor="#aaa"
              onPress={()=> navigation.navigate("search")}
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
          {/* Location Icon and Text */}
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
            source={require("../../assets/Banner.png")}
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

        {/* Footer */}
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
    width: 20, // Adjust size to fit the design
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
    backgroundColor: "#8D67F1", // Purple background color
    fontSize: 14,
    paddingBottom: 20,
    flexDirection: "row", // Align icon and text horizontally
    alignItems: "center", // Vertically center the items
    justifyContent: "flex-start", // Align items to the left
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

  footerIcon: {
    fontSize: 20,
    color: "#fff",
  },
});

export default Home;
