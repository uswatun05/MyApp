import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)/index" options={{ headerShown: false }} />
      <Stack.Screen name="RecipeDetail" options={{ title: 'Detail Resep' }} />
    </Stack>
  );
}
