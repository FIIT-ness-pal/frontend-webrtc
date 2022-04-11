import React from 'react'
import {View, Text, SafeAreaView, Pressable, Button, FlatList} from 'react-native'

const MealDetails = ({navigation}) => {
    const meal = {
        "id": "b601b5ee-4bd0-4db2-83b4-7d27d6e1d701",
        "name": "Grilled chicken with basmati rice",
        "description": "Very tasty chicken yum yum ",
        "calories": 1,
        "carbs": 1,
        "fat": 1,
        "protein": 1,
        "isPublic": true,
        "ingredients": [
            {
                "id": "99527d7f-df31-40e7-9e95-408260f2b48c",
                "name": "Grilled chicken",
                "amount": 20,
                "calories": 100,
                "carbs": 100,
                "fat": 100,
                "protein": 100
            },
            {
                "id": "bca1ce1d-f226-4932-afeb-844342e37875",
                "name": "Basmati rice",
                "amount": 20,
                "calories": 100,
                "carbs": 100,
                "fat": 100,
                "protein": 100
            }
        ]
    }
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