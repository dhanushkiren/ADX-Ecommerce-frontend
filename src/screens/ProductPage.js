import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Share,
} from "react-native";
import { Alert } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { productImages, productDetails } from "../utils/data"; 
import { useDispatch } from 'react-redux'; 
import { addToCartRequest } from "../redux/cart/cartSlice";

export default function ProductPage({ route, navigation }) { // Added route prop
  const { product } = route.params; 
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    console.log(21,product)
    const productData = {
      productId: product.id,
      productName: product.name,
      price: product.price,
      quantity: 1, // Default quantity when adding to cart

      imageUrl: product.imageUrl,
      userId:"1",
    };

    dispatch(addToCartRequest({userId:"1",productData:productData})); // Dispatch action

    Alert.alert("Success", product.name + " added to cart!");

  };

  // Function to generate shareable content
  const generateShareableContent = (product) => {
    return `🌟 ${product.title} 🌟

🔥 ${product.bestsellerTag || "Limited Offer!"}
💸 Price: ${product.originalPrice} 👉 ${product.discountedPrice}

📦 ${product.deliveryInfo}
🛒 ${product.orderInfo}

👉 Check it out here: ${product.link || "https://example.com"}
    `;
  };

  // Share function
  const onShare = async () => {
    try {
      const shareMessage = generateShareableContent(productDetails); // Use the generated content
      const result = await Share.share({
        message: shareMessage,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("Shared with activity type: ", result.activityType);
        } else {
          console.log("Shared successfully");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Share dismissed");
      }
    } catch (error) {
      console.error("Error sharing product:", error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.iconContainer}>
          <Icon name="search" size={24} color="white" />
          <TouchableOpacity onPress={() => navigation.navigate("cart")}>
            <Icon name="cart" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <Image source={{ uri: product.imageUrl }} style={styles.productImage} />

      
        {/* Bestseller Tag */}
      <Text style={styles.bestSellerTag}>{productDetails.bestsellerTag}</Text>
      <View style={styles.productDetailsContainer}>
        <Text style={styles.productTitle}>{product.name}</Text>
        <Text style={styles.discountText}>Price: ₹{product.price}</Text>
        <Text style={styles.orderInfo}>In-Stock: {product.stock}</Text>
        <Text style={styles.sellerTitle}>Seller: {product.sellerName}</Text>
        <Text style={styles.sellerTitle}>Category: {product.categoryName}</Text>

        <View style={styles.iconRow}>
          <Icon name="heart-outline" size={24} color="red" />
          <TouchableOpacity onPress={onShare}>
            <Icon name="share-outline" size={24} color="black" style={styles.shareIcon} />
          </TouchableOpacity>
        </View>

        {/* Order Info */}
      <Text style={styles.orderInfo}>{productDetails.orderInfo}</Text>

        {/* Seller Info */}
        {/* <Text style={styles.sellerTitle}>{productDetails.sellerInfo.title}</Text>
        <Text style={styles.sellerProductTitle}>
          {productDetails.sellerInfo.productTitle} */}
        {/* </Text> */}
        <Text style={styles.rating}>{productDetails.sellerInfo.rating}</Text>

        {/* Offer Section */}
        <Text style={styles.offerTag}>{productDetails.offerTag}</Text>
        <Text style={styles.deliveryInfo}>{productDetails.deliveryInfo}</Text>

        {/* EMI Section */}
        {productDetails.emiInfo.map((emi, index) => (
          <Text key={index} style={styles.emiText}>
            {emi}
          </Text>
        ))}

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.emiButton} onPress={handleAddToCart}>
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
          {productDetails.technicalDetails.map((detail, index) => (
            <View key={index} style={styles.tableRow}>
              <View style={[styles.tableCellHeader, styles.leftCell]}>
                <Text>{detail.key}</Text>
              </View>
              <View style={[styles.tableCell, styles.rightCell]}>
                <Text>{detail.value}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingTop: 27,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#6200ee",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
  },
  productImage: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
  },
  productDetailsContainer: {
    padding: 10,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5,
  },
  discountText: {
    fontSize: 16,
    color: "#d50000",
    marginVertical: 5,
  },
  orderInfo: {
    marginVertical: 5,
    color: "gray",
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
  sellerTitle: {
    marginVertical: 5,
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
  iconRow: {
    flexDirection: "row",
    marginVertical: 10,
  },
  shareIcon: {
    marginLeft: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
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
  tableHeading: {
    marginVertical: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  tableContainer: {
    marginVertical: 10,
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