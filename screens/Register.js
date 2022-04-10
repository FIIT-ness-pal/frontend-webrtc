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

const Register = ({ navigation }) => {
	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={styles.container}>
				<Text style={{ fontSize: 50, fontWeight: "bold" }}>FIITness pal</Text>
				<TextInput style={styles.input} placeholder="Email" />
				<TextInput
					style={styles.input}
					placeholder="Password"
					name="password"
					secureTextEntry
				/>
				<TextInput
					style={styles.input}
					placeholder="Confirm password"
					name="passwordConfirm"
					secureTextEntry
				/>
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					keyboardVerticalOffset={50}
				>
					<View style={{ marginTop: 40 }}>
						<TextInput
							style={styles.input}
							placeholder="First name"
							name="firstName"
							autoCapitalize="words"
						/>
						<TextInput
							style={styles.input}
							placeholder="Last name"
							name="lastName"
							autoCapitalize="words"
						/>
						<View style={{ flexDirection: "row" }}>
							<View style={{ flexDirection: "row" }}>
								<TextInput
									style={styles.bodyInput}
									placeholder="Weight"
									name="weight"
									keyboardType="numeric"
								/>
								<Text style={{ fontSize: 20, marginTop: 20 }}>kg</Text>
							</View>
							<View style={{ flexDirection: "row" }}>
								<TextInput
									style={styles.bodyInput}
									placeholder="Height"
									name="height"
									keyboardType="numeric"
								/>
								<Text style={{ fontSize: 20, marginTop: 20 }}>cm</Text>
							</View>
						</View>
						<TextInput
							style={styles.input}
							placeholder="Calories goal"
							name="caloriesGoal"
							keyboardType="numeric"
						/>
					</View>
				</KeyboardAvoidingView>
				<Button
					style={styles.button}
					title="Register"
					onPress={() => navigation.navigate("Screens")}
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
		backgroundColor: "#EFEFEF",
		borderRadius: 5,
		width: 200,
		height: 40,
		fontSize: 20,
		margin: 10,
	},
	bodyInput: {
		backgroundColor: "#EFEFEF",
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
