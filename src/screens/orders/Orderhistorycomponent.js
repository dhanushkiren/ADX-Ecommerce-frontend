import React from 'react';
import { View, Text, TextInput, FlatList, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';

const OrderhistoryComponent = () => {
  // Order data
  const orders = [
    {
      orderId: 'A235',
      product: 'Philips Hair Accessory',
      date: '4th Nov, 2024',
      price: '300 ₹',
      rating: 3,
      image: 'https://m.media-amazon.com/images/I/712KKGqy-wL._SL1500_.jpg',
    },
    {
      orderId: 'J234',
      product: 'Silk saree',
      date: '4th May, 2024',
      price: '2500 ₹',
      rating: 1,
      image: 'https://m.media-amazon.com/images/I/61t5Rq80yeL._SY879_.jpg',
    },
    {
      orderId: 'B233',
      product: 'Food',
      date: '4th Feb, 2024',
      price: '900 ₹',
      rating: 4,
      image: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Pizza-3007395.jpg',
    },
    {
      orderId: 'A232',
      product: 'School bag',
      date: '2nd May, 2023',
      price: '500 ₹',
      rating: 5,
      image: 'https://m.media-amazon.com/images/I/81ctaeouDCL._SX679_.jpg',
    },
  ];

  // Render individual order cards
  const renderOrder = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.orderId}>Order no: {item.orderId}</Text>
      <View style={styles.row}>
        <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
        <View style={styles.details}>
          <Text style={styles.productName}>{item.product}</Text>
          <Text style={styles.date}>Delivered on {item.date}</Text>
          <Text style={styles.price}>Total price: {item.price}</Text>
          <View style={styles.ratingContainer}>
            <Text>Give Ratings </Text>
            {[...Array(5)].map((_, index) => (
              <TouchableOpacity key={index}>
                <Text style={styles.star}>{index < item.rating ? '★' : '☆'}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity>
            <Text style={styles.review}>Write a review</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.downloadButton}>
        <Text style={styles.downloadText}>Download invoice</Text>
      </TouchableOpacity>
    </View>

  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ORDER HISTORY</Text>
      <FlatList
        data={orders}
        renderItem={renderOrder}
        keyExtractor={(item) => item.orderId}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 30
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
    paddingTop: 15,
    height: 40,
  },
  card: {
    backgroundColor: '#f9f9f9',
    marginVertical: 10,
    padding: 10,
    borderRadius: 8,
    elevation: 3,
  },
  orderId: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  productName: {
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    color: '#666',
  },
  price: {
    marginVertical: 5,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    fontSize: 18,
    marginHorizontal: 2,
    color: '#FFD700',
  },
  review: {
    color: '#007BFF',
    marginTop: 5,
  },
  downloadButton: {
    marginTop: 10,
    backgroundColor: '#7041EE',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  downloadText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default OrderhistoryComponent;
