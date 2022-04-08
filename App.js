import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Register from './screens/Register';
import Login from './screens/Login';
import Home from './navigation/Home';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={Login} options={{title: 'Login'}}/>
          <Stack.Screen name="Register" component={Register} options={{headerShown: true, title: ""}}/>
          
          <Stack.Screen name="App" component={Home} options={{title: ""}}/>
        </Stack.Navigator>
        
      </NavigationContainer>
  
  );
}
