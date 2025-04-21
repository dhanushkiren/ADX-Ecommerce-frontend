import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersRequest } from "../../redux/orders/ordersSlice";

const OrderhistoryComponent = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { orders, loading, error } = useSelector((state) => state.orders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchOrdersRequest());
  }, [dispatch]);

  const openOrderModal = (order) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedOrder(null);
  };

  const renderOrder = ({ item }) => (
    <TouchableOpacity onPress={() => openOrderModal(item)}>
      <View style={styles.card}>
        <View style={styles.details}>
          <Text style={styles.date}>
            Placed on {new Date(item.createdAt).toDateString()}
          </Text>
          <Text style={styles.price}>Total price: ₹{item.totalPrice}</Text>
          <Text>Status: {item.status}</Text>

          <View style={styles.ratingContainer}>
            <Text>Give Ratings </Text>
            {[...Array(5)].map((_, index) => (
              <TouchableOpacity key={index}>
                <Text style={styles.star}>{"☆"}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity>
            <Text style={styles.review}>Write a review</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.downloadButton}>
          <Text style={styles.downloadText}>Download invoice</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <FontAwesome name="arrow-left" size={24} color="#2C2929" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order History</Text>
      </View>

      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>Error: {error}</Text>
      ) : (
        <FlatList
          data={orders}
          renderItem={renderOrder}
          keyExtractor={(item, index) =>
            item.orderId ? item.orderId.toString() : index.toString()
          }
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>
                Order #{selectedOrder.orderId}
              </Text>

              <FlatList
                data={selectedOrder.orderItems}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={styles.productItem}>
                    <Text>Product ID: {item.productId}</Text>
                    <Text>Quantity: {item.quantity}</Text>
                  </View>
                )}
              />

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  console.log("Cancel order for ID:", selectedOrder.orderId);
                  // dispatch(cancelOrderRequest(selectedOrder.orderId)) - optional
                  closeModal();
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel Order</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={closeModal}
                style={{ marginTop: 10 }}
              >
                <Text style={{ textAlign: "center", color: "#007BFF" }}>
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingTop: 30,
    marginBottom: 65,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#2C2929",
  },
  card: {
    backgroundColor: "#f9f9f9",
    marginVertical: 10,
    padding: 10,
    borderRadius: 8,
    elevation: 3,
  },
  details: {
    marginTop: 5,
  },
  date: {
    fontSize: 12,
    color: "#666",
  },
  price: {
    marginVertical: 5,
    fontWeight: "bold",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  star: {
    fontSize: 18,
    marginHorizontal: 2,
    color: "#FFD700",
  },
  review: {
    color: "#007BFF",
    marginTop: 5,
  },
  downloadButton: {
    marginTop: 10,
    backgroundColor: "#7041EE",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  downloadText: {
    color: "#fff",
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  productItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 8,
  },
  cancelButton: {
    backgroundColor: "#FF5252",
    padding: 12,
    borderRadius: 5,
    marginTop: 10,
  },
  cancelButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default OrderhistoryComponent;
