import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Share,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch } from "react-redux";
import { addToCartRequest } from "../redux/cart/cartSlice";
import { retrieveData } from "../utils/asyncStorage";

export default function ProductPage({ route, navigation }) {
  const { product } = route.params;
  console.log({product});
  const [userID, setUserID] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedRam, setSelectedRam] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(null);


  useEffect(() => {
    const getUserId = async () => {
      const storedUserId = await retrieveData("userId");
      setUserID(storedUserId);
    };
    getUserId();
  }, []);

  const dispatch = useDispatch();


  const handleAddToCart = () => {
    console.log("Add to Cart triggered"); //First check
    if (!userID) {
      Alert.alert("Login Required", "You need to log in to add products to the cart.");
      console.log("Login Required", "You need to log in to add products to the cart.");
      return;
    }
  
    const isMobileCategory =
      product.categoryName === "androidMobile" || product.categoryName === "IosMobile";
  
    const isSizeCategory =
      product.categoryName === "clothes" || product.categoryName === "shoes";
  
    //Validation
    if (isMobileCategory && (!selectedRam || !selectedStorage)) {
      Alert.alert("Selection Required", "Please select both RAM and Storage.");
      return;
    }
  
    if (isSizeCategory && !selectedSize) {
      Alert.alert("Selection Required", "Please select a size.");
      return;
    }
  
    const productData = {
      productId: product.id,
      productName: product.name,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrl,
      ...(isMobileCategory && { ram: selectedRam, storage: selectedStorage }),
      ...(isSizeCategory && { size: selectedSize }),
    };
  
    dispatch(addToCartRequest({ userId: userID, productData }));
    Alert.alert("Success", product.name + " added to cart!");
  };
  
  
  

  const generateShareableContent = () => {
    return `🌟 ${product.name} 🌟

💸 Price: ₹${product.price}
🛒 In Stock: ${product.stock}
👉 Check it out here: ${product.link || "https://example.com"}`;
  };

  const onShare = async () => {
    try {
      await Share.share({ message: generateShareableContent() });
    } catch (error) {
      console.error("Error sharing product:", error.message);
    }
  };

  const renderSizes = () => {
    // Define the size options based on categories
    const isSizeAvailable = product.categoryName === "clothes" || product.categoryName === "shoes";
    const sizes = product.categoryName === "shoes" ? [6, 7, 8, 9, 10, 11] : ["S", "M", "L", "XL","XXL"];
  
    // Conditional rendering
    if (!isSizeAvailable) return null;
  
    return (
      <View style={styles.sizeContainer}>
        <View style={styles.sizeHeader}>
          <Text style={styles.sizeTitle}>Size- UK/India</Text>
          <TouchableOpacity>
            <Text style={styles.sizeChart}>Size Chart</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.sizes}>
          {sizes.map((size, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.sizeButton,
                selectedSize === size && styles.sizeButtonSelected,
              ]}
              onPress={() => setSelectedSize(size)}
            >
              <Text
                style={[
                  styles.sizeText,
                  selectedSize === size && { color: "white" },
                ]}
              >
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const renderVariants = () => {
    const isAndroid = product.categoryName === "androidMobile";
    const isIos = product.categoryName === "IosMobile";
  
    if (!isAndroid && !isIos) return null;
  
    const ramOptions = ["4GB", "6GB", "8GB"];
    const storageOptions = ["64GB", "128GB", "256GB"];
  
    return (
      <View style={styles.variantContainer}>
        <Text style={styles.variantTitle}>Select Variant</Text>
  
        {/* Show RAM only for Android Mobiles */}
        {isAndroid && (
          <>
            <Text style={styles.variantLabel}>RAM</Text>
            <View style={styles.variantOptions}>
              {ramOptions.map((ram, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.variantButton,
                    selectedRam === ram && styles.variantButtonSelected,
                  ]}
                  onPress={() => setSelectedRam(ram)}
                >
                  <Text
                    style={[
                      styles.variantText,
                      selectedRam === ram && { color: "white" },
                    ]}
                  >
                    {ram}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}
  
        {/* Storage for both Android and iOS */}
        <Text style={styles.variantLabel}>Storage</Text>
        <View style={styles.variantOptions}>
          {storageOptions.map((storage, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.variantButton,
                selectedStorage === storage && styles.variantButtonSelected,
              ]}
              onPress={() => setSelectedStorage(storage)}
            >
              <Text
                style={[
                  styles.variantText,
                  selectedStorage === storage && { color: "white" },
                ]}
              >
                {storage}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };
  
  

  return (
    <>
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


        <View style={styles.productDetailsContainer}>
          <View style={styles.titleRow}>
            <Text style={styles.productTitle}>{product.name}</Text>
            <View style={styles.iconRow}>
              <Icon name="heart-outline" size={24} color="red" />
              <TouchableOpacity onPress={onShare}>
                <Icon name="share-outline" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.discountText}>Price: ₹{product.price}</Text>
          <Text style={styles.orderInfo}>In-Stock: {product.stock}</Text>
          <Text style={styles.sellerTitle}>Seller: {product.sellerName}</Text>
          <Text style={styles.sellerTitle}>Category: {product.categoryName}</Text>

          {renderSizes()}

          {renderVariants()}


          <View style={styles.productDetails}>
            <Text style={styles.detailTitle}>Product Details</Text>

            {product.categoryName === "shoes" ? (
              <>
                <View style={styles.detailsRow}>
                  <Text style={styles.detailLabel}>Material</Text>
                  <Text style={styles.detailValue}>
                    {product.material || "Synthetic"}
                  </Text>
                </View>

                <View style={styles.detailsRow}>
                  <Text style={styles.detailLabel}>Closure Type</Text>
                  <Text style={styles.detailValue}>
                    {product.closureType || "Lace-Up"}
                  </Text>
                </View>

                <View style={styles.detailsRow}>
                  <Text style={styles.detailLabel}>Sole Material</Text>
                  <Text style={styles.detailValue}>
                    {product.soleMaterial || "Rubber"}
                  </Text>
                </View>
              </>
            ) : product.categoryName === "IosMobile" ||  product.categoryName === "androidMobile" ? (
              <>
                <View style={styles.detailsRow}>
                  <Text style={styles.detailLabel}>Processor</Text>
                  <Text style={styles.detailValue}>
                    {product.processor || "Not Specified"}
                  </Text>
                </View>

                <View style={styles.detailsRow}>
                  <Text style={styles.detailLabel}>RAM</Text>
                  <Text style={styles.detailValue}>
                    {product.ram || "Not Specified"}
                  </Text>
                </View>

                <View style={styles.detailsRow}>
                  <Text style={styles.detailLabel}>Storage</Text>
                  <Text style={styles.detailValue}>
                    {product.storage || "Not Specified"}
                  </Text>
                </View>
              </>
            ) : product.categoryName === "clothes" ? (
              <>
                <View style={styles.detailsRow}>
                  <Text style={styles.detailLabel}>Fabric</Text>
                  <Text style={styles.detailValue}>
                    {product.fabric || "Cotton"}
                  </Text>
                </View>

                <View style={styles.detailsRow}>
                  <Text style={styles.detailLabel}>Fit</Text>
                  <Text style={styles.detailValue}>
                    {product.fit || "Regular"}
                  </Text>
                </View>

                <View style={styles.detailsRow}>
                  <Text style={styles.detailLabel}>Pattern</Text>
                  <Text style={styles.detailValue}>
                    {product.pattern || "Solid"}
                  </Text>
                </View>
              </>
            ) : product.categoryName === "others" ? (
              <>
                <View style={styles.detailsRow}>
                  <Text style={styles.detailLabel}>Brand</Text>
                  <Text style={styles.detailValue}>{product.brand || "Generic"}</Text>
                </View>
          
                <View style={styles.detailsRow}>
                  <Text style={styles.detailLabel}>Model</Text>
                  <Text style={styles.detailValue}>{product.model || "Standard"}</Text>
                </View>
          
                <View style={styles.detailsRow}>
                  <Text style={styles.detailLabel}>Warranty</Text>
                  <Text style={styles.detailValue}>{product.warranty || "No Warranty"}</Text>
                </View>
              </>
            ): (
              <>
                <View style={styles.detailsRow}>
                  <Text style={styles.detailLabel}>Details</Text>
                  <Text style={styles.detailValue}>Not Available</Text>
                </View>
              </>
            )}
          </View>

        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.emiButton} onPress={handleAddToCart}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.buyNowButton}
            onPress={() => {
              const isMobileCategory =
                product.categoryName === "androidMobile" || product.categoryName === "IosMobile";
            
              const isSizeCategory =
                product.categoryName === "clothes" || product.categoryName === "shoes";
            
              // Validation
              if (isMobileCategory && (!selectedRam || !selectedStorage)) {
                Alert.alert("Selection Required", "Please select both RAM and Storage.");
                return;
              }
            
              if (isSizeCategory && !selectedSize) {
                Alert.alert("Selection Required", "Please select a size.");
                return;
              }
            
              const productData = {
                ...product,
                ...(isMobileCategory && { ram: selectedRam, storage: selectedStorage }),
                ...(isSizeCategory && { size: selectedSize }),
              };
            
              navigation.navigate("order checkout", { products: [productData] });
            }}
            
          >
            <Text style={styles.buttonText}>Buy Now</Text>
          </TouchableOpacity>

      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#f9f9f9", 
    paddingTop: 27 
  },

  header: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    padding: 10, 
    backgroundColor: "#6200ee" 
  },

  iconContainer: { 
    flexDirection: "row", 
    alignItems: "center", 
    marginLeft: "auto" 
  },

  productImage: { 
    width: "100%", 
    height: 300, 
    resizeMode: "contain",
    marginBottom: 10,
  },

  productDetailsContainer: { 
    padding: 10 
  },

  titleRow: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center" 
  },

  productTitle: { 
    fontSize: 18, 
    fontWeight: "bold", 
    marginVertical: 5 
  },

  iconRow: { 
    flexDirection: "row",
    gap: 12,
  },

  discountText: { 
    fontSize: 16, 
    color: "#d50000", 
    marginVertical: 5 
  },

  orderInfo: { 
    marginVertical: 5, 
    color: "gray" 
  },

  sellerTitle: { 
    marginVertical: 5, 
    fontSize: 16, 
    fontWeight: "bold" 
  },

  sizeContainer: {
    marginVertical: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  
  sizeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  
  sizeTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  
  sizeChart: {
    color: "#6200ee",
  },
  
  sizes: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  
  sizeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "gray",
    marginRight: 10,
    marginBottom: 10,
  },
  
  sizeButtonSelected: {
    backgroundColor: "#6200ee",
    borderColor: "#6200ee",
    
  },
  
  sizeText: {
    fontSize: 16,
  },
  

  productDetails: { 
    marginVertical: 10,   
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },

  detailTitle: { 
    fontSize: 18, 
    fontWeight: "bold", 
    marginBottom: 10, 
  },

  detailsRow: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    marginBottom: 5 
  },

  detailLabel: { 
    color: "gray" 
  },

  detailValue: {
    fontWeight: "bold" 
  },

  buttonContainer: { 
    flexDirection: "row", 
    padding: 15, 
    backgroundColor: "#fff", 
    borderTopWidth: 1, 
    borderColor: "#e0e0e0" 
  },

  emiButton: { 
    flex: 1, 
    backgroundColor: "#f0f0f0", 
    padding: 15, 
    alignItems: "center", 
    borderRadius: 5, 
    marginRight: 5 
  },

  buyNowButton: { 
    flex: 1, 
    backgroundColor: "#ffd600", 
    padding: 15, 
    alignItems: "center", 
    borderRadius: 5, 
    marginLeft: 5 
  },

  buttonText: { 
    fontSize: 16, 
    fontWeight: "bold" 
  },
  variantContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginVertical: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  
  variantTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  
  variantLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
    marginTop: 10,
    marginBottom: 6,
  },
  
  variantOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  
  variantButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 10,
    marginBottom: 10,
  },
  
  variantButtonSelected: {
    backgroundColor: "#6200ee",
    borderColor: "#6200ee",
  },
  
  variantText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },
  
});
