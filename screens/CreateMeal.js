import React, { useState, useEffect } from 'react'
import { TouchableWithoutFeedback, Keyboard, SafeAreaView, Text, Pressable, View, Button, TextInput, FlatList, Modal, Switch } from 'react-native'
import styles from '../config/styles'
import AsyncStorage from '@react-native-async-storage/async-storage'


const CreateMeal = ({ route, navigation }) => {
    const [name, onChangeName] = useState('')
    const [description, onChangeDescription] = useState('')
    const [values, setValues] = useState({calories: 0, carbs: 0, fat: 0, protein: 0})
    const [ingredients, setIngredients] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const [foodAmount, onChangeFoodAmount] = useState('')
    const { food, amount } = route.params
    const [isPublic, setIsPublic] = useState(false)

    useEffect(() => {
        console.log('setIngredients')
        console.log('food & amount', food, amount)
        if(food === null)
            return
        let duplicate = false
        ingredients.forEach((ingredient) => {
            if(ingredient.id === food.id) {
                duplicate = true
            }
        })
        if(!duplicate)
            setIngredients([...ingredients, {name: food.name, brand: food.brand, calories: food.calories, amount: Number(amount), carbs: food.carbs, fat: food.fat, protein: food.protein, id: food.id}])
    }, [food, amount])

    useEffect(() => {
        console.log('useEffect')
        let calories = 0
        let protein = 0
        let carbs = 0
        let fat = 0

        ingredients.forEach(ingredient => {
            calories += ingredient.amount * ingredient.calories / 100
            protein += ingredient.amount * ingredient.protein / 100
            carbs += ingredient.amount * ingredient.carbs / 100
            fat += ingredient.amount * ingredient.fat / 100    
        })

        setValues({calories: parseFloat(calories.toString()).toFixed(2), carbs: parseFloat(carbs.toString()).toFixed(2), fat: parseFloat(fat.toString()).toFixed(2), protein: parseFloat(protein.toString()).toFixed(2)})

    }, [ingredients])

    const handleFoodDetails = (amount, id) => {
        console.log('handleFoodDetails')
        let newIngredients = [...ingredients]
        const index = newIngredients.findIndex(object => {return object.id == id}) 
        newIngredients[index].amount = Number(amount)
        console.log(newIngredients)
        setIngredients(newIngredients)
    } 

    const createMeal = async () => {
        const meal = {
            name: name,
            description: description,
            calories: Number(values.calories),
            protein: Number(values.protein),
            carbs: Number(values.carbs),
            fat: Number(values.fat),
            ingredients: ingredients,
            isPublic: isPublic
        }
        console.log("meal", meal)
        const token = await AsyncStorage.getItem('@accessToken')
        if (token == null) {
            navigation.navigate('Login')
            return
        }
        let response
        try {
            response = await fetch('https://fiitness-pal.ey.r.appspot.com/meal', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                },
                body: JSON.stringify(meal)
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
            console.log("error json", JSON.stringify(response))
        }
        console.log("json", json)
        if(json.status === 422) {
            alert(json.message)
        }
        else {
            navigation.navigate('Home')
        }
    } 

    const removeIngredient = (id) => {
        let newIngredients = [...ingredients]
        const index = newIngredients.findIndex(object => {return object.id == id})
        newIngredients.splice(index, 1)
        setIngredients(newIngredients)
    }

    const renderItem = ({ item }) => (
        <View style={{ padding: 10, flexDirection: 'row' }}>
            <Modal
                animationType="none"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text>Enter the amount in grams</Text>
                        <TextInput style={{...styles.input, width: 100, margin: 10}} autoFocus={true} onChangeText={onChangeFoodAmount} defaultValue={item.amount.toString()}keyboardType='number-pad' />
                        <View style={{flexDirection:'row'}}>
                            <Button style={{flex: 1}} title="Cancel" onPress={() => {setModalVisible(false)}}/>  
                            <Button style={{flex: 1}} title="Confirm" onPress={() => {handleFoodDetails(foodAmount, item.id); setModalVisible(false)}}/>
                        </View>
                    </View>
                </View>
            </Modal>

            <View style={{flex: 1, float: 'left'}}>
                <Text style={{fontSize: 20}}>{item.name}</Text>
                <Text>{item.brand}</Text>
                <Text>{item.calories} cal</Text>
            </View>

            <View style={{flex: 1, float: 'right', alignItems: 'flex-end'}}>
                <Text style>Amount</Text>
                <TextInput style={{...styles.input, width: 50, fontSize: 15}} editable={false} defaultValue={item.amount.toString()} value={item.amount.toString()} onPressOut={() => {setModalVisible(true)}}/>
            </View>

            <View style={{flex: 0.2, float: 'right', justifyContent: 'center'}}>
                <Button title={'X'} onPress={() => {removeIngredient(item.id)}}/>
            </View>
        </View>
    );

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView>
                {/* Top buttons */}
                <View style={{ flexDirection: 'row' }}>
                    <Pressable onPress={() => { navigation.goBack() }} style={{ flex: 1, float: 'left' }}>
                        <Text style={{ fontSize: 25, textAlignVertical: 'top', padding: 10 }}>{'< Back'}</Text>
                    </Pressable>
                    <Button style={{ flex: 1, float: 'right', padding: 10 }} title={'Create'}  onPress={createMeal}/>
                </View>
                {/* Meal details */}
                <View style={{ padding: 20 }}>
                    <Text style={{ fontSize: 20 }}>Meal name</Text>
                    <TextInput style={{ ...styles.input, width: '100%' }} onChangeText={onChangeName} value={name}/>
                </View>
                <View style={{ padding: 20, paddingTop: -10 }}>
                    <Text style={{ fontSize: 20 }}>Short description</Text>
                    <TextInput style={{ ...styles.input, width: '100%' }} onChangeText={onChangeDescription} value={description} />
                </View>
                {/* Values */}
                <View style={{ padding: 20 }}>
                    <Text style={{ fontSize: 20, paddingBottom: 15 }}>Values</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}>{`${values.calories}\nCalories`}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}>{`${values.carbs}\nCarbs`}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}>{`${values.fat}\nFat`}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}>{`${values.protein}\nProtein`}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, margin: 10 }} />
                {/* Ingredients */}
                <View style={{ padding: 20 }}>
                    <Text style={{ fontSize: 20, paddingBottom: 15 }}>Ingredients</Text>
                    <FlatList
                        data={ingredients}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                    <Button title='Add food' onPress={() => navigation.navigate('SearchFood')} />
                </View>
                <View style={{flexDirection: 'row', margin: 20}}>
                    <View style={{flex: 1, float: 'left', justifyContent: 'center'}}>
                        <Text style={{fontSize: 20}}>Make public</Text>
                    </View>
                    <View style={{flex: 1, float: 'right', alignItems: 'flex-end'}}>
                        <Switch onValueChange={() => setIsPublic(!isPublic)} value={isPublic} />
                    </View> 
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default CreateMeal