import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Button } from "react-native-paper";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { fetchProductsRequest } from "../redux/home/homeSlice";
import SearchBar from "../components/SearchBar";

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.home);

  const [refreshing, setRefreshing] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 4;

  const handleRefresh = () => {
    setRefreshing(true);
    dispatch(fetchProductsRequest());
    setPage(1);
    setVisibleProducts([]); // reset visible list
    setTimeout(() => setRefreshing(false), 1000);
  };
  
  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProductsRequest());
    }
  }, [dispatch]);

  useEffect(() => {
    if (products.length > 0 && page === 1) {
      setVisibleProducts(products.slice(0, ITEMS_PER_PAGE));
    }
  }, [products]);
  

  const handleLoadMore = () => {
    const nextPage = page + 1;
    const start = (nextPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    if (start < products.length) {
      setVisibleProducts((prev) => [...prev, ...products.slice(start, end)]);
      setPage(nextPage);
    }
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
              onPress={() => navigation.navigate("product", { product: item })}
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

    if (products.length === 0) {
      return <Text style={styles.errorText}>NO PRODUCTS IN THE DB.</Text>;
    }

    return (
      <FlatList
        data={visibleProducts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderProductItem}
        numColumns={2}
        contentContainerStyle={styles.productListContainer}
        columnWrapperStyle={styles.productRow}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          visibleProducts.length < products.length ? (
            <ActivityIndicator size="small" color="#7041EE" />
          ) : null
        }
      />
    );
  };

  return (
    <>
      <SearchBar />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.sectionTitle}>Deals for you</Text>
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
    marginBottom: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productListContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  productRow: {
    justifyContent: "space-between",
  },
  productCardContainer: {
    flex: 0.5,
    margin: 5,
  },
  productCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    elevation: 3,
  },
  productImage: {
    height: 150,
    backgroundColor: "#fff",
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
  productPrice: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "600",
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
