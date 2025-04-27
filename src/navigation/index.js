import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';


const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="RecipeDetail" component={RecipeDetail} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
