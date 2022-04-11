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
		height: 40,
		fontSize: 20,
        padding: 10
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22,
	  },
	  modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 10,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
		  width: 0,
		  height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	  },
	})


export default styles