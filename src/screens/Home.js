import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SearchIcon from "../../assets/search.svg";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { logout } from "../redux/auth/authSlice";
import { clearAsyncStorage } from "../utils/asyncStorage";
import { fetchProductsRequest } from "../redux/home/homeSlice";
import { Card } from "react-native-paper";
import SearchBar from "../components/SearchBar";


const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.home);

  useEffect(() => {
    // Dispatch action to fetch products
    dispatch(fetchProductsRequest());
  }, [dispatch]);

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          onPress: () => {
            clearAsyncStorage();
            dispatch(logout());
            navigation.replace("login");
          },
        },
      ],
      { cancelable: true }
    );
  };

  const renderProductItem = ({ item }) => (
    <View style={styles.productCardContainer}>
      <Card style={styles.productCard}>

        <Card.Cover
          style={styles.productImage}
          source={{ uri: item.imageUrl }}
        />
        <Card.Content>
          <Text style={styles.productTitle}>{item.name}</Text>
          <Text style={styles.productDescription}>{item.description}</Text>

        </Card.Content>
      </Card>
    </View>
  );

  const renderProducts = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="#7041EE" />;
    }

    if (error) {
      return <Text style={styles.errorText}>{error}</Text>;
    }

    return (
      <FlatList
        data={products}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderProductItem}
        numColumns={2}
        contentContainerStyle={styles.productListContainer}
        columnWrapperStyle={styles.productRow}
      />
    );
  };

  return (

    <>
    <SearchBar />
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Deals for you</Text>
        {renderProducts()}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
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
  location: {
    padding: 15,
    backgroundColor: "#8D67F1",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  locationText: {
    fontSize: 14,
    color: "#fff",
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  productListContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  productRow: {
    justifyContent: "space-between",
  },
  productCardContainer: {
    flex: 1,
    margin: 5,
  },
  productCard: {
    borderRadius: 8,
    overflow: "hidden",
  },
  productImage: {
    height: 150,
    resizeMode: "contain",
  },
  productTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
  },
  productDescription: {
    fontSize: 10,
    color: "gray",
    marginTop: 10,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
});

export default Home;
