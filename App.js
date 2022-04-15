import React, {useEffect, useState} from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import TabNabigation from './navigation/TabNavigation';
import StackNavigation from './navigation/StackNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
	const [loggedIn, setLoggedIn] = useState(false)
	const Stack = createNativeStackNavigator();
	useEffect(async () => {
		const token = await AsyncStorage.getItem('@accessToken')
		if(token === null)
			setLoggedIn(false)
		else {
			setLoggedIn(true)
		}
  }, [loggedIn])
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={loggedIn ? "TabNavigation" : "StackNavigation"}>
				<Stack.Screen name="StackNavigation" component={StackNavigation} />
				<Stack.Screen name="TabNavigation" component={TabNabigation} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
