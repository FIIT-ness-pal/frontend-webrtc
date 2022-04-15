import React, { useState } from 'react'
import { TouchableWithoutFeedback, Keyboard, SafeAreaView, Text, Pressable, View, Button, TextInput, FlatList, Modal } from 'react-native'
import styles from '../config/styles'


const Item = ({ title, brand, calories }) => {
    const [modalVisible, setModalVisible] = useState(false)
    const [amount, setAmount] = useState('0')
    const [text, onChangeText] = useState('')
    
    return (
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
                        <TextInput style={{...styles.input, width: 100, margin: 10}} autoFocus={true} onChangeText={onChangeText} keyboardType='number-pad' />
                        <View style={{flexDirection:'row'}}>
                            <Button style={{flex: 1}} title="Cancel" onPress={() => {setModalVisible(false)}}/>  
                            <Button style={{flex: 1}} title="Confirm" onPress={() => {setAmount(text); setModalVisible(false)}}/>
                        </View>
                    </View>
                </View>
            </Modal>

            <View style={{flex: 1, float: 'left'}}>
                <Text style={{fontSize: 20}}>{title}</Text>
                <Text>{brand}</Text>
                <Text>{calories} cal</Text>
            </View>

            <View style={{flex: 1, float: 'right', alignItems: 'flex-end'}}>
                <Text style>Amount</Text>
                <TextInput style={{...styles.input, width: 50, fontSize: 15}} editable={false} defaultValue={amount} onPressOut={() => {setModalVisible(true)}}/>
            </View>

            <View style={{flex: 0.2, float: 'right', justifyContent: 'center'}}>
                <Button title={'X'} style={{}}/>
            </View>
        </View>
    )
};

const CreateMeal = ({ navigation }) => {
    const [mealName, setMealName] = React.useState('')
    const [mealDescription, setMealDescription] = React.useState('')
    const [calories, setCalories] = React.useState(0)
    const [protein, setProtein] = React.useState(0)
    const [carbs, setCarbs] = React.useState(0)
    const [fat, setFat] = React.useState(0)

    const data = [
        {
            "id": 0,
            "name": "Strawberry",
            "brand": "",
            "amount": 20,
            "calories": 100,
            "carbs": 100,
            "fat": 100,
            "protein": 100
        },
        {
            "id": 1,
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

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView>
                {/* Top buttons */}
                <View style={{ flexDirection: 'row' }}>
                    <Pressable onPress={() => { navigation.goBack() }} style={{ flex: 1, float: 'left' }}>
                        <Text style={{ fontSize: 25, textAlignVertical: 'top', padding: 10 }}>{'< Back'}</Text>
                    </Pressable>
                    <Button style={{ flex: 1, float: 'right', padding: 10 }} title={'Create'} />
                </View>
                {/* Meal details */}
                <View style={{ padding: 20 }}>
                    <Text style={{ fontSize: 20 }}>Meal name</Text>
                    <TextInput style={{ ...styles.input, width: '100%' }} />
                </View>
                <View style={{ padding: 20, paddingTop: -10 }}>
                    <Text style={{ fontSize: 20 }}>Short description</Text>
                    <TextInput style={{ ...styles.input, width: '100%' }} />
                </View>
                {/* Values */}
                <View style={{ padding: 20 }}>
                    <Text style={{ fontSize: 20, paddingBottom: 15 }}>Values</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}>{`${calories}\nCalories`}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}>{`${carbs}\nCarbs`}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}>{`${fat}\nFat`}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}>{`${protein}\nProtein`}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, margin: 10 }} />
                {/* Ingredients */}
                <View style={{ padding: 20 }}>
                    <Text style={{ fontSize: 20, paddingBottom: 15 }}>Ingredients</Text>
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                    <Button title='Add food' />
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default CreateMeal