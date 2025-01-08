import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { faqData } from '../utils/data';

const FAQScreen = () => {
  const [faqs, setFaqs] = useState(
    faqData.map((faq) => ({ ...faq, isOpen: false }))
  );
  const handleToggle = (index) => {
    setFaqs((prevFaqs) =>
      prevFaqs.map((faq, i) => ({
        ...faq,
        isOpen: i === index ? !faq.isOpen : faq.isOpen,
      }))
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>FAQ</Text>
      </View>
      {faqs.map((faq, index) => (
        <View key={index} style={styles.faqContainer}>
          <TouchableOpacity onPress={() => handleToggle(index)}>
            <View style={styles.faq}>
              <Text style={styles.question}>{faq.question}</Text>
              <FontAwesome name={faq.isOpen ? 'chevron-up' : 'chevron-down'} size={20} color="#2C2929" />
            </View>
          </TouchableOpacity>
          {faq.isOpen && <Text style={styles.answer}>{faq.answer}</Text>}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f9f9f9',
  },
  header: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    
    marginBottom: 15,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C2929',
    textAlign: 'left',
    paddingHorizontal: 10
  },
  faqContainer: {
    marginBottom: 15,
  },
  faq: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#7041EE',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#7041EE',
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
  },
  answer: {
    fontSize: 16,
    color: '#2C2929',
    padding: 10,
    backgroundColor: '#ABA9A9',
    borderRadius: 5,
    marginTop: 5,
  },
});

export default FAQScreen;
