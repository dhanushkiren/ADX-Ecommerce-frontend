import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Swiper from "react-native-swiper";

export default function ProductPage({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('home')}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.iconContainer}>
          <Icon name="search" size={24} color="white" />
          <Icon name="cart" size={24} color="white" />
        </View>
      </View>

      {/* Product Image Slider */}
      <Swiper style={styles.swiper} showsButtons={true} autoplay={true}>
        <Image

          source={require("../../assets/images/1.webp")}
          style={styles.productImage}
        />
        <Image
          source={require("../../assets/images/2.webp")}
          style={styles.productImage}
        />
        <Image
          source={require("../../assets/images/3.webp")}

          style={styles.productImage}
        />
      </Swiper>

      {/* Bestseller Tag */}
      <Text style={styles.bestSellerTag}>BESTSELLER</Text>

      {/* Product Info */}
      <Text style={styles.productTitle}>
        ROYAL ENFIELD Streetwind V3 Riding Protection Jacket
      </Text>

      <Text style={styles.discountText}>
        28% <Text style={styles.originalPrice}>6,500</Text> 4,680
      </Text>

      {/* Heart and Share Icons */}
      <View style={styles.iconRow}>
        <Icon name="heart-outline" size={24} color="red" />
        <Icon
          name="share-outline"
          size={24}
          color="black"
          style={styles.shareIcon}
        />
      </View>

      {/* Order Info */}
      <Text style={styles.orderInfo}>
        140 people ordered this in the last 30 days
      </Text>

      {/* Seller Info */}
      <Text style={styles.sellerTitle}>View More From REYNOX RIDING</Text>
      <Text style={styles.sellerProductTitle}>
        ROYAL ENFIELD Mountain Riding Protecting Jacket (Black, L)
      </Text>
      <Text style={styles.rating}>4.2 ★ 267 ratings</Text>

      {/* Offer Section */}
      <Text style={styles.offerTag}>Top Discount of the Sale</Text>
      <Text style={styles.deliveryInfo}>Free delivery by Tomorrow</Text>

      {/* EMI Section */}
      <Text style={styles.emiText}>
        No cost EMI ₹1,428/month. <Text style={styles.link}>View Plans</Text>
      </Text>

      <Text style={styles.emiText}>
        Buy & Pay in easy EMIs with TRADEZY EMI.
      </Text>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.emiButton}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyNowButton}>
          <Text style={styles.buttonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
      
          {/* Technical Details Heading */}
<Text style={styles.tableHeading}>Technical Details</Text>

{/* Product Description Table */}
<View style={styles.tableContainer}>
  <View style={styles.tableRow}>
    <View style={[styles.tableCellHeader, styles.leftCell]}>
      <Text>Manufacturer</Text>
    </View>
    <View style={[styles.tableCell, styles.rightCell]}>
      <Text>
        KADENA, KADENA INDUSTRIES LIMITED, RM-1006, 10/F PO YIP BUILDING, 23 HING YIP STREET, KOWLOON, Hong Kong Island, 999077
      </Text>
    </View>
  </View>
  <View style={styles.tableRow}>
    <View style={[styles.tableCellHeader, styles.leftCell]}>
      <Text>Brand</Text>
    </View>
    <View style={[styles.tableCell, styles.rightCell]}>
      <Text>Royal Enfield</Text>
    </View>
  </View>
  <View style={styles.tableRow}>
    <View style={[styles.tableCellHeader, styles.leftCell]}>
      <Text>Model</Text>
    </View>
    <View style={[styles.tableCell, styles.rightCell]}>
      <Text>STREETWIND</Text>
    </View>
  </View>
  <View style={styles.tableRow}>
    <View style={[styles.tableCellHeader, styles.leftCell]}>
      <Text>Product Dimensions</Text>
    </View>
    <View style={[styles.tableCell, styles.rightCell]}>
      <Text>73.5 x 61 x 73.5 cm; 1.3 kg</Text>
    </View>
  </View>
  <View style={styles.tableRow}>
    <View style={[styles.tableCellHeader, styles.leftCell]}>
      <Text>Item Model Number</Text>
    </View>
    <View style={[styles.tableCell, styles.rightCell]}>
      <Text>JRA220001</Text>
    </View>
  </View>
  <View style={styles.tableRow}>
    <View style={[styles.tableCellHeader, styles.leftCell]}>
      <Text>Manufacturer Part Number</Text>
    </View>
    <View style={[styles.tableCell, styles.rightCell]}>
      <Text>RRGJRA220072</Text>
    </View>
  </View>
  <View style={styles.tableRow}>
    <View style={[styles.tableCellHeader, styles.leftCell]}>
      <Text>Outer Material</Text>
    </View>
    <View style={[styles.tableCell, styles.rightCell]}>
      <Text>Polyester</Text>
    </View>
  </View>
  <View style={styles.tableRow}>
    <View style={[styles.tableCellHeader, styles.leftCell]}>
      <Text>Material</Text>
    </View>
    <View style={[styles.tableCell, styles.rightCell]}>
      <Text>Polyester</Text>
    </View>
  </View>
  <View style={styles.tableRow}>
    <View style={[styles.tableCellHeader, styles.leftCell]}>
      <Text>Chest Size</Text>
    </View>
    <View style={[styles.tableCell, styles.rightCell]}>
      <Text>42 Centimetres</Text>
    </View>
  </View>
  <View style={styles.tableRow}>
    <View style={[styles.tableCellHeader, styles.leftCell]}>
      <Text>Colour</Text>
    </View>
    <View style={[styles.tableCell, styles.rightCell]}>
      <Text>BLACK</Text>
    </View>
  </View>
  <View style={styles.tableRow}>
    <View style={[styles.tableCellHeader, styles.leftCell]}>
      <Text>Water Resistance</Text>
    </View>
    <View style={[styles.tableCell, styles.rightCell]}>
      <Text>Water Resistant</Text>
    </View>
  </View>
  <View style={styles.tableRow}>
    <View style={[styles.tableCellHeader, styles.leftCell]}>
      <Text>Item Weight</Text>
    </View>
    <View style={[styles.tableCell, styles.rightCell]}>
      <Text>1 kg 300 g</Text>
    </View>
  </View>
</View>


    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#f9f9f9',
    paddingTop: 27,

  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#6200ee",
  },
  cartIcon: {
    marginLeft: 20,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: "auto",
  },
  swiper: {
    height: 300,
  },
  productImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  bestSellerTag: {
    backgroundColor: "#00c853",
    color: "white",
    textAlign: "center",
    padding: 5,
    margin: 10,
    fontWeight: "bold",
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 10,
  },
  discountText: {
    fontSize: 16,
    color: "#d50000",
    marginLeft: 10,
  },
  originalPrice: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  iconRow: {
    flexDirection: "row",
    marginLeft: 10,
    marginVertical: 5,
  },
  shareIcon: {
    marginLeft: 20,
  },
  orderInfo: {
    margin: 10,
    color: "gray",
  },
  sellerTitle: {
    margin: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  sellerProductTitle: {
    marginHorizontal: 10,
    fontSize: 14,
    color: "black",
  },
  rating: {
    marginHorizontal: 10,
    color: "green",
  },
  offerTag: {
    margin: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#6200ee",
  },

  offerDiscount: {
    marginLeft: 10,
    fontSize: 16,
    color: "#d50000",
  },

  deliveryInfo: {
    margin: 10,
    color: "green",
  },
  emiText: {
    margin: 10,
    color: "gray",
  },
  link: {
    color: "#6200ee",
    textDecorationLine: "underline",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  emiButton: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
    marginRight: 5,
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: "#ffd600",
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
    marginLeft: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },

  buttonSubText: {
    fontSize: 12,
    color: "gray",
  },
  tableHeading: {
    margin: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  tableContainer: {
    margin: 10,
    borderRadius: 5,
    overflow: "hidden",
    borderColor: "#ddd",
    borderWidth: 1,
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  tableCellHeader: {
    flex: 1,
    padding: 10,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  tableCell: {
    flex: 2,
    padding: 10,
    color: "#555",
    textAlign: "left",
  },
  leftCell: {
    backgroundColor: "#f0f0f0",
    borderRightWidth: 1,
    borderRightColor: "#d0d0d0",
  },
  rightCell: {
    backgroundColor: "#ffffff",
  },


});
