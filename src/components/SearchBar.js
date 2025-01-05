import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // Ensure you have react-native-vector-icons installed

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSortModalVisible, setSortModalVisible] = useState(false);
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);

  const sortOptions = ["Price: Low to High", "Price: High to Low", "Newest Arrivals"];
  const filterOptions = ["Category", "Brand", "Rating", "Price Range"];

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Handle search logic here (e.g., API call or filtering the list)
  };

  const applySort = (option) => {
    console.log(`Sort applied: ${option}`);
    setSortModalVisible(false);
    // Handle sort logic here
  };

  const applyFilter = (option) => {
    console.log(`Filter applied: ${option}`);
    setFilterModalVisible(false);
    // Handle filter logic here
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="search" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Sort and Filter Buttons */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => setSortModalVisible(true)}
        >
          <Icon name="funnel" size={18} color="#000" />
          <Text style={styles.optionText}>Sort By</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => setFilterModalVisible(true)}
        >
          <Icon name="options" size={18} color="#000" />
          <Text style={styles.optionText}>Filter</Text>
        </TouchableOpacity>
      </View>

      {/* Sort Modal */}
      <Modal
        visible={isSortModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setSortModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setSortModalVisible(false)}
          >
            <Icon name="close" size={24} color="#fff" />
          </TouchableOpacity>
          <FlatList
            data={sortOptions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => applySort(item)}
              >
                <Text style={styles.modalText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>

      {/* Filter Modal */}
      <Modal
        visible={isFilterModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setFilterModalVisible(false)}
          >
            <Icon name="close" size={24} color="#fff" />
          </TouchableOpacity>
          <FlatList
            data={filterOptions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => applyFilter(item)}
              >
                <Text style={styles.modalText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#8D67F1",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
  },
  iconButton: {
    marginLeft: 10,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    padding: 10,
  },
  optionText: {
    marginLeft: 5,
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },
  closeButton: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  modalItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
  },
});

export default SearchBar;
