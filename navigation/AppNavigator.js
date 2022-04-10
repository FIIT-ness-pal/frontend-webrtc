import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Screens from './Screens';
import Auth from './Auth';

const AppNavigator = () => {
    const loggedIn = false
    const Stack = createNativeStackNavigator();
    
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={loggedIn ? "Screens" : "Auth"}>
                <Stack.Screen name="Auth" component={Auth} />        
                <Stack.Screen name="Screens" component={Screens} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator