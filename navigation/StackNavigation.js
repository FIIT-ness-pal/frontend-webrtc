import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Register from '../screens/Register';
import Login from '../screens/Login';
import TabNavigation from './TabNavigation'
import MealDetails from '../screens/MealDetails'
import CreateMeal from '../screens/CreateMeal'
import FoodDetails from '../screens/FoodDetails';
import CreateFood from '../screens/CreateFood';

export default function StackNavigation() {
  
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{title: 'Login'}}/>
        <Stack.Screen name="Register" component={Register} options={{headerShown: true, title: ""}}/>
        <Stack.Screen name="TabNavigation" component={TabNavigation} />
        <Stack.Screen name="MealDetails" component={MealDetails} />
        <Stack.Screen name="CreateMeal" component={CreateMeal} />
        <Stack.Screen name="CreateFood" component={CreateFood} />
        <Stack.Screen name="FoodDetails" component={FoodDetails} />
    </Stack.Navigator>  
  );
}
