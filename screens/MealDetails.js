import {View, Text, SafeAreaView, Pressable, Button, FlatList} from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const MealDetails = ({route, navigation}) => {
    const {id} = route.params
    const [meal, setMeal] = useState({name: "", description: "", calories: 0, carbs: 0, fat: 0, protein: 0, ingredients: [], firstName: "", lastName: ""})

    useEffect(async () => {
        console.log('https://fiitness-pal.ey.r.appspot.com/meals?id=' + id)
        const token = await AsyncStorage.getItem('@accessToken')
        if (token == null) {
            navigation.navigate('Login')
            return
        }
        let response
        try {
            response = await fetch('https://fiitness-pal.ey.r.appspot.com/meal?id=' + id, {
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
        setMeal(json.meal)
    }, [])

    const renderItem = ({ item }) => (
        <View style={{padding: 10, flexDirection: 'row'}}>
            <View style={{flex: 1, float: 'left'}}>
                <Text style={{fontSize: 15}}>{item.name}</Text>
                <Text>{item.brand}</Text>
                <Text>{item.calories}</Text>
            </View>
            <View style={{flex: 1, float: 'right'}}> 
                <Text style={{fontSize: 15, textAlign: 'right'}}>{item.amount} g</Text>
            </View>
        </View>
      );
    return(
        <SafeAreaView>
            {/* Top buttons */}
            <View style={{flexDirection:'row'}}>
                <Pressable onPress={() => { navigation.goBack() }} style={{flex: 1, float: 'left'}}>
                    <Text style={{ fontSize: 25, textAlignVertical: 'top', padding: 10 }}>{'< Back'}</Text>
                </Pressable>
                <Button style={{flex: 1, float: 'right', padding: 10}} title={'Add'} />
            </View>
            {/* Title */}
            <View style={{padding: 10}}>
                <Text style={{fontSize: 30, padding: 20, textAlign: 'center'}}>{meal.name}</Text>
                <Text style={{textAlign:'right'}}>Name Surname</Text>
            </View>
            {/* Values */}
            <View style={{padding: 5, flexDirection: 'row', borderBottomColor: 'black'}}>
                <View style={{flex: 1}}>
                    <Text style={{textAlign: 'center', fontSize: 20}}>{`${meal.calories}\nCalories`}</Text>
                </View>
                <View style={{flex: 1}}>
                    <Text style={{textAlign: 'center', fontSize: 20}}>{`${meal.carbs}\nCarbs`}</Text>
                </View>
                <View style={{flex: 1}}>
                    <Text style={{textAlign: 'center', fontSize: 20}}>{`${meal.fat}\nFat`}</Text>
                </View>
                <View style={{flex: 1}}>
                    <Text style={{textAlign: 'center', fontSize: 20}}>{`${meal.protein}\nProtein`}</Text>
                </View>
            </View>
            <View style={{borderBottomColor: 'black', borderBottomWidth: '1px', marginLeft: 20, marginRight: 20, paddingTop: 20}}/>
            {/* Details */}
            <View style={{padding: 10}}>
                <Text style={{fontSize: 20}}>Description:</Text>
                <Text style={{fontSize: 15, padding: 20}}>{meal.description}</Text>
            </View>
            <View style={{borderBottomColor: 'black', borderBottomWidth: '1px', marginLeft: 20, marginRight: 20}}/>
            {/* Ingredients */}
            <View style={{padding: 10}}>
                <Text style={{fontSize: 20}}>Ingredients:</Text>
                <FlatList
                    data={meal.ingredients}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>
        </SafeAreaView>
    )
}

export default MealDetails