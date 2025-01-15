import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { logout } from "../redux/auth/authSlice";
import { clearAsyncStorage } from "../utils/asyncStorage";
import { fetchProductsRequest } from "../redux/home/homeSlice";
import { PaperProvider, Card } from 'react-native-paper';
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

  const renderProducts = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="#7041EE" />;
    }

    if (error) {
      return <Text style={styles.errorText}>{error}</Text>;
    }

    return (
      <>
        {products.map((product, index) => (
          <Card style={{ margin: 20 }}>
            <Card.Title
              title={product.name}
            />
            <Card.Cover
            style={{padding:10}}
              source={{
                uri:product.imageUrl,
              }}
            />
            <Card.Content>
              <Text>{product.description}</Text>
            </Card.Content>
          </Card>
        ))}
    </>
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

          <Icon name="location-on" size={24} color="#007ACC" style={styles.icon} />
          <Text style={styles.locationText}>
            Deliver to JK - Thoothukudi 628004
          </Text>
        </View>

        {/* Products Section */}
        <Text style={styles.sectionTitle}>Deals for you</Text>
        {renderProducts()}
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
  products: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 10,
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
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
});

export default Home;
