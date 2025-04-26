import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StatusBar, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const App = () => {
  const [kategori, setKategori] = useState([
    { nama: 'Ayam' }, { nama: 'Telur' }, { nama: 'Mie' }, { nama: 'Tahu' },
    { nama: 'Tempe' }, { nama: 'Ikan' }, { nama: 'Seafood' }, { nama: 'Sayur' },
  ]);

  const [kategoriSeleksi, setKategoriSeleksi] = useState({ nama: 'Ayam' });
  const [DataTrend, setDataTrend] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState('Home');

  useEffect(() => {
    axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=chicken')
      .then(response => {
        const meals = response.data.meals;
        if (meals) {
          const hasilMap = meals.map((item) => ({
            namaResep: item.strMeal,
            author: item.strArea || "Unknown",
            Image: item.strMealThumb,
          }));
          setDataTrend(hasilMap);
        }
      })
      .catch(error => {
        console.error('Gagal ambil data:', error);
      });
  }, []);

  const renderHeader = () => (
    <View>
      <StatusBar backgroundColor='#5f5f55' barStyle='dark-content' />
      <View style={{ alignItems: 'center', marginBottom: 20, marginTop: 20 }}>
        <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#212121' }}>
          Resep<Text style={{ color: '#ff7f00' }}>Food🍝</Text>
        </Text>
      </View>

      {/* Kategori */}
      <FlatList
        data={kategori}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        style={{ marginLeft: 10 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              marginRight: 5,
              backgroundColor: kategoriSeleksi.nama === item.nama ? '#ff7f00' : '#ffffff',
              elevation: 3,
              paddingHorizontal: 10,
              paddingVertical: 8,
              marginBottom: 10,
              borderRadius: 15,
              marginLeft: 5,
            }}
            onPress={() => setKategoriSeleksi(item)}
          >
            <Text style={{
              color: kategoriSeleksi.nama === item.nama ? '#fff' : '#212121',
            }}>
              {item.nama}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Trend */}
      <View style={{
        marginHorizontal: 20,
        marginBottom: 10,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#212121' }}>Trend</Text>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 14, color: '#212121', fontWeight: 'bold' }}>Lihat Semua</Text>
          <Ionicons name="chevron-forward" size={20} color="#bdbdbd" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <FlatList
        ListHeaderComponent={renderHeader}
        data={DataTrend}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              margin: 10,
              backgroundColor: '#fff',
              elevation: 3,
              padding: 10,
              borderRadius: 15,
            }}>
            <Image
              source={{ uri: item.Image }}
              style={{ width: '100%', height: 150, marginBottom: 10, borderRadius: 3 }}
              resizeMode="stretch"
            />
            <Text style={{ color: '#212121', fontSize: 18, fontWeight: 'bold' }}>{item.namaResep}</Text>
            <Text>{item.author}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Menu Navigasi */}
      <View style={{ flexDirection: 'row', paddingTop: 5 }}>
        {['Home', 'Search', 'Kategori', 'User'].map(menu => (
          <TouchableOpacity
            key={menu}
            style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
            onPress={() => setSelectedMenu(menu)}
          >
            <Ionicons
              name={menu === 'Home' ? 'home' : menu === 'Search' ? 'search' : menu === 'Kategori' ? 'file-tray-full' : 'person'}
              size={25}
              color={selectedMenu === menu ? '#ff7f00' : '#bdbdbd'}
            />
            <Text style={{ color: selectedMenu === menu ? '#ff7f00' : '#bdbdbd' }}>{menu}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default App;
