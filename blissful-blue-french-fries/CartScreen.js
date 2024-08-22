import React, { useContext, useState } from 'react';
import { View, Text, Button, FlatList, Image, StyleSheet, TextInput, Alert } from 'react-native';
import { CartContext } from './contexts';

const CartScreen = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalCost } = useContext(CartContext);

  const [quantities, setQuantities] = useState(cartItems.reduce((acc, item) => {
    acc[item.id] = item.quantity; 
    return acc;
  }, {}));

  const handleQuantityChange = (id, value) => {
    const quantity = parseInt(value, 10) || 0; 
    setQuantities(prevQuantities => ({ ...prevQuantities, [id]: quantity }));
    updateQuantity(id, quantity);
  };

  const handleCheckout = () => {
    Alert.alert(
      "Checkout",
      "Are you sure you want to proceed to checkout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            clearCart();
            Alert.alert("Cart cleared and checkout completed!");
          }
        }
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.itemImage} />
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>R{item.price.toFixed(2)}</Text>
      <TextInput
        style={styles.quantityInput}
        keyboardType="numeric"
        value={quantities[item.id]?.toString() || '0'}
        onChangeText={(value) => handleQuantityChange(item.id, value)}
      />
      <Button title="Remove" onPress={() => removeFromCart(item.id)} color="red" />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <Text style={styles.totalCost}>Total: R{totalCost.toFixed(2)}</Text>
      <Button title="Checkout" onPress={handleCheckout} color="green" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  listContainer: { paddingBottom: 20 },
  itemContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 15, 
    padding: 10, 
    backgroundColor: '#f9f9f9', 
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  itemImage: { width: 80, height: 80, marginRight: 10 },
  itemName: { fontSize: 16, fontWeight: 'bold', flex: 1 },
  itemPrice: { fontSize: 14, marginRight: 10 },
  quantityInput: { 
    width: 50, 
    height: 40, 
    borderColor: '#ccc', 
    borderWidth: 1, 
    marginRight: 10, 
    textAlign: 'center' 
  },
  totalCost: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginTop: 20, 
    textAlign: 'center' 
  },
});

export default CartScreen;
