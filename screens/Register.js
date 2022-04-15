import React from "react";
import {
	StyleSheet,
	Text,
	TextInput,
	Button,
	View,
	KeyboardAvoidingView,
	Keyboard,
	TouchableWithoutFeedback,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from "../config/colors";

const Register = ({ navigation }) => {
	const [email, onChangeEmail] = React.useState(null);
	const [password, onChangePassword] = React.useState(null);
	const [passwordConfirm, onChangePasswordConfirm] = React.useState(null);
	const [firstName, onChangeFirstName] = React.useState(null);
	const [lastName, onChangeLastName] = React.useState(null);
	const [weight, onChangeWeight] = React.useState(null);
	const [height, onChangeHeight] = React.useState(null);
	const [caloriesGoal, onChangeCaloriesGoal] = React.useState(null);

	const sendData = async () => {
		console.log("password", password, "email", email)
		if(password === null || email === null)
			return
		try {
			const response = await fetch('https://fiitness-pal.ey.r.appspot.com/register', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					firstName: firstName,
					lastName: lastName,
					password: password,
					passwordConfirm: passwordConfirm,
					email: email,
					weight: Number(weight),
					height: Number(height),
					birthDate: "1990-10-10",
					caloriesGoal: Number(caloriesGoal)
				})
			})
			const json = await response.json()
			console.log(json)
			if(json.status == 201) {
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
						console.log(json)
					}
				}
				catch(error) {
					console.log(error)
				}
			}
			else {
				console.log('Invalid')
			}
		}
		catch(error) {
			console.log(error)
		}
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={styles.container}>
				<Text style={{ fontSize: 50, fontWeight: "bold" }}>FIITness pal</Text>
				<TextInput style={styles.input} placeholder="Email" onChangeText={onChangeEmail} value={email} /> 
				<TextInput
					style={styles.input}
					placeholder="Password"
					name="password"
					secureTextEntry
					onChangeText={onChangePassword}
					value={password}
				/>
				<TextInput
					style={styles.input}
					placeholder="Confirm password"
					name="passwordConfirm"
					secureTextEntry
					onChangeText={onChangePasswordConfirm}
					value={passwordConfirm}
				/>
				<Text style={{color: 'red'}}>{}</Text> 
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					keyboardVerticalOffset={50}
				>
					<View style={{ marginTop: 30 }}>
						<TextInput
							style={styles.input}
							placeholder="First name"
							name="firstName"
							autoCapitalize="words"
							onChangeText={onChangeFirstName}
							value={firstName}
						/>
						<TextInput
							style={styles.input}
							placeholder="Last name"
							name="lastName"
							autoCapitalize="words"
							onChangeText={onChangeLastName}
							value={lastName}
						/>
						<View style={{ flexDirection: "row" }}>
							<View style={{ flexDirection: "row" }}>
								<TextInput
									style={styles.bodyInput}
									placeholder="Weight"
									name="weight"
									keyboardType="numeric"
									onChangeText={onChangeWeight}
									value={weight}
								/>
								<Text style={{ fontSize: 20, marginTop: 20 }}>kg</Text>
							</View>
							<View style={{ flexDirection: "row" }}>
								<TextInput
									style={styles.bodyInput}
									placeholder="Height"
									name="height"
									keyboardType="numeric"
									onChangeText={onChangeHeight}
									value={height}
								/>
								<Text style={{ fontSize: 20, marginTop: 20 }}>cm</Text>
							</View>
						</View>
						<TextInput
							style={styles.input}
							placeholder="Calories goal"
							name="caloriesGoal"
							keyboardType="numeric"
							onChangeText={onChangeCaloriesGoal}
							value={caloriesGoal}
						/>
					</View>
				</KeyboardAvoidingView>
				<Button
					style={styles.button}
					title="Register"
					onPress={sendData}
				/>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
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
		backgroundColor: "#C4C4C4",
		borderRadius: 10,
		padding: 10,
	},
});

export default Register;
