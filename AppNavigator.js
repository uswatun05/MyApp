import { createStackNavigator } from '@react-navigation/stack';
import { useRouter } from 'expo-router'; 
import React from 'react';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const router = useRouter(); 

  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={() => router.push('/')} /> {/* Menavigasi ke halaman utama */}
    </Stack.Navigator>
  );
};

export default AppNavigator;
