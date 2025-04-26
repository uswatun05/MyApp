import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, StatusBar } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';

const RecipeDetail = () => {
  const [recipe, setRecipe] = useState(null);
  const router = useRouter();
  const { recipeId } = router.query; // Ambil recipeId dari URL

  // Fetch data berdasarkan recipeId
  const fetchRecipeDetail = async () => {
    try {
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
      );
      setRecipe(res.data.meals[0]);
    } catch (error) {
      console.error('Error fetching recipe detail:', error);
    }
  };

  useEffect(() => {
    if (recipeId) {
      fetchRecipeDetail();
    }
  }, [recipeId]);

  if (!recipe) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor='#fff' barStyle='dark-content' />
      <View style={styles.detailContainer}>
        <Image source={{ uri: recipe.strMealThumb }} style={styles.recipeImage} />
        <Text style={styles.recipeTitle}>{recipe.strMeal}</Text>
        <Text style={styles.recipeCategory}>{recipe.strCategory}</Text>
        <Text style={styles.recipeArea}>{recipe.strArea}</Text>
        <Text style={styles.recipeInstructions}>{recipe.strInstructions}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  detailContainer: { padding: 20 },
  recipeImage: { width: '100%', height: 250, borderRadius: 8 },
  recipeTitle: { fontSize: 24, fontWeight: 'bold', marginVertical: 10 },
  recipeCategory: { fontSize: 18, color: '#888' },
  recipeArea: { fontSize: 16, color: '#888' },
  recipeInstructions: { fontSize: 16, marginTop: 15, color: '#333' },
});

export default RecipeDetail;
