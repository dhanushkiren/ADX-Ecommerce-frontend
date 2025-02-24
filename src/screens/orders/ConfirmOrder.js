import React, { useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useRoute } from "@react-navigation/native";
import {
  setSelectedProducts,
  updateQuantity,
  deleteProduct,
  placeOrderRequest,
} from "../../redux/ConfirmOrder/ConfirmOrderSlice.js";

export default function ConfirmOrder({ navigation }) {
  const route = useRoute();
  const dispatch = useDispatch();
  const { selectedProducts, subtotal } = useSelector((state) => state.confirmOrder);

  useEffect(() => {
    if (Array.isArray(route.params?.selectedProducts)) {
      dispatch(setSelectedProducts(route.params.selectedProducts));
    }
  }, [route.params?.selectedProducts]);
  

  const handleGoToPlaceOrder = () => {
    dispatch(placeOrderRequest({ products: selectedProducts }));
    navigation.navigate("Order Checkout");
  };

  const orderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>₹{item.price}</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity style={styles.quantityButton} onPress={() => dispatch(updateQuantity({ id: item.id, type: "decrease" }))}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity style={styles.quantityButton} onPress={() => dispatch(updateQuantity({ id: item.id, type: "increase" }))}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={() => dispatch(deleteProduct(item.id))}>
        <Text style={styles.deleteText}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );
  

  return (
    <View style={styles.container}>
      <FlatList data={selectedProducts} renderItem={orderItem} keyExtractor={(item) => item.id.toString()} />
      <Text>Total: ₹{subtotal}</Text>
      <TouchableOpacity onPress={handleGoToPlaceOrder}>
        <Text>Proceed to Checkout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 10,
    paddingTop: 40
  },
  productContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 25,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    flex: 2,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "500",
    color: "#6200EE",
    flex: 1,
    textAlign: "center",
   flexDirection:'column'
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    width: 30,
    height: 30,
    backgroundColor: "#6200EE",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: "600",
  },
  deleteButton: {
    marginLeft: 10,
  },
  deleteText: {
    fontSize: 18,
    color: "red",
  },
  addButton: {
    backgroundColor: "#6200EE",
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 210,
    alignItems: "center",
    marginTop:26,
    marginVertical: 10,
  },
  addButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  summaryContainer: {
    backgroundColor: "#FFF",
    padding: 30,
    borderRadius: 8,
    marginBottom: 60,
    elevation: 2,
  },
  summaryText: {
    fontSize: 18,
    fontWeight: "500",
    fontStyle:'Bold'
  },
  checkoutButton: {
    backgroundColor: "#6200EE",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 30
  },
  checkoutButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  // Custom Checkbox Styles
  checkboxContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#6200EE",
    justifyContent: "center",
    alignItems: "center",
  },
  checkedCheckbox: {
    backgroundColor: "#6200EE",
  },
  checkmark: {
    color: "#FFF",
    fontSize: 18,
  },
});
