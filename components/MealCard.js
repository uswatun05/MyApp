import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const MealCard = ({ meal }) => {
  const router = useRouter();

  const handlePress = () => {
    if (meal?.id) {
      router.push(`/detail/${meal.id}`);
    } else {
      console.warn('ID meal tidak ditemukan');
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Image
        source={{ uri: meal?.Image?.uri || 'https://via.placeholder.com/150' }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {meal?.namaResep || 'Nama Resep Tidak Ditemukan'}
        </Text>
        <Text style={styles.author} numberOfLines={1}>
          {meal?.author || 'Author Tidak Diketahui'}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {meal?.description || 'Deskripsi tidak tersedia'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 120,
  },
  textContainer: {
    padding: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  author: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  description: {
    fontSize: 12,
    color: '#666',
    marginTop: 6,
  },
});

export default MealCard;
