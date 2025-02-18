import React, { useEffect, useState } from 'react'; 
import { useDispatch, useSelector,loading } from 'react-redux';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  viewCartRequest,
  addToCartRequest,
  deleteCartItemRequest,
  clearCartRequest,
} from '../redux/cart/cartSlice';

const CartPage = () => {
  const dispatch = useDispatch();
  
  const { cartItems, loadingItems, error } = useSelector((state) => state.cart);

  const [selectedItems, setSelectedItems] = useState({}); // Added state for selectedItems
  const userId = '1'; // Replace with actual user ID from context or props.

  useEffect(() => {
    if (userId) {
      dispatch(viewCartRequest({ userId }));
    }
  }, [dispatch, userId]);

  const handleIncreaseQuantity = (item) => {
    dispatch(
      addToCartRequest({
        userId,
        productData: { ...item, quantity: item.quantity + 1 },
      })
    );
  };;

  const handleDecreaseQuantity = (item) => {
    if (item.quantity > 1) {
      dispatch(
        addToCartRequest({
          userId,
          productData: { ...item, quantity: item.quantity - 1 },
        })
      );
    } else {
      Alert.alert('Remove Item', 'Quantity is 1. Do you want to remove this item?', [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          onPress: () => dispatch(deleteCartItemRequest({ userId, itemId: item.id })),
        },
      ]);
    }
  };
  

  const handleBuyNow = (item) => {
    Alert.alert('Buy Now', 'You have chosen to buy ${item.productName}.');
    // Add any additional logic for buying the product, e.g., navigating to a payment page.
  };

  const handleRemoveItem = (item) => {
    Alert.alert('Remove Item', 'Are you sure you want to remove this item?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        onPress: () => dispatch(deleteCartItemRequest({ userId, itemId: item.id })),
      },
    ]);
  };

  const handleToggleSelection = (itemId) => {
    setSelectedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const handleDeselectAll = () => {
    setSelectedItems({});
  };

  
  const calculateTotal = () => {
    const selectedItemIds = Object.keys(selectedItems).filter((id) => selectedItems[id]);
    const basePrice = cartItems.reduce(
      (sum, item) =>
        selectedItemIds.includes(item.id.toString())
          ? sum + item.price * item.quantity
          : sum,
      0
    );
    const discount = cartItems.reduce(
      (sum, item) =>
        selectedItemIds.includes(item.id.toString())
          ? sum + (item.discount || 0) * item.quantity
          : sum,
      0
    );
    const deliveryCharges = 58; // Fixed delivery charges.
    return basePrice - discount + (basePrice > 0 ? deliveryCharges : 0);
  };

  const selectedCount = Object.values(selectedItems).filter(Boolean).length;

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7041EE" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (Object.keys(loadingItems).length === 0 && loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7041EE" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.cartText}>My Cart</Text>
      </View>

<TouchableOpacity style={styles.deselectAllButton} onPress={handleDeselectAll}>
        <Text style={styles.deselectAllText}>Deselect all items</Text>
      </TouchableOpacity>

      {cartItems.map((item) => (
        <View style={styles.productContainer} key={item.id}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => handleToggleSelection(item.id)}
          >
            {selectedItems[item.id] && (
              <Text style={styles.checkboxTick}>✓</Text>
            )}
            
          </TouchableOpacity>
          <Image source={{ uri: item.imageUrl || 'fallback_image_url' }} style={styles.productImage} />
          <View style={styles.productDetails}>
            <Text style={styles.productTitle}>{item.productName || 'Unnamed Product'}</Text>
            <Text style={styles.productPrice}>₹{item.price ?? 0}</Text>
            <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={() => handleDecreaseQuantity(item)} disabled={loadingItems[item.id]}>
              {loadingItems[item.id] ? (
                <ActivityIndicator size="small" color="#7041EE" />
              ) : (
                <Text style={styles.quantityButton}>-</Text>
              )}
            </TouchableOpacity>
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <TouchableOpacity onPress={() => handleIncreaseQuantity(item)} disabled={loadingItems[item.id]}>
              {loadingItems[item.id] ? (
                <ActivityIndicator size="small" color="#7041EE" />
              ) : (
                <Text style={styles.quantityButton}>+</Text>
              )}
            </TouchableOpacity>
            </View>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.buyNowButton} onPress={() => handleBuyNow(item)}>
                <Text style={styles.buyNowText}>Buy Now</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveItem(item)}>
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
              
            </View>
          </View>
        </View>
      ))}

<View style={styles.priceDetails}>
  <Text style={styles.sectionTitle}>Price Details</Text>
  <View style={styles.priceRow}>
    <Text>Total Items</Text>
    <Text>{cartItems.length}</Text>
  </View>
  <View style={styles.priceRow}>
    <Text>Total Amount</Text>
    <Text style={styles.totalAmount}>₹{calculateTotal()}</Text>
  </View>
</View>
<TouchableOpacity
  style={styles.proceedToBuyButton}
  onPress={null} // Add functionality for Proceed to Buy
>
  <Text style={styles.proceedToBuyText}>
    Proceed to Buy ({selectedCount} items)
  </Text>
</TouchableOpacity>


     
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 80,
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
    paddingTop: 15,
  },
  productContainer: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },

  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#7041EE',
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxTick: {
    fontSize: 16,
    color: '#7041EE', // Tick color
    fontWeight: 'bold',
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
    fontSize: 23,
    fontWeight: 'bold',
  },

  productSubtitle: {
    fontSize: 10,
    color: '#555',
    marginVertical: 4,
  },
  productDescription: {
    fontSize: 14,
    color: '#555',
    marginVertical: 6,
    lineHeight: 20,
  },
  
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  ratingText: {
    fontSize: 14,
    color: 'green',
    marginLeft: 8,
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
  
  deselectAllText: {
    fontSize: 20,
    color: '#333',
    alignItems:'left',
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
    justifyContent: 'space-between', // Ensures buttons are spaced
    marginTop: 10,
  },
  
  buyNowButton: {
    flex: 1, // Ensures the button takes up equal space
    marginRight: 8, // Space between Buy Now and Remove buttons
    paddingVertical: 10,
    backgroundColor: '#7041EE',
    borderRadius: 4,
    alignItems: 'center',
  },
  
  removeButton: {
    flex: 1, // Ensures the button takes up equal space
    marginLeft: 8, // Space between Buy Now and Remove buttons
    paddingVertical: 10,
    backgroundColor: '#FF3B30',
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
  proceedToBuyButton: {
    margin: 16,
    padding: 16,
    backgroundColor: '#7041EE',
    borderRadius: 4,
    alignItems: 'center',
  },
  proceedToBuyText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CartPage;