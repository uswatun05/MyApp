import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

export default function RecipeDetail({ route }) {
  const { recipeId } = route.params;
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
        );
        setDetail(res.data.meals[0]);
        setLoading(false);
      } catch (error) {
        console.error('Gagal ambil detail:', error);
        setError(true);
        setLoading(false);
      }
    };

    fetchDetail();
  }, [recipeId]);

  if (!detail) return <Text>Loading...</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: detail.strMealThumb }} style={styles.image} />
      <Text style={styles.title}>{detail.strMeal}</Text>
      <Text style={styles.category}>Kategori: {detail.strCategory}</Text>
      <Text style={styles.area}>Asal: {detail.strArea}</Text>
      <Text style={styles.instructions}>{detail.strInstructions}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  image: { width: '100%', height: 200, borderRadius: 10 },
  title: { fontSize: 24, fontWeight: 'bold', marginVertical: 10 },
  category: { fontSize: 16, color: '#555' },
  area: { fontSize: 16, color: '#555' },
  instructions: { marginTop: 10, fontSize: 14, lineHeight: 22 },
});
