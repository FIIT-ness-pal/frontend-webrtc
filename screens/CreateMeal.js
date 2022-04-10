import React from 'react'
import { TouchableWithoutFeedback, Keyboard, SafeAreaView, Text, Pressable, View, Button, TextInput, FlatList } from 'react-native'
import styles from '../config/styles'

const Item = ({ title, brand, calories }) => (
    <View style={{padding: 10, flexDirection: 'row'}}>
        <View style={{flex: 1, float: 'left'}}>
            <Text style={{fontSize: 20}}>{title}</Text>
            <Text>{brand}</Text>
            <Text>{calories}</Text>
        </View>
        <View style={{flex: 1, float: 'right', alignItems: 'flex-end'}}>
            <Text style>Amount</Text>
            <TextInput style={{...styles.input, width: 50,}} keyboardType='number-pad'/>
        </View>
        <View style={{flex: 0.2, float: 'right', justifyContent: 'center'}}>
            <Button title={'X'} style={{}}/>
        </View>
    </View>
  );

const CreateMeal = ({navigation}) => {
    const [mealName, setMealName] = React.useState('')
    const [mealDescription, setMealDescription] = React.useState('')
    const [calories, setCalories] = React.useState(0)
    const [protein, setProtein] = React.useState(0)
    const [carbs, setCarbs] = React.useState(0)
    const [fat, setFat] = React.useState(0)

    const data = [
        {
            "name": "Strawberry",
            "brand": "",
            "amount": 20,
            "calories": 100,
            "carbs": 100,
            "fat": 100,
            "protein": 100
        },
        {
            "name": "Banana",
            "brand": "",
            "amount": 20,
            "calories": 100,
            "carbs": 100,
            "fat": 100,
            "protein": 100
        }
    ]

    const renderItem = ({ item }) => (
        <Item title={item.name} brand={item.brand} calories={item.calories} />
      );

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView>
                {/* Top buttons */}
                <View style={{flexDirection:'row'}}>
                    <Pressable onPress={() => { navigation.goBack() }} style={{flex: 1, float: 'left'}}>
                        <Text style={{ fontSize: 30, textAlignVertical: 'top', padding: 10 }}>{'< Back'}</Text>
                    </Pressable>
                    <Button style={{flex: 1, float: 'right', padding: 10}} title={'Create'} />
                </View>
                {/* Meal details */}
                <View style={{padding: 20}}>
                    <Text style={{fontSize: 20}}>Meal name</Text>
                    <TextInput style={{...styles.input, width: '100%'}} />
                </View>
                <View style={{padding: 20, paddingTop: -10}}>
                    <Text style={{fontSize: 20}}>Short description</Text>
                    <TextInput style={{...styles.input, width: '100%'}} />
                </View>
                {/* Values */}
                <View style={{padding: 20}}>
                    <Text style={{fontSize: 20, paddingBottom: 15}}>Values</Text>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 1}}>
                            <Text style={{fontSize: 20, textAlign: 'center'}}>{`${calories}\nCalories`}</Text>
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={{fontSize: 20, textAlign: 'center'}}>{`${carbs}\nCarbs`}</Text>
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={{fontSize: 20, textAlign: 'center'}}>{`${fat}\nFat`}</Text>
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={{fontSize: 20, textAlign: 'center'}}>{`${protein}\nProtein`}</Text>
                        </View>
                    </View>
                </View>
                <View style={{borderBottomColor: 'black', borderBottomWidth: 1, margin: 10}} />
                {/* Ingredients */}
                <View style={{padding: 20}}>
                    <Text style={{fontSize: 20, paddingBottom: 15}}>Ingredients</Text>
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                    <Button title='Add food'/>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default CreateMeal