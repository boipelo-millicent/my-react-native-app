import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { UserContext } from './contexts';

const Form3Screen = ({ navigation }) => {
  const { setUser } = useContext(UserContext);
  const [creditCard, setCreditCard] = useState('');
  const [expDate, setExpDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleSubmit = () => {
    setUser(prev => ({
      ...prev,
      payment: { creditCard, expDate, cvv }
    }));
    navigation.navigate('Profile');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Credit Card Number"
        value={creditCard}
        onChangeText={setCreditCard}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Expiration Date (MM/YY)"
        value={expDate}
        onChangeText={setExpDate}
      />
      <TextInput
        style={styles.input}
        placeholder="CVV"
        value={cvv}
        onChangeText={setCvv}
        keyboardType="numeric"
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderBottomWidth: 1, marginBottom: 15 }
});

export default Form3Screen;
