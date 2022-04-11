import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import TabNabigation from './navigation/TabNavigation';
import StackNavigation from './navigation/StackNavigation';

export default function App() {
  const Stack = createNativeStackNavigator();
  const loggedIn = false
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={loggedIn ? "Screens" : "Auth"}>
          <Stack.Screen name="StackNavigation" component={StackNavigation} />        
          <Stack.Screen name="TabNavigation" component={TabNabigation} />
      </Stack.Navigator>
  </NavigationContainer>
  );
}
