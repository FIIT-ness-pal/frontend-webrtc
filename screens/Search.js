import React, { useState } from 'react';
import { Text, View, TouchableWithoutFeedback, SafeAreaView, TextInput, StyleSheet, Dimensions, Keyboard, Pressable, Button, FlatList, Modal } from 'react-native';
import colors from '../config/colors';
import styles from '../config/styles';

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
	const [modalVisible, setModalVisible] = useState(false)

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
		
		<TouchableWithoutFeedback onPress={() => {Keyboard.dismiss(); setModalVisible(false)}}>
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
							<View  style={{padding: 10,}}>
								<Button title='Create meal'onPress={() => {setModalVisible(false), navigation.navigate('CreateMeal')}}/>
							</View>
							<View  style={{padding: 10,}}>
								<Button title='Create food' style={{margin: 20, padding: 20}} onPress={() =>{setModalVisible(false), navigation.navigate('CreateMeal')}}/>
							</View>	
							<View  style={{padding: 10,}}>
								<Button title='Cancel' style={{margin: 20, padding: 20}} onPress={() => setModalVisible(false)}/>
							</View>	
						</View>
					</View>
				</Modal>
				{/* Top buttons */}
                <View style={{flexDirection:'row'}}>
					<View style={{flex: 1, float: 'left'}} />
                    <Button style={{flex: 1, float: 'right', padding: 10}} title={'Create'} onPress={() => setModalVisible(true)}/>
                </View>
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


export default Search;