import React from 'react';
import { View, Text, Button, FlatList, Image, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CartContext } from './contexts';

const foodItems = [
  { id: '1', name: 'Pizza', description: 'Delicious cheese pizza', price: 280, image: require('./assets/pizza.jpeg') },
  { id: '2', name: 'Burger', description: 'Juicy beef burger', price: 250, image: require('./assets/burger.jpeg') },
  { id: '3', name: 'Pasta', description: 'Creamy Alfredo pasta', price: 120, image: require('./assets/pasta.jpeg') },
  { id: '4', name: 'Chicken', description: 'Finger licking good', price: 450, image: require('./assets/chicken.jpeg') },
  { id: '5', name: 'Sushi', description: 'Delicious sushi rolls', price: 175, image: require('./assets/sushi.jpeg') },
  { id: '6', name: 'Ice Cream', description: 'Vanilla ice cream', price: 120, image: require('./assets/icecream.jpeg') },
  
];

const MenuScreen = () => {
  const { addToCart } = React.useContext(CartContext);
  const navigation = useNavigation(); 

  const handleAddToCart = (item) => {
    addToCart(item);
    Alert.alert(`${item.name} added to cart!`);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.itemImage} />
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemDescription}>{item.description}</Text>
      <Text style={styles.itemPrice}>R{item.price}</Text>
      <Button 
        title="Add to Cart" 
        onPress={() => handleAddToCart(item)} 
        color="blue"
      />
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={foodItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      />
      <Button
        title="Go to Cart"
        onPress={() => navigation.navigate('Cart')}
        color="blue"
      />
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile')}
      />
      <Button
        title="Go to Form1"
        onPress={() => navigation.navigate('Form1')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: { paddingHorizontal: 10, paddingTop: 20 },
  itemContainer: { 
    flex: 1, 
    padding: 10, 
    alignItems: 'center', 
    margin: 5, 
    backgroundColor: '#f9f9f9', 
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  itemImage: { width: 100, height: 100, marginBottom: 10 },
  itemName: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  itemDescription: { fontSize: 12, color: 'gray', textAlign: 'center', marginBottom: 5 },
  itemPrice: { fontSize: 14, marginVertical: 5, fontWeight: 'bold' },
});

export default MenuScreen;
