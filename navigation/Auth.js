import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Register from '../screens/Register';
import Login from '../screens/Login';
import Screens from './Screens'

export default function Auth() {
  
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} options={{title: 'Login'}}/>
        <Stack.Screen name="Register" component={Register} options={{headerShown: true, title: ""}}/>
        <Stack.Screen name="Screens" component={Screens} />
    </Stack.Navigator>  
  );
}
