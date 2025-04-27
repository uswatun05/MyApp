import React, { useState, useEffect } from 'react';
import {
  View, Text, Image, FlatList, TouchableOpacity, TextInput,
  StyleSheet, ScrollView, StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useRouter } from 'expo-router';
import {MealCard} from '../../components/MealCard';
import { getMealsByCategory, getMealDetailById } from '../../src/api/mealApi';

const HomeScreen = () => {
  const router = useRouter(); 
  const [kategori, setKategori] = useState([
    { nama: 'Chicken' }, { nama: 'Seafood' }, { nama: 'Beef' },
    { nama: 'Pasta' }, { nama: 'Dessert' }, { nama: 'Lamb' },
    { nama: 'Pork' }, { nama: 'Vegetarian' },
  ]);
  const [kategoriSeleksi, setKategoriSeleksi] = useState('Chicken');
  const [DataTrend, setDataTrend] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResep, setSelectedResep] = useState(null);

  const fetchDataTrend = async (kategori) => {
    try {
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${kategori}`
      );

      const meals = res.data.meals || [];

      const detailPromises = meals.map(async (meal) => {
        const detailRes = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
        );
        const detail = detailRes.data.meals[0];

        return {
          id: detail.idMeal,
          namaResep: detail.strMeal,
          Image: { uri: detail.strMealThumb },
          author: detail.strArea,
          description: detail.strInstructions,
        };
      });

      const hasilDetail = await Promise.all(detailPromises);
      setDataTrend(hasilDetail);
    } catch (error) {
      console.error('Gagal fetch data:', error);
    }
  };

  useEffect(() => {
    fetchDataTrend(kategoriSeleksi);
  }, [kategoriSeleksi]);

  const filteredData = DataTrend.filter((item) =>
    item.namaResep.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
  <StatusBar backgroundColor='#fff' barStyle='dark-content' />

  {/* Judul, kategori, search bar, deskripsi */}
  <FlatList
    ListHeaderComponent={
      <>
        <View style={styles.titleContainer}>
          <Text style={styles.mainTitle}>
            Food<Text style={styles.highlightTitle}>Recipe🍝</Text>
          </Text>
        </View>

        {/* Kategori */}
        <FlatList
          data={kategori}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.kategoriList}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          keyExtractor={(item) => item.nama}
          renderItem={({ item }) => {
            const isSelected = kategoriSeleksi === item.nama;
            return (
              <TouchableOpacity
                style={[
                  styles.kategoriButton,
                  isSelected && { backgroundColor: '#ff6347', borderColor: '#ff6347' },
                ]}
                onPress={() => setKategoriSeleksi(item.nama)}
              >
                <Text style={[
                  styles.kategoriText,
                  isSelected && { color: '#fff' }
                ]}>
                  {item.nama}
                </Text>
              </TouchableOpacity>
            );
          }}
        />

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Cari resep..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Deskripsi Resep */}
        {(filteredData.length > 0 || selectedResep) && (
          <View style={styles.deskripsiBox}>
            <Text style={styles.sectionTitle}>DESKRIPSI RESEP</Text>
            <Text style={styles.deskripsiText}>
              {selectedResep ? selectedResep.namaResep : filteredData[0]?.namaResep}
            </Text>
            <Text style={styles.deskripsiPenjelasan}>
              Kategori: {selectedResep ? selectedResep.author : filteredData[0]?.author}
            </Text>
            <Text style={styles.deskripsiPenjelasan}>
              Klik gambar untuk lihat detail lengkap.
            </Text>
          </View>
        )}

        {/* Section Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Trending</Text>
        </View>
      </>
    }
    data={filteredData}
    numColumns={2}
    keyExtractor={(item) => item.id.toString()}
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 100 }}
    renderItem={({ item }) => <MealCard meal={item} />}
  />

  {/* Bottom Menu */}
  <View style={styles.bottomNav}></View>
</View>

  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  titleContainer: {
    paddingTop: 50,
    paddingBottom: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  mainTitle: { fontSize: 24, fontWeight: 'bold' },
  highlightTitle: { color: '#ff6347' },
  kategoriList: { paddingVertical: 10 },
  kategoriButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  kategoriText: {
    color: '#000',
    fontWeight: 'bold',
  },
  searchContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  searchInput: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  sectionHeader: {
    marginTop: 20,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold' },
  seeMoreButton: { flexDirection: 'row', alignItems: 'center' },
  seeMoreText: { color: '#ff6347' },
  deskripsiBox: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#f2f2f2',
    marginVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  deskripsiText: { fontSize: 16, fontWeight: 'bold' },
  deskripsiPenjelasan: { fontSize: 14, color: '#555' },
  recipeList: { marginTop: 10 },
  recipeCard: {
    flex: 1,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    elevation: 2,
  },
  recipeImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
  },
  recipeName: { marginTop: 5, fontWeight: 'bold' },
  recipeAuthor: { color: '#555', fontSize: 12 },
  recipeDescription: {
    color: '#777',
    fontSize: 12,
    marginTop: 5,
    fontStyle: 'italic',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
