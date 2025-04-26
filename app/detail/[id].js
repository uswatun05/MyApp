import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { View, Text, Image, ScrollView } from 'react-native';

export default function Detail() {
  const { id } = useLocalSearchParams();
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(r => r.json())
      .then(j => setMeal(j.meals[0]));
  }, [id]);

  if (!meal) return <Text>Loading...</Text>;

  return (
    <ScrollView style={{ padding:16 }}>
      <Image source={{ uri: meal.strMealThumb }} style={{ width:'100%', height:200 }} />
      <Text style={{ fontSize:24, fontWeight:'bold', marginVertical:8 }}>{meal.strMeal}</Text>
      <Text>{meal.strInstructions}</Text>
    </ScrollView>
  );
}
