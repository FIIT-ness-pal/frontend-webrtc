import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Search from '../screens/Search';
import MealDetails from '../screens/MealDetails';

export default function Auth() {
  
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="MealDetails" component={MealDetails} />
        <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>  
  );
}
