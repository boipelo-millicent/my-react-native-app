
import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import { UserContext, ThemeContext } from './contexts';

const ProfileScreen = () => {
  const { user } = useContext(UserContext);
  const { theme, setTheme } = useContext(ThemeContext);

  const handleTextColorChange = (color) => {
    setTheme(prev => ({ ...prev, textColor: color }));
  };

  const handleBackgroundColorChange = (color) => {
    setTheme(prev => ({ ...prev, backgroundColor: color }));
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={styles.card}>
        <Text style={[styles.cardTitle, { color: theme.textColor }]}>Name:</Text>
        <Text style={[styles.cardText, { color: theme.textColor }]}>{user.name || 'Not available'}</Text>
      </View>
      <View style={styles.card}>
        <Text style={[styles.cardTitle, { color: theme.textColor }]}>Email:</Text>
        <Text style={[styles.cardText, { color: theme.textColor }]}>{user.email || 'Not available'}</Text>
      </View>
      <View style={styles.card}>
        <Text style={[styles.cardTitle, { color: theme.textColor }]}>Phone:</Text>
        <Text style={[styles.cardText, { color: theme.textColor }]}>{user.phone || 'Not available'}</Text>
      </View>
      <View style={styles.card}>
        <Text style={[styles.cardTitle, { color: theme.textColor }]}>Address:</Text>
        <Text style={[styles.cardText, { color: theme.textColor }]}>{user.address || 'Not available'}</Text>
      </View>
      {}
      <TextInput
        style={[styles.input, { borderColor: theme.textColor }]}
        placeholder="Text Color"
        onChangeText={handleTextColorChange}
      />
      <TextInput
        style={[styles.input, { borderColor: theme.textColor }]}
        placeholder="Background Color"
        onChangeText={handleBackgroundColorChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  card: { marginBottom: 15, padding: 10, backgroundColor: '#fff', borderRadius: 5 },
  cardTitle: { fontSize: 18, fontWeight: 'bold' },
  cardText: { fontSize: 16 },
  input: { borderBottomWidth: 1, marginBottom: 15 }
});

export default ProfileScreen;

