import React from 'react';
import { View, Text, TextInput, ScrollView,Button, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import productImage from '../../assets/yellow.png';
import productImage1 from '../../assets/orange.png';
import productImage2 from '../../assets/red.png';
import productImage3 from '../../assets/violet.png';
import productImage4 from '../../assets/green.png'
import OrderImage from '../../assets/cat food.png'
import OrderImage1 from '../../assets/milk.png'
import OrderImage2 from '../../assets/oats.png'
import OrderImage3 from '../../assets/lotion.png'
import OrderImage4 from '../../assets/sunscreen.png'
import SearchIcon from '../../assets/searchicon.png'

const orderData = [
  {
    id: 1,
    image: OrderImage,
    title: 'Arriving tomorrow by 10 PM',
    status: 'Dispatched',
    isStatusHighlighted: true, // Custom field for highlighting specific text
  },
  {
    id: 2,
    image: OrderImage1,
    title: 'Chemist At Play Exfoliating Face Scrub',
    status: 'Delivered 3 December',
    isStatusHighlighted: false,
  },
  {
    id: 3,
    image: OrderImage2,
    title: 'Purepet Adult Dry Cat Food',
    status: 'Delivered 1 November',
    isStatusHighlighted: false,
  },
  {
    id: 4,
    image: OrderImage3,
    title: 'Body Lotion',
    status: 'Delivered 1 August',
    isStatusHighlighted: false,
  },
  {
    id: 5,
    image: OrderImage4,
    title: 'Sunscreen',
    status: 'Delivered 1 April',
    isStatusHighlighted: false,
  },
];
const Orderscreencomponent = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>

         <View style={styles.sectionHeader}>
      {/* Background Image */}
      <Image 
        source={require('../../assets/image.png')} // Replace with your local image path
        style={styles.backgroundImage}
      />
      
      {/* Overlay Content */}
      <View style={styles.overlayContent}>
        <Text style={styles.sectionTitle}>Your Orders</Text>
      </View>
    </View>

    <View style={styles.section}>
  {/* Header Row */}
  <View style={styles.headerRow}>
    <Text style={styles.sectionTitle}>Buy Again</Text>
    <TouchableOpacity>
    <Text style={styles.link}>See More</Text>
    </TouchableOpacity>
  </View>

  {/* Horizontal ScrollView */}
  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    <Image source={productImage} style={styles.productImage} />
    <Image source={productImage1} style={styles.productImage} />
    <Image source={productImage2} style={styles.productImage} />
    <Image source={productImage3} style={styles.productImage} />
    <Image source={productImage4} style={styles.productImage} />
  </ScrollView>
</View>

        <View style={styles.section}>
        <View style={styles.headerRow}>
      <Text style={styles.sectionTitle}>Past Three Months</Text>
      </View>

   
       {orderData.map((order) => (
            <View key={order.id} style={styles.orderItem}>
              <Image source={order.image} style={styles.orderImage} />
              <View style={styles.textContainer}>
                <Text
                  style={
                    order.isStatusHighlighted
                      ? [styles.orderStatus, { color: 'green' }] // Highlight if specified
                      : styles.orderTitle
                  }
                >
                  {order.title}
                </Text>
                <Text>{order.status}</Text>
              </View>
              <TouchableOpacity style={styles.nextButton}>
                <Icon name="chevron-right" size={24} color="#000" />
              </TouchableOpacity>
            </View>
          ))}
    </View>

        <TouchableOpacity style={styles.viewMoreButton}   onPress={() => navigation.navigate('history')}>
          <Text style={styles.viewMoreText}
        > View More </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 0,  // Ensure no margin
    padding: 0,  // Ensure no padding
    width: '100%',  // Take full width
    height: '100%',  // Take full height
    position: 'absolute',  // Ensure it takes the whole screen without restriction
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  scrollViewContainer: {
    flexGrow: 1, 
   
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#7041EE', 
  },
   searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  searchIcon: {
    width: 20, // Adjust size to fit the design
    height: 20,
    marginRight: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 10, // Ensures padding inside the header
    marginBottom: 10,
    paddingHorizontal: 7,
    backgroundColor: '#7041EE', // Violet background for the header row
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 25,
    backgroundColor:'#fff'
  },
  filterIcon: {
    marginLeft: 10,
    alignSelf: 'center',
  },

  sectionHeader: {
    width: '100%', // Full width of the container
    height: 50, // Adjust height as needed
    position: 'relative', // Enables stacking of content
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    position: 'absolute', // Places the image at the back
    width: '100%', // Full width
    height: '100%', // Full height
    resizeMode: 'cover', // Adjust image scaling
  },
  overlayContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%', // Align content within the header
  },
  // sectionTitle: {
  //   fontSize: 18,
  //   fontWeight: 'bold',
  //   paddingBottom:20,
  //   color: '#FFFFFF',
    
  // },
  link: {
    color: '#FFFFFF',
    
  },
  productImage: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  orderItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  orderStatus: {
    color: 'purple',
    fontWeight: 'bold',
  },
  viewMoreButton: {
    backgroundColor: '#7041EE',
    paddingVertical: 10,
    marginHorizontal: 10,
    marginTop: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  viewMoreText: {
    color: '#fff',
    fontSize: 16,
  },
  section: {
   
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    // marginBottom: 10,
    color: '#FFFFFF',
    
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  orderImage: {
    width: 75,
    height: 75,
    borderRadius: 5,
    marginRight: 10,
  },
  textContainer: {
    flex: 1, // Take up remaining space between image and button
  },
  orderStatus: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 16,
  },
  orderTitle: {
    fontSize: 16,
  },
  nextButton: {
    paddingHorizontal: 10,
  },
});

export default Orderscreencomponent;
