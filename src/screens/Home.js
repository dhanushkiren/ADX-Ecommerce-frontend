import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Card, Button } from "react-native-paper";
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
import SearchBar from "../components/SearchBar";

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.home);
  const [refreshing, setRefreshing] = React.useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    dispatch(fetchProductsRequest()); // Fetch products again
    setTimeout(() => setRefreshing(false), 1000); // Stop refresh indicator
  };

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProductsRequest());
    }
  }, [dispatch, products]);

  const handleLogout = async() => {
    console.log('Logout initiated');
  
   
  await clearAsyncStorage();           // Clear token from Redux
  //navigation.replace("login"); 
    console.log('Storage and Redux token cleared');
      // Navigate to login screen
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productCardContainer}
      onPress={() => navigation.navigate("product", { product: item })}
    >
      <Card style={styles.productCard}>
        <Card.Cover
          style={styles.productImage}
          source={{ uri: item.imageUrl }}
          resizeMode="contain"
        />
        <Card.Content>
          <Text style={styles.productTitle}>{item.name}</Text>
          <Text style={styles.productDescription}>{item.sellerName}</Text>
          <Text style={styles.productPrice}>Price: ₹{item.price}</Text>

          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              style={styles.viewDetailsButton}
              labelStyle={styles.buttonLabel}
              onPress={() => navigation.navigate("product", { product: item })} // Navigate on press
            >
              View
            </Button>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
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
        refreshing={refreshing}
        onRefresh={handleRefresh} // Enables pull-to-refresh
      />
    );
  };

  return (
    <>
      <SearchBar />
      <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Deals for you</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Icon name="logout" size={24} color="gray" />
          </TouchableOpacity>
        </View>
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
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: "#fff",
  },
  logoutButton: {
    padding: 5,
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
  buttonContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  viewDetailsButton: {
    backgroundColor: "#7041EE",
    paddingHorizontal: 10,
  },
  buttonLabel: {
    fontSize: 12,
  },
});

export default Home;
