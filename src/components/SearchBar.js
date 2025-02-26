import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { prodCategories, filterData, searchProducts } from "../utils/data";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileRequest } from "../redux/editprofile/slice";
import { retrieveData } from "../utils/asyncStorage";
const { height } = Dimensions.get("window");

const SearchBar = ({ routeName, name }) => {
  const dispatch = useDispatch();
  const route = useRoute();
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState(name);
  const [recentSearches, setRecentSearches] = useState([]);
  const [userId, setUserId] = useState(null);
  const userProfile = useSelector((state) => state.editProfile.originalProfile);

  const handleSearch = (text) => {
    setSearchQuery(text);
    // if (onSearch) {
    //   onSearch(text); // Trigger the search callback if provided
    // }
  };
  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      const updatedRecentSearches = [searchQuery, ...recentSearches.filter((item) => item !== searchQuery)];
      setRecentSearches(updatedRecentSearches);
      navigation.navigate("product", { searchQuery }); // Navigate to the product screen
    }
  };
  useEffect(() => {
    const getUserId = async () => {
      try {
        const storedUserId = await retrieveData("userId");
        if (storedUserId) {
          setUserId(storedUserId);
        } else {
          Alert.alert("Error", "User ID not found in storage.");
        }
      } catch (error) {
        console.error("Error fetching userId:", error);
        Alert.alert("Error", "Failed to load user data.");
      }
    };

    getUserId();
  }, []);
  useEffect(() => {
    if (userId) {
      dispatch(fetchProfileRequest({ userId }));
    }
  }, [userId, dispatch]);

  // Logging for debugging
  useEffect(() => {
    console.log("User profile data:", userProfile);
  }, [userProfile]);

  // Handle address formatting safely
  const userAddress =
    userProfile?.addresses?.length > 0
      ? userProfile.addresses.map((addr) => addr.street || "").filter(Boolean).join(", ")
      : "No address available";
  // console.log("dkdk route: ", route.name);

  const [isSortVisible, setSortVisible] = useState(false);
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = useState("");
  const sortTranslateY = useState(new Animated.Value(height))[0];
  const filterTranslateY = useState(new Animated.Value(height))[0];
  const [selectedCategory, setSelectedCategory] = useState("Brands");

  const openSortModal = () => {
    setSortVisible(true);
    Animated.timing(sortTranslateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeSortModal = () => {
    Animated.timing(sortTranslateY, {
      toValue: height,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setSortVisible(false));
  };

  const openFilterModal = () => {
    setFilterVisible(true);
    Animated.timing(filterTranslateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeFilterModal = () => {
    Animated.timing(filterTranslateY, {
      toValue: height,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setFilterVisible(false));
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate('home')}>
  <Icon name="arrow-back" size={24} color="#fff" />
</TouchableOpacity>

        <View style={styles.searchInput}  >
          <Icon name="search" size={24} color="#ccc" style={styles.icon} />
          <TextInput
            onPress={() => navigation.navigate("SearchResults", { recentSearches })}
            placeholder="Search products..."
            placeholderTextColor="#aaa"
            value={searchQuery}
            onChangeText={handleSearch}
            onSubmitEditing={handleSearchSubmit}
          />
        </View>
        {routeName === "product" && (
          <View style={styles.iconsContainer}>
            <TouchableOpacity onPress={openFilterModal}>
              <Icon
                name="filter-list"
                size={26}
                color="#fff"
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={openSortModal}>
              <Icon
                name="swap-vert"
                size={26}
                color="#fff"
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.location}>
        <Icon name="location-on" size={24} color="#fff" style={styles.icon} />
        <Text style={styles.locationText}>{userAddress}</Text>
      </View>

      {(isSortVisible || isFilterVisible) && (
        <TouchableWithoutFeedback
          onPress={() => {
            if (isSortVisible) closeSortModal();
            if (isFilterVisible) closeFilterModal();
          }}
        >
          <View style={styles.dimmedBackground} />
        </TouchableWithoutFeedback>
      )}

      {/* Sort Modal */}
      {isSortVisible && (
        <Modal
          style={[
            styles.animatedModal,
            { transform: [{ translateY: sortTranslateY }],
            zIndex: 100, // Ensure it's above other elements
            elevation: 10, },
          ]}
        >
          <TouchableOpacity style={styles.closeButton} onPress={closeSortModal}>
            <Icon name="close" size={24} color="#6200ee" />
          </TouchableOpacity>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Sort by</Text>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => setSelectedSortOption("A - Z")}
            >
              <View style={styles.radioButtonContainer}>
                <View
                  style={
                    selectedSortOption === "A - Z"
                      ? styles.radioButtonSelected
                      : styles.radioButton
                  }
                />
                <Text style={styles.radioButtonLabel}>A - Z</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => setSelectedSortOption("Z - A")}
            >
              <View style={styles.radioButtonContainer}>
                <View
                  style={
                    selectedSortOption === "Z - A"
                      ? styles.radioButtonSelected
                      : styles.radioButton
                  }
                />
                <Text style={styles.radioButtonLabel}>Z - A</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => setSelectedSortOption("Price (Low to High)")}
            >
              <View style={styles.radioButtonContainer}>
                <View
                  style={
                    selectedSortOption === "Price (Low to High)"
                      ? styles.radioButtonSelected
                      : styles.radioButton
                  }
                />
                <Text style={styles.radioButtonLabel}>Price (Low to High)</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => setSelectedSortOption("Price (High to Low)")}
            >
              <View style={styles.radioButtonContainer}>
                <View
                  style={
                    selectedSortOption === "Price (High to Low)"
                      ? styles.radioButtonSelected
                      : styles.radioButton
                  }
                />
                <Text style={styles.radioButtonLabel}>Price (High to Low)</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={closeSortModal}
            >
              <Text style={styles.modalButtonText}>Show results</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}

      {isFilterVisible && (
        <Modal
          style={[
            styles.animatedModal,
            { transform: [{ translateY: filterTranslateY }],
            zIndex: 100, // Ensure it's above other elements
            elevation: 10, },
          ]}
        >
          <TouchableOpacity
            style={styles.closeButton}
            onPress={closeFilterModal}
          >
            <Icon name="close" size={24} color="#6200ee" />
          </TouchableOpacity>
          <Text style={styles.filterTitle}>Filter by</Text>
          <View style={styles.filterContainer}>
            <View style={styles.sidebar}>
              {prodCategories.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryItem,
                    selectedCategory === category &&
                      styles.selectedCategoryItem,
                  ]}
                  onPress={() => setSelectedCategory(category)}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      selectedCategory === category &&
                        styles.selectedCategoryText,
                    ]}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.optionsPanel}>
              <Text style={styles.optionsTitle}>{selectedCategory}</Text>
              <ScrollView>
                {filterData[selectedCategory].map((option, index) => (
                  <TouchableOpacity key={index} style={styles.optionItem}>
                    <Text>{option}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
          <View style={styles.modalActions}>
            <TouchableOpacity onPress={closeFilterModal}>
              <Text style={styles.clearFilterText}>Clear filter</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={closeFilterModal}
            >
              <Text style={styles.modalButtonText}>Show results</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
  },
  iconsContainer: {
    flexDirection: "row",
    marginLeft: 10,
  },
  locationText: {
    padding: 5,
    backgroundColor: "#8D67F1",
    color: "#fff",
  },
  location: {
    padding: 5,
    backgroundColor: "#8D67F1",
    fontSize: 14,
    paddingBottom: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6200ee",
    padding: 10,
    marginTop: 20,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#6200ee",
    borderRadius: 20,
    paddingHorizontal: 10,
    color: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#fff",
    flexDirection: "row",
    height: 40,
    marginRight: 20,
    marginLeft: 20,
    alignItems: "center",
  },
  searchInputText: {
    color: "#ccc",
    fontSize: 15,
    marginLeft: 5,
  },
  dimmedBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 10,
  },
  animatedModal: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "65%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
    zIndex: 100, // Ensure it's above other elements
      elevation: 10,
  },
  modalContent: {
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalOption: {
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  modalButton: {
    backgroundColor: "#6200ee",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  filterCategory: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
  filterOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  filterContainer: {
    flex: 1,
    flexDirection: "row",
  },
  sidebar: {
    width: "40%",
    backgroundColor: "#f0f0f0",
    paddingVertical: 5,
  },
  categoryItem: {
    padding: 15,
    borderWidth: 0.5,
    borderColor: "#ccc",
  },
  selectedCategoryItem: {
    backgroundColor: "#6200ee",
  },
  categoryText: {
    fontSize: 13,
    color: "#000",
  },
  selectedCategoryText: {
    color: "#fff",
  },
  optionsPanel: {
    flex: 1,
    padding: 15,
    marginBottom: 20,
  },
  optionsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "flex-start",
    marginTop: 10,
  },
  optionItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginLeft: 10,
    marginRight: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#6200ee",
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  optionText: {
    fontSize: 14,
    color: "#6200ee",
    fontWeight: "500",
  },
  filterTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 15,
    marginLeft: 20,
  },
  filterChip: {
    backgroundColor: "#eee",
    padding: 8,
    borderRadius: 16,
    margin: 5,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#f5f5f5",
  },
  clearFilterText: {
    color: "#6200ee",
    fontWeight: "bold",
  },
  modalButton: {
    backgroundColor: "#6200ee",
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#6200ee",
    marginRight: 10,
  },
  radioButtonSelected: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#6200ee",
    marginRight: 10,
  },
  radioButtonLabel: {
    fontSize: 16,
    color: "#000",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 12,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 5,
    elevation: 5,
  },
});

export default SearchBar;
