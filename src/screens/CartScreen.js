import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';

const CartPage = () => {
  const basePrice = 249; 
  const discount = 13; 
  const deliveryCharges = 58;
  const deliveryDate = "Jan 12, Sun"; 

  
  const calculateTotal = (quantity) => {
    const priceAfterDiscount = basePrice - discount;
    return priceAfterDiscount * quantity + deliveryCharges;
  };

  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleRemove = () => {
    Alert.alert("Remove Item", "Are you sure you want to remove this item?", [
      { text: "Cancel", style: "cancel" },
      { text: "Remove", onPress: () => console.log("Item removed") }
    ]);
  };

  const handleBuyNow = () => {
    Alert.alert("Buy Now", "Proceeding to buy now!", [{ text: "OK", onPress: () => console.log("Buy Now clicked") }]);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Cart Header */}
      <View style={styles.header}>
        <Text style={styles.cartText}>My Cart</Text>
      </View>

      {/* Product Details */}
      <View style={styles.productContainer}>
        <Image
          source={require("../../assets/images/Shamboo.webp")}
          style={styles.productImage}
        />
        <View style={styles.productDetails}>
          <Text style={styles.productTitle}>Kesh King Organic Onion Shampoo</Text>
          <Text style={styles.productSubtitle}>200 ml</Text>
          <Text style={styles.productPrice}>₹{basePrice}</Text>
          <Text style={styles.productOffer}>15% off</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={decreaseQuantity}>
              <Text style={styles.quantityButton}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity onPress={increaseQuantity}>
              <Text style={styles.quantityButton}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Delivery Details */}
      <View style={styles.deliveryContainer}>
        <Text style={styles.deliveryText}>Delivery by: {deliveryDate}</Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.removeButton} onPress={handleRemove}>
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyNowButton} onPress={handleBuyNow}>
          <Text style={styles.buyNowText}>Buy Now</Text>
        </TouchableOpacity>
      </View>

      {/* Price Details */}
      <View style={styles.priceDetails}>
        <Text style={styles.sectionTitle}>Price Details</Text>
        <View style={styles.priceRow}>
          <Text>Price ({quantity} item{quantity > 1 ? 's' : ''})</Text>
          <Text>₹{basePrice * quantity}</Text>
        </View>
        <View style={styles.priceRow}>
          <Text>Discount</Text>
          <Text>-₹{discount * quantity}</Text>
        </View>
        <View style={styles.priceRow}>
          <Text>Delivery Charges</Text>
          <Text>₹{deliveryCharges}</Text>
        </View>
        <View style={styles.priceRow}>
          <Text>Total Amount</Text>
          <Text style={styles.totalAmount}>₹{calculateTotal(quantity)}</Text>
        </View>
      </View>

      {/* Place Order */}
      <TouchableOpacity style={styles.placeOrderButton}>
        <Text style={styles.placeOrderText}>Place Order</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 18,
    backgroundColor: '#7041EE',
  },
  cartText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontFamily: 'Roboto',
  },
  productContainer: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 16,
  },
  productDetails: {
    flex: 1,
  },
  productTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  productSubtitle: {
    fontSize: 15,
    color: '#555',
    marginVertical: 4,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  productOffer: {
    fontSize: 14,
    color: 'green',
    marginVertical: 4,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityButton: {
    fontSize: 18,
    color: '#000',
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    textAlign: 'center',
  },
  quantityText: {
    marginHorizontal: 8,
    fontSize: 16,
  },
  deliveryContainer: {
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  deliveryText: {
    fontSize: 14,
    color: '#555',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  removeButton: {
    flex: 1,
    marginRight: 8,
    padding: 12,
    backgroundColor: '#7041EE',
    borderRadius: 4,
    alignItems: 'center',
  },
  buyNowButton: {
    flex: 1,
    marginLeft: 8,
    padding: 12,
    backgroundColor: '#7041EE',
    borderRadius: 4,
    alignItems: 'center',
  },
  removeText: {
    color: '#fff',
    fontSize: 16,
  },
  buyNowText: {
    color: '#fff',
    fontSize: 16,
  },
  priceDetails: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  totalAmount: {
    fontWeight: 'bold',
    color: '#333',
  },
  placeOrderButton: {
    margin: 16,
    padding: 16,
    backgroundColor: '#7041EE',
    borderRadius: 4,
    alignItems: 'center',
  },
  placeOrderText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CartPage;
