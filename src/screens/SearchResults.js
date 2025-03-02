import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Keyboard,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

const SearchResults = ({ navigation, route }) => {
  const [recentSearches, setRecentSearches] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAll, setShowAll] = useState(false);

  // Load recent searches from AsyncStorage when the component mounts
  useEffect(() => {
    const loadRecentSearches = async () => {
      const savedSearches = await AsyncStorage.getItem("recentSearches");
      if (savedSearches) {
        setRecentSearches(JSON.parse(savedSearches));
      }
    };
    loadRecentSearches();
  }, []);

  const handleSearch = async (query = searchQuery) => {
    if (query.trim()) {
      let updatedSearches = [...recentSearches];
      const existingIndex = updatedSearches.indexOf(query);
      if (existingIndex !== -1) {
        updatedSearches.splice(existingIndex, 1);
      }
      updatedSearches = [query, ...updatedSearches.slice(0, 9)]; // Keep max 10 recent searches

      setRecentSearches(updatedSearches);
      await AsyncStorage.setItem("recentSearches", JSON.stringify(updatedSearches));

      setSearchQuery("");
      Keyboard.dismiss();
      navigation.navigate("searchlist", { searchQuery: query });
    }
  };

  const removeSearchItem = async (item) => {
    const filteredSearches = recentSearches.filter((search) => search !== item);
    setRecentSearches(filteredSearches);
    await AsyncStorage.setItem("recentSearches", JSON.stringify(filteredSearches));
  };

  const displayedSearches = showAll ? recentSearches : recentSearches.slice(0, 3);

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={20} color="#555" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
          returnKeyType="search"
          onSubmitEditing={() => handleSearch()} 
        />
      </View>

      {/* Recent Searches List */}
      <FlatList
        data={displayedSearches}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View>
            <View style={styles.searchItem}>
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => handleSearch(item)}
              >
                <Text style={styles.searchText}>{item}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => removeSearchItem(item)}>
                <Ionicons name="close-outline" size={20} color="#555" />
              </TouchableOpacity>
            </View>
            {index === displayedSearches.length - 1 && recentSearches.length > 3 && (
              <TouchableOpacity onPress={() => setShowAll(!showAll)}>
                <Text style={styles.viewMoreText}>{showAll ? "View Less" : "View More"}</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No recent searches</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    padding: 10,
    paddingTop: 35,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  searchItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  searchText: {
    fontSize: 16,
    color: "#007AFF",
  },
  emptyText: {
    textAlign: "center",
    color: "#888",
    marginTop: 20,
  },
  viewMoreText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
  },
});

export default SearchResults;
