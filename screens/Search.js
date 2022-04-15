import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { Text, View, TouchableWithoutFeedback, SafeAreaView, TextInput, StyleSheet, Dimensions, Keyboard, Pressable, Button, FlatList, Modal } from 'react-native';


import styles from '../config/styles';

const Search = ({ navigation }) => {
	const [active, setActive] = useState('meals')
	const [modalVisible, setModalVisible] = useState(false)
	const [search, onChangeSearch] = useState(null)
	const [data, setData] = useState([])

	
	const sendRequest = async () => {
		const token = await AsyncStorage.getItem('@accessToken')
		if (token == null) {
			navigation.navigate('Login')
			return
		}
		if (search == null) {
			return
		}
		console.log('sending request for', active)
		let response
		try {
			response = await fetch('https://fiitness-pal.ey.r.appspot.com/' + active + '?name=' + search, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: token
				}
			})
		}
		catch (error) {
			console.log(error)
		}
		let json
		try {
			json = await response.json()
		}
		catch {
			console.log(JSON.stringify(response))
		}
		if (active == 'meals')
			setData(json.meals)
		else
			setData(json.foods)
		console.log(json)
	}

<<<<<<< HEAD
	useEffect(() => {
		sendRequest()
	}, [active])

=======
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
		{         
			"id": "eff39dd1-19eb-4094-8fef-bab28c3e2665",
			"name": "Frosted flakes",         
			"brand": "Kelloggs",         
			"description": "",         
			"calories": 382.35,         
			"carbs": 88.24,         
			"fat": 0,         
			"protein": 5.88,         
			"isPublic": true     
		}
	]
>>>>>>> a1f81c14f4eedf10c657e08e4a47be71b141cb4a
	const handleMealPress = () => {
		setActive('meals')
	}

	const handleFoodPress = () => {
		setActive('foods')
	}
	const renderItem = ({ item }) => (
		<View style={{ flexDirection: 'row' }}>
			<View style={{ flex: 1, float: 'left', paddingLeft: 15, paddingBottom: 20 }}>
				<Text numberOfLines={1} style={{ fontSize: 20 }}>{item.name}</Text>
				<Text>{item.calories} cal</Text>
			</View>
			<View style={{ flex: 1, float: 'right' }}>
<<<<<<< HEAD
				<Button title='Details' style={{ float: 'right' }} onPress={() => navigation.navigate(active == 'meals' ? 'MealDetails' : 'FoodDetails', {
					id: item.id
				})} />
=======
				<Button title='Show' style={{ float: 'right' }} onPress={() => navigation.navigate('FoodDetails')} />
>>>>>>> a1f81c14f4eedf10c657e08e4a47be71b141cb4a
			</View>
		</View>
	);
	return (
		<TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); setModalVisible(false) }}>
			<SafeAreaView>
				<Modal
					animationType="none"
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => {
						setModalVisible(!modalVisible);
					}}
				>
					<View style={styles.centeredView} >
						<View style={styles.modalView} >
							<View style={{ padding: 10, }}>
								<Button title='Create meal' onPress={() => { setModalVisible(false), navigation.navigate('CreateMeal') }} />
							</View>
							<View style={{ padding: 10, }}>
								<Button title='Create food' style={{ margin: 20, padding: 20 }} onPress={() => { setModalVisible(false), navigation.navigate('CreateFood') }} />
							</View>
							<View style={{ padding: 10, }}>
								<Button title='Cancel' style={{ margin: 20, padding: 20 }} onPress={() => setModalVisible(false)} />
							</View>
						</View>
					</View>
				</Modal>
				{/* Top buttons */}
				<View style={{ flexDirection: 'row' }}>
					<View style={{ flex: 1, float: 'left' }} />
					<Button style={{ flex: 1, float: 'right', padding: 10 }} title={'Create'} onPress={() => setModalVisible(true)} />
				</View>
				<View style={{ paddingLeft: 20, paddingRight: 20 }}>
					<TextInput style={styles.input} placeholder="Search" onChangeText={onChangeSearch} value={search} onSubmitEditing={sendRequest} name="search" />
				</View>
				{/* Top buttons */}
				<View style={{ flexDirection: 'row', borderBottomColor: 'black', borderBottomWidth: 2, margin: 10 }}>
					<Pressable onPress={() => handleMealPress()} style={{ flex: 1 }}>
						<Text style={{ fontSize: 20, textAlign: 'center', fontWeight: active === 'meals' ? 'bold' : 'normal' }}>Meals</Text>
					</Pressable>
					<Pressable onPress={() => { handleFoodPress() }} style={{ flex: 1 }}>
						<Text style={{ fontSize: 20, textAlign: 'center', fontWeight: active === 'foods' ? 'bold' : 'normal' }}>Foods</Text>
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


export default Search;