import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import {axios} from 'axios';

const HomeScreen = () => {
  const [DataTrend, setDataTrend] = useState([]);
  const [kategoriSeleksi, setKategoriSeleksi] = useState('Chicken');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchDataTrend = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${kategoriSeleksi}`
        );
        setDataTrend(response.data.meals);
      } catch (error) {
        console.error('Gagal ambil data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDataTrend();
  }, [kategoriSeleksi]);

  const handleNavigate = (idMeal) => {
    router.push(`/detail/${idMeal}`);};

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#fff' barStyle='dark-content' />

      <FlatList
        data={DataTrend}
        horizontal
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.recipeCard}
            onPress={() => handleNavigate(item.idMeal)}
          >
            <Image
              source={{ uri: item.strMealThumb }}
              style={styles.recipeImage}
              resizeMode="cover"
            />
            <Text style={styles.recipeName}>{item.strMeal}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingHorizontal: 16 }} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  recipeCard: {
    width: 150,
    marginRight: 15,
    alignItems: 'center',
  },
  recipeImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
  },
  recipeName: {
    marginTop: 5,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;
