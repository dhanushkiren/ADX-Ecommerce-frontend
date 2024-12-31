import React, { useRef }  from 'react';
import { View, TextInput, StyleSheet, Image, KeyboardAvoidingView, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SearchBar = () => {
  const inputRef = useRef(null); // Create a ref for the TextInput

  const handleFocus = () => {
    inputRef.current.focus(); // Focus the TextInput programmatically
  };
    return (
      <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjusts for iOS or Android
    >
      <View style={styles.searchContainer}>
        <Image source={require('../../../assets/search.png')} style={styles.searchIcon} resizeMode="center" />
        <TextInput
        ref={inputRef} // Assign the ref to the TextInput
          style={styles.searchInput}
          placeholder="Search"
          onFocus={handleFocus} // Trigger focus on tap
          placeholderTextColor="#888"
        />
      </View>
    </KeyboardAvoidingView>
    );
  };

  const styles = StyleSheet.create({
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#f0f0f0', // Light grey background
      borderRadius: 10, // Rounded corners
      paddingHorizontal: 15,
      width: '80%',
      height: 40,
    },
    searchIcon: {
      marginRight: 10,
      width: 18,
      height: 18, // Space between icon and input
    },
    searchInput: {
      flex: 1, // Take remaining space
      fontSize: 16,
      color: '#333',
    },
  });
  export default SearchBar;