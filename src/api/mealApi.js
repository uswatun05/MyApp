import axios from 'axios';

export const getMealsByCategory = async (kategori) => {
  const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${kategori}`);
  return res.data.meals || [];
};

export const getMealDetailById = async (idMeal) => {
  const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
  return res.data.meals[0];
};
