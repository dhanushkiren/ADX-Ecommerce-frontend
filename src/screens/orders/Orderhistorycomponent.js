import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Import the icon
import { useNavigation } from '@react-navigation/native';
import { orderHistoryData } from '../../utils/data'; // Your data file

const OrderhistoryComponent = () => {
  const navigation = useNavigation();

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
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={24} color="#2C2929" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order History</Text>
      </View>

      <FlatList
        data={orderHistoryData}
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
    paddingTop: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#2C2929',
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
