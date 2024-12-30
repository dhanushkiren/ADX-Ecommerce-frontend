import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-swiper';

export default function ProductPage() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Icon name="arrow-back" size={24} color="white" />
        <Icon name="cart" size={24} color="white" style={styles.cartIcon} />
      </View>

      {/* Product Image Slider */}
      <Swiper style={styles.swiper} showsButtons={true} autoplay={true}>
        <Image
          source={require('../images/1.webp')} 
          style={styles.productImage}
        />
        <Image
          source={require('../images/2.webp')} 
          style={styles.productImage}
        />
        <Image
          source={require('../images/3.webp')} 
          style={styles.productImage}
        />
      </Swiper>

      {/* Bestseller Tag */}
      <Text style={styles.bestSellerTag}>BESTSELLER</Text>

      {/* Product Info */}
      <Text style={styles.productTitle}>ROYAL ENFIELD Streetwind V3 Riding Protection Jacket</Text>
      <Text style={styles.discountText}>28% <Text style={styles.originalPrice}>6,500</Text> 4,680</Text>

      {/* Heart and Share Icons */}
      <View style={styles.iconRow}>
        <Icon name="heart-outline" size={24} color="red" />
        <Icon name="share-outline" size={24} color="black" style={styles.shareIcon} />
      </View>

      {/* Order Info */}
      <Text style={styles.orderInfo}>140 people ordered this in the last 30 days</Text>

      {/* Seller Info */}
      <Text style={styles.sellerTitle}>View More From REYNOX RIDING</Text>
      <Text style={styles.sellerProductTitle}>ROYAL ENFIELD Mountain Riding Protecting Jacket (Black, L)</Text>
      <Text style={styles.rating}>4.2 ★ 267 ratings</Text>

      {/* Offer Section */}
      <Text style={styles.offerTag}>Top Discount of the Sale</Text>
      {/* <Text style={styles.offerDiscount}>28% 6,500 4,680</Text> */}
      <Text style={styles.deliveryInfo}>Free delivery by Tomorrow</Text>

      {/* EMI Section */}
      <Text style={styles.emiText}>No cost EMI ₹1,428/month. <Text style={styles.link}>View Plans</Text></Text>
      <Text style={styles.emiText}>Buy & Pay in easy EMIs with TRADEZY EMI.</Text>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.emiButton}>
          <Text style={styles.buttonText}>Add to Cart</Text>
          {/* <Text style={styles.buttonText}>Pay with EMI</Text>
          <Text style={styles.buttonSubText}>From ₹1,428/m</Text> */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyNowButton}>
          <Text style={styles.buttonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#6200ee',
  },
  cartIcon: {
    marginLeft: 'auto',
  },
  swiper: {
    height: 300,
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  bestSellerTag: {
    backgroundColor: '#00c853',
    color: 'white',
    textAlign: 'center',
    padding: 5,
    margin: 10,
    fontWeight: 'bold',
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10,
  },
  discountText: {
    fontSize: 16,
    color: '#d50000',
    marginLeft: 10,
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  iconRow: {
    flexDirection: 'row',
    marginLeft: 10,
    marginVertical: 5,
  },
  shareIcon: {
    marginLeft: 20,
  },
  orderInfo: {
    margin: 10,
    color: 'gray',
  },
  sellerTitle: {
    margin: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  sellerProductTitle: {
    marginHorizontal: 10,
    fontSize: 14,
    color: 'black',
  },
  rating: {
    marginHorizontal: 10,
    color: 'green',
  },
  offerTag: {
    margin: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  offerDiscount: {
    marginLeft: 10,
    fontSize: 16,
    color: '#d50000',
  },
  deliveryInfo: {
    margin: 10,
    color: 'green',
  },
  emiText: {
    margin: 10,
    color: 'gray',
  },
  link: {
    color: '#6200ee',
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  emiButton: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginRight: 5,
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: '#ffd600',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonSubText: {
    fontSize: 12,
    color: 'gray',
  },
});
