import React, {useState, useEffect} from 'react'
import { TouchableWithoutFeedback, Keyboard, SafeAreaView, Text, Pressable, View, Button, TextInput, FlatList, Modal } from 'react-native'
import styles from '../config/styles'
import AsyncStorage from '@react-native-async-storage/async-storage'


const FoodDetails = ({route, navigation}) => {
    const [food, setFood] = useState({})
    const [modalVisible, setModalVisible] = useState(false)
    const [amount, onChangeAmount] = useState('100')
    const [text, onChangeText] = useState('')
    const {id, fnc} = route.params

    useEffect(async () => {
        const token = await AsyncStorage.getItem('@accessToken')
        if (token == null) {
            navigation.navigate('Login')
            return
        }
        let response
        try {
            response = await fetch('https://fiitness-pal.ey.r.appspot.com/food?id=' + id, {
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
        setFood(json.food)
    }, [])

    const addToLog = async () => {
        const token = await AsyncStorage.getItem('@accessToken')
        if (token == null) {
            navigation.navigate('Login')
            return
        }
        let response
        try {
            response = await fetch('https://fiitness-pal.ey.r.appspot.com/log', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                },
                body: JSON.stringify({
                    name: food.name,
                    amount: Number(amount),
                    calories: Number(parseFloat((amount * food.calories / 100).toString()).toFixed(2)),
                    protein: Number(parseFloat((amount * food.protein / 100).toString()).toFixed(2)),
                    carbs: Number(parseFloat((amount * food.carbs / 100).toString()).toFixed(2)),
                    fat: Number(parseFloat((amount * food.fat / 100).toString()).toFixed(2)),
                    date: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
                    time: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
                })
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
        console.log(JSON.stringify({
            name: food.name,
            amount: Number(amount),
            calories: Number(amount * food.calories / 100),
            protein: Number(amount * food.protein / 100),
            carbs: Number(amount * food.carbs / 100),
            fat: Number(amount * food.fat / 100),
            date: `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`,
            time: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
        }))
        navigation.navigate('Search')
    } 

    const addToMeal = () => {
        navigation.navigate('CreateMeal', {
            food: {
                name: food.name,
                calories: amount * food.calories / 100,
                protein: amount * food.protein / 100,
                carbs: amount * food.carbs / 100,
                fat: amount * food.fat / 100,
                brand: food.brand,
                id: food.id
            },
            amount: amount
        })
    }

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView>
                {/* Top buttons */}
                <View style={{flexDirection:'row'}}>
                    <Pressable onPress={() => { navigation.goBack() }} style={{flex: 1, float: 'left'}}>
                        <Text style={{ fontSize: 25, textAlignVertical: 'top', padding: 10 }}>{'< Back'}</Text>
                    </Pressable>
                    <Button style={{flex: 1, float: 'right', padding: 10}} title={'Add'} onPress={fnc === "addToLog" ? addToLog : addToMeal}/>
                </View>

                {/* Title */}
                <View style={{padding: 10}}>
                    <Text style={{fontSize: 30, padding: 20, textAlign: 'center'}}>{food.name}</Text>
                    <Text style={{textAlign:'center'}}>{food.brand}</Text>
                </View>

                {/* Values */}
                <View style={{padding: 5, flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                        <Text style={{textAlign: 'center', fontSize: 20}}>{`${parseFloat((amount * food.calories / 100).toString()).toFixed(2)}\nCalories`}</Text>
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={{textAlign: 'center', fontSize: 20}}>{`${parseFloat((amount * food.carbs / 100).toString()).toFixed(2)}\nCarbs`}</Text>
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={{textAlign: 'center', fontSize: 20}}>{`${parseFloat((amount * food.fat / 100).toString()).toFixed(2)}\nFat`}</Text>
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={{textAlign: 'center', fontSize: 20}}>{`${parseFloat((amount * food.protein / 100).toString()).toFixed(2)}\nProtein`}</Text>
                    </View>
                </View>
                
                <View style={{borderBottomColor: 'black', borderBottomWidth: 1, marginLeft: 20, marginRight: 20}}/>
                {/* Details */}
                <View style={{flexDirection: 'row', width: 300, padding: 20}}>
                    <View style={{flex: 1, float: 'left', paddingLeft: 100, justifyContent: 'center'}}>
                        <Text style={{fontSize: 20}}>Amount</Text>
                    </View>
                    <View style={{flex:1, float: 'right', alignItems: 'flex-end'}}>
                        <TextInput style={{...styles.input, width: 50, fontSize: 15}} defaultValue={amount} onChangeText={onChangeAmount}/>
                    </View> 
                </View>
                
            <View style={{borderBottomColor: 'black', borderBottomWidth: 1, marginLeft: 20, marginRight: 20}}/>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default FoodDetails