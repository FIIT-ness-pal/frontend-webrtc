import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react'
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import colors from '../config/colors';

const Login = ({ navigation }) => {
	const [email, onChangeEmail] = useState(null)
	const [password, onChangePassword] = useState(null)
	const [error, setError] = useState(null)

	const sendData = async () => {
		console.log("password", password, "email", email)
		if(password === null || email === null)
			return
		try {
			const response = await fetch('https://fiitness-pal.ey.r.appspot.com/login', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: email.toString(),
					password: password.toString()
				})
			})
			const json = await response.json()
			if(json.status == 201) {
				await AsyncStorage.setItem('@accessToken', json.accessToken)
				const token = await AsyncStorage.getItem('@accessToken')
				console.log(token)
				navigation.navigate('TabNavigation')
			}
			else {
				console.log('Invalid')
				setError('Email or password is incorrect')
			}
		}
		catch(error) {
			console.log(error)
		}
	}

	return (
		<View style={styles.container} >
			<Text style={{ fontSize: 50, fontWeight: 'bold' }}>FIITness pal</Text>
			<TextInput style={styles.input} onChangeText={onChangeEmail} value={email} placeholder="Email" />
			<TextInput style={styles.input} onChangeText={onChangePassword} value={password} placeholder="Password" name="password" secureTextEntry />
			<Text style={{color: 'red'}}>{error}</Text> 
			<Button style={styles.button} title='Login' onPress={sendData} />
			<View style={{ marginTop: 20 }}>
				<Text> Don't have an account yet?</Text>
				<Button style={styles.button} onPress={() => navigation.navigate('Register')} title='Register' />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	input: {
		backgroundColor: colors.input,
		borderRadius: 5,
		width: 200,
		height: 40,
		fontSize: 20,
		margin: 10,
	},
	bodyInput: {
		backgroundColor: colors.input,
		borderRadius: 5,
		width: 65,
		height: 40,
		fontSize: 20,
		margin: 10,
	},
	button: {
		backgroundColor: colors.secondary,
		borderRadius: 10,
		padding: 10
	}
});

export default Login