import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const FAQScreen = () => {
  const [faqs, setFaqs] = useState([
    {
      question: 'What is your return policy?',
      answer: 'We offer a hassle-free return policy. You can return any item within 30 days of receipt, provided it is unused and in its original packaging. For more details, visit our Returns & Refunds page.',
      isOpen: false,
    },
    {
      question: 'How do I track my order ?',
      answer: 'You can track your order by logging into your account, navigating to "My Orders," and selecting the order you would like to track. You will find the tracking details there.',
      isOpen: false,
    },
    {
      question: 'Can I change my order ?',
      answer: 'Changes to an order can be made before it is shipped. Please contact our customer support as soon as possible to update your order details.',
      isOpen: false,
    },

    {
      question: 'How do I cancel my order?',
      answer: 'You can cancel your order before it is shipped. Go to "My Orders," select the order, and click "Cancel."',
      isOpen: false,
    },
    {
      question: 'How long does delivery take?',
      answer: 'Delivery times depend on your location and the shipping method chosen during checkout. Standard delivery usually takes 5-7 business days.',
      isOpen: false,
    },
    {
      question: 'How do I contact customer support?',
      answer: 'You can contact us via email at support@example.com or call us at 1-800-123-4567. Our support team is available 24/7.',
      isOpen: false,
    },
    {
      question: 'What happens if an item is out of stock?',

      answer: 'You will be notified, and you can choose to wait for restocking or cancel the item.',
      isOpen: false,
    },
    {
      question: 'What do I do if I receive a damaged item?',
      answer: 'If you receive a damaged item, please contact customer support with your order details and a photo of the damaged item. We’ll assist you with a replacement or refund.',
      isOpen: false,
    },

    {
      question: 'What should I do if I forgot my password ?',
      answer: 'Click on the "Forgot Password" link on the login page, enter your registered eamil address, and follow the instructions to reset your password',
      isOpen: false,
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept major credit cards, debit cards, PayPal, and other online payment methods.',
      isOpen: false,
    },

    {
      question: 'Are my payment details secure ?',
      answer: 'Absolutely! We use industry-standard encryption to protect your payment information and ensure a secure shopping experience.',
      isOpen: false,
    },
    
    
    

    {
      question: 'How do I leave a review for a product?',
      answer: 'After receiving your order, you can log in to your account, go to "My Orders," and click "Write a Review" for the product you purchased.',
      isOpen: false,
    },
  ]);

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
  <TouchableOpacity onPress={() => console.log('Back button pressed')}>
    <FontAwesome name="arrow-left" size={24} color="#2C2929" style={styles.backIcon} />
  </TouchableOpacity>
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
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginBottom: 15,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C2929',
    marginLeft: 10,
    paddingHorizontal:1,
    paddingVertical:20,
    marginTop: 20,
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
  backIcon: {
    marginRight: 0,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  
});

export default FAQScreen;
