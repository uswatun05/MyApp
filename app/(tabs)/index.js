import React, { useState, useEffect } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, TextInput,
  StyleSheet, StatusBar
} from 'react-native';
import { useRouter } from 'expo-router';
import MealCard from '../../components/MealCard';
import { getMealsByCategory } from '../../src/api/mealApi';

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

  const fetchDataTrend = async (kategori) => {
    try {
      const meals = await getMealsByCategory(kategori);
      setDataTrend(meals || []);
    } catch (error) {
      console.error('Gagal fetch data:', error);
    }
  };

  useEffect(() => {
    fetchDataTrend(kategoriSeleksi);
  }, [kategoriSeleksi]);

  const filteredData = DataTrend.filter((item) =>
    item.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#fff' barStyle='dark-content' />

      <FlatList
        ListHeaderComponent={
          <>
            {/* Judul */}
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

            {/* Section Header */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Trending</Text>
            </View>
          </>
        }
        data={filteredData}
        numColumns={2}
        keyExtractor={(item) => item.idMeal.toString()}
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
  titleContainer: { paddingTop: 50, paddingBottom: 20, alignItems: 'center' },
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
  kategoriText: { color: '#000', fontWeight: 'bold' },
  searchContainer: { paddingHorizontal: 15, paddingVertical: 10 },
  searchInput: {
    padding: 10, borderRadius: 8, borderWidth: 1, borderColor: '#ccc',
    fontSize: 16, backgroundColor: '#f9f9f9',
  },
  sectionHeader: {
    marginTop: 20, paddingHorizontal: 15, flexDirection: 'row',
    justifyContent: 'space-between', alignItems: 'center',
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold' },
  bottomNav: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: '#fff', padding: 10, alignItems: 'center',
  },
});

export default HomeScreen;
