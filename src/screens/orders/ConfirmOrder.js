import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function ConfirmOrder({navigation}) {
  const handleGoToPlaceOrder = () => {
    // Navigate to the ConfirmOrder screen
    navigation.navigate('Order Checkout');
  };
  const [products, setProducts] = useState([
    { id: "1", name: "Product Name 1", price: 500, quantity: 1 },
    { id: "2", name: "Product Name 2", price: 300, quantity: 1 },
    { id: "3", name: "Product Name 3", price: 350, quantity: 1 },
  ]);

  const updateQuantity = (id, type) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? {
              ...product,
              quantity:
                type === "increase"
                  ? product.quantity + 1
                  : product.quantity > 1
                  ? product.quantity - 1
                  : product.quantity,
            }
          : product
      )
    );
  };
  const handleDelete = (id) => {
  setProducts((prevProducts) =>
    prevProducts.filter((product) => product.id !== id)
  );
};
const toggleCheckbox = (id) => {
  setProducts((prevProducts) =>
    prevProducts.map((product) =>
      product.id === id
        ? { ...product, checked: !product.checked }
        : product
    )
  );
};
const calculateTotal = () => {
  let totalQuantity = 0;
  let subtotal = 0;

  products.forEach((product) => {
    if (product.checked) {
      totalQuantity += product.quantity;
      subtotal += product.quantity * product.price;
    }
  });

  return { totalQuantity, subtotal };
};

const { totalQuantity, subtotal } = calculateTotal();


  const orderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <TouchableOpacity onPress={() => toggleCheckbox(item.id)} style={styles.checkboxContainer}>
        <View style={[styles.checkbox, item.checked && styles.checkedCheckbox]}>
          {item.checked && <Text style={styles.checkmark}>✔</Text>}
        </View>
        {/* <Text>test</Text> */}
      </TouchableOpacity>
      <Text style={styles.productName}>
        {item.name}</Text>
      <Text style={styles.productPrice}>₹{item.price}</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => updateQuantity(item.id, "decrease")}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => updateQuantity(item.id, "increase")}
        >
          <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item.id)} // Call handleDelete function
      >
        <Text style={styles.deleteText}>🗑️</Text>
      </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={orderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add More Products</Text>
      </TouchableOpacity>
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>
          Order Summary{"\n"}Total Quantity: {totalQuantity}
        </Text>
        <Text style={styles.summaryText}>Subtotal: ₹{subtotal}</Text>
      </View>
      <TouchableOpacity style={styles.checkoutButton}onPress={handleGoToPlaceOrder}>
        <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 10,
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
