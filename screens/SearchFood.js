import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { Text, View, TouchableWithoutFeedback, SafeAreaView, TextInput, StyleSheet, Dimensions, Keyboard, Pressable, Button, FlatList, Modal } from 'react-native';


import styles from '../config/styles';

const Search = ({ navigation }) => {
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
		let response
		try {
			response = await fetch('https://fiitness-pal.ey.r.appspot.com/foods?name=' + search, {
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
        console.log(json)
		setData(json.foods)
		console.log(json)
	}

	const renderItem = ({ item }) => (
		<View style={{ flexDirection: 'row' }}>
			<View style={{ flex: 1, float: 'left', paddingLeft: 15, paddingBottom: 20 }}>
				<Text numberOfLines={1} style={{ fontSize: 20 }}>{item.name}</Text>
				<Text>{item.calories} cal</Text>
			</View>
			<View style={{ flex: 1, float: 'right' }}>
				<Button title='Details' style={{ float: 'right' }} onPress={() => navigation.navigate('FoodDetails', {
					id: item.id,
                    fnc: "addToMeal"
				})} />
			</View>
		</View>
	);
	return (
		<TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); setModalVisible(false) }}>
			<SafeAreaView>
                {/* Top buttons */}
                <View style={{flexDirection:'row'}}>
                    <Pressable onPress={() => { navigation.goBack() }} style={{flex: 1, float: 'left'}}>
                        <Text style={{ fontSize: 25, textAlignVertical: 'top', padding: 10 }}>{'< Back'}</Text>
                    </Pressable>
                </View>
				<View style={{ paddingLeft: 20, paddingRight: 20 }}>
					<TextInput style={styles.input} placeholder="Search" onChangeText={onChangeSearch} value={search} onSubmitEditing={sendRequest} name="search" />
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