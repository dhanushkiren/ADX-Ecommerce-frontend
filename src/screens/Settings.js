import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SettingsPage = () => {
  const [isNotificationEnabled, setNotificationEnabled] = useState(false);

  const toggleSwitch = () => setNotificationEnabled((previousState) => !previousState);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="white" />
        <TextInput style={styles.searchBar} placeholder="Search" placeholderTextColor="gray" />
        <Ionicons name="menu" size={24} color="white" />
      </View>

      {/* Title */}
      <Text style={styles.title}>Settings</Text>

      {/* Notification Section */}
      <View style={styles.optionRow}>
        <Ionicons name="notifications-outline" size={24} color="black" />
        <Text style={styles.optionText}>Notification</Text>
        <Switch
          trackColor={{ false: '#ccc', true: '#8e44ad' }}
          thumbColor={isNotificationEnabled ? '#ffffff' : '#ffffff'}
          ios_backgroundColor="#ccc"
          onValueChange={toggleSwitch}
          value={isNotificationEnabled}
        />
      </View>

      {/* About Section */}
      <View style={styles.optionRow}>
        <Text style={styles.optionText}>About</Text>
        <Ionicons name="chevron-down" size={24} color="black" />
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>LogOut</Text>
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <Ionicons name="home-outline" size={24} color="white" />
        <Ionicons name="search-outline" size={24} color="white" />
        <Ionicons name="cart-outline" size={24} color="white" />
        <Ionicons name="person-outline" size={24} color="white" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8e44ad',
    padding: 10,
    justifyContent: 'space-between',
  },
  searchBar: {
    flex: 1,
    backgroundColor: 'white',
    marginHorizontal: 10,
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 35,
    color: 'black',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  optionText: {
    fontSize: 16,
    flex: 1,
    marginLeft: 10,
  },
  logoutButton: {
    backgroundColor: '#f8d7da',
    padding: 15,
    borderRadius: 20,
    marginHorizontal: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutText: {
    color: '#c0392b',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#8e44ad',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});

export default SettingsPage;
