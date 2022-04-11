import React, { useState } from 'react';
import { Text, View, TouchableWithoutFeedback, SafeAreaView, TextInput, StyleSheet, Dimensions, Keyboard, Pressable, Button, FlatList } from 'react-native';
import colors from '../config/colors';

const Item = ({ title, calories, id, navigation }) => {
	return (	
		<View style={{ flexDirection: 'row' }}>
			<View style={{ flex: 1, float: 'left', paddingLeft: 15, paddingBottom: 20 }}>
				<Text numberOfLines={1} style={{ fontSize: 20 }}>{title}</Text>
				<Text>{calories} cal</Text>
			</View>
			<View style={{ flex: 1, float: 'right' }}>
				<Button title='Show' style={{ float: 'right' }} onPress={() => navigation.goBack()} />
			</View>
		</View>
	)
};

const Search = ({ navigation }) => {
	const [active, setActive] = useState('Meals')

	const data = [
		{
			"id": "b601b5ee-4bd0-4db2-83b4-7d27d6e1d701",
			"name": "Grilled chicken with basmati rice",
			"description": "",
			"calories": 1,
			"carbs": 1,
			"fat": 1,
			"protein": 1,
			"isPublic": true
		},
		{
			"id": "b601b5ee-4bd0-4db2-83b4-7d27d6e1d702",
			"name": "Chicken with apples",
			"description": "",
			"calories": 1,
			"carbs": 1,
			"fat": 1,
			"protein": 1,
			"isPublic": true
		},

	]
	const handleMealPress = () => {
		setActive('Meals')
	}

	const handleFoodPress = () => {
		setActive('Foods')
	}
	const renderItem = ({ item }) => (
		<View style={{ flexDirection: 'row' }}>
			<View style={{ flex: 1, float: 'left', paddingLeft: 15, paddingBottom: 20 }}>
				<Text numberOfLines={1} style={{ fontSize: 20 }}>{item.name}</Text>
				<Text>{item.calories} cal</Text>
			</View>
			<View style={{ flex: 1, float: 'right' }}>
				<Button title='Show' style={{ float: 'right' }} onPress={() => navigation.navigate('MealDetails')} />
			</View>
		</View>
	);
	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<SafeAreaView>
				<Pressable onPress={() => { navigation.goBack() }}>
					<Text style={{ fontSize: 30, textAlignVertical: 'top', padding: 10 }}>{'< Back'}</Text>
				</Pressable>
				<TextInput style={styles.input} placeholder="Search" name="search" />
				{/* Top buttons */}
				<View style={{ flexDirection: 'row', borderBottomColor: 'black', borderBottomWidth: 2, margin: 10 }}>
					<Pressable onPress={() => handleMealPress()} style={{ flex: 1 }}>
						<Text style={{ fontSize: 20, textAlign: 'center', fontWeight: active === 'Meals' ? 'bold' : 'normal' }}>Meals</Text>
					</Pressable>
					<Pressable onPress={() => { handleFoodPress() }} style={{ flex: 1 }}>
						<Text style={{ fontSize: 20, textAlign: 'center', fontWeight: active === 'Foods' ? 'bold' : 'normal' }}>Foods</Text>
					</Pressable>
				</View>
				{/* Search results */}
				<FlatList
					data={data}
					renderItem={renderItem}
					keyExtractor={item => item.id}
				/>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	input: {
		backgroundColor: colors.input,
		borderRadius: 5,
		width: Dimensions.get('window').width,
		height: 40,
		fontSize: 20,
		margin: 10,
	},
})
export default Search;