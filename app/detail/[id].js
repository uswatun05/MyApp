import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, Image, ScrollView, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getMealDetailById } from '../../src/api/mealApi';

export default function Detail() {
  const { id } = useLocalSearchParams(); 
  const router = useRouter();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchMeal = async () => {
      try {
        const mealDetail = await getMealDetailById(id); 
        
        if (mealDetail) {
          setMeal(mealDetail);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Gagal fetch detail:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchMeal();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#ff6347" />
        <Text style={{ marginTop: 10 }}>Loading...</Text>
      </View>
    );
  }

  if (error || !meal) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: 'red' }}>Gagal memuat data resep.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#333" />
        <Text style={styles.backText}>Kembali</Text>
      </TouchableOpacity>
      <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
      <Text style={styles.title}>{meal.strMeal}</Text>
      <Text style={styles.category}>Kategori: {meal.strCategory}</Text>
      <Text style={styles.area}>Asal: {meal.strArea}</Text>
      <Text style={styles.instructions}>{meal.strInstructions}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 50,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  backText: {
    fontSize: 16,
    marginLeft: 6,
    color: '#333',
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  category: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
    marginBottom: 4,
  },
  area: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
    marginBottom: 12,
  },
  instructions: {
    fontSize: 15,
    lineHeight: 22,
    color: '#333',
  },
});
