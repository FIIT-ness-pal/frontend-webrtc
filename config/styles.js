import { StyleSheet } from "react-native"
import colors from './colors'
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
        padding: 10
	},
})

export default styles