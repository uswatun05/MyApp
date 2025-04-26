// In App.js or your navigation file
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import RecipeDetail from './RecipeDetail'; // Pastikan ini sesuai dengan nama file

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="RecipeDetail" component={RecipeDetail} /> {/* Ini yang harus sesuai */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
