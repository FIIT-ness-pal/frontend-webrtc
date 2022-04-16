import React, {useState} from 'react'
import { TouchableWithoutFeedback, Keyboard, SafeAreaView, Text, Pressable, View, Button, TextInput, FlatList, Modal, Switch } from 'react-native'
import { ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import styles from '../config/styles'

const CreateFood = ({navigation}) => {
    const [modalVisible, setModalVisible] = useState(false)
    const [amount, setAmount] = useState('0')
    const [text, onChangeText] = useState('')
    const [option, setOption] = useState('')

    const [foodName, onChangeName] = useState('');
    const [brand, onChangeBrand] = useState('');
    const [description, onChangeDescription] = useState('');

    const [calories, onChangeCalories] = useState(0);
    const [carbs, onChangeCarbs] = useState(0);
    const [fat, onChangeFat] = useState(0);
    const [protein, onChangeProtein] = useState(0);

    const [isEnabled, setIsEnabled] = useState(false);

    const postFood = async () => {
        if(foodName.length == 0) {
            alert('Please enter a name for the food');
            return;
        }

        let body = {
            "name": foodName,
            "description": description,
            "brand": brand,
            "calories": calories == "" ? 0 : Number(calories),
            "carbs": carbs == "" ? 0 : Number(carbs),
            "protein": protein == "" ? 0 : Number(protein),
            "fat": fat == "" ? 0 : Number(fat),
            "isPublic": isEnabled
        }
        
        const token = await AsyncStorage.getItem('@accessToken')
        if (token == null) {
            navigation.navigate('Login')
            return
        }

        let response
        try {
            response = await fetch('https://fiitness-pal.ey.r.appspot.com/food', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                },
                body: JSON.stringify(body)
            })
        } catch (error) {
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
        navigation.navigate('Home')
    }

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView>
                <ScrollView>
                    {/* Top buttons */}
                    <View style={{flexDirection:'row'}}>
                        <Pressable onPress={() => { navigation.goBack() }} style={{flex: 1, float: 'left'}}>
                            <Text style={{ fontSize: 25, textAlignVertical: 'top', padding: 10 }}>{'< Back'}</Text>
                        </Pressable>
                        <Button style={{flex: 1, float: 'right', padding: 10}} title={'Create'} onPress={postFood} />
                    </View>

                    {/* Meal details */}
                    <View style={{ padding: 20 }}>
                        <Text style={{ fontSize: 20 }}>Food name</Text>
                        <TextInput style={{ ...styles.input, width: '100%' }} onChangeText={onChangeName} />
                    </View>
                    <View style={{ padding: 20, paddingTop: -10 }}>
                        <Text style={{ fontSize: 20 }}>Brand</Text>
                        <TextInput style={{ ...styles.input, width: '100%' }} onChangeText={onChangeBrand} />
                    </View>
                    <View style={{ padding: 20, paddingTop: -10 }}>
                        <Text style={{ fontSize: 20 }}>Description</Text>
                        <TextInput style={{ ...styles.input, width: '100%' }} onChangeText={onChangeDescription} />
                    </View>

                    <View style={{ padding: 20 }}>
                        <Text style={{ fontSize: 25, marginBottom: 30}}>Macro nutrients and calories</Text>

                        {/* Details */}
                        <View style={{flexDirection: 'row', marginBottom: 20}}>
                            <View style={{flex: 1, float: 'left', justifyContent: 'center'}}>
                                <Text style={{fontSize: 20}}>Calories</Text>
                            </View>
                            <View style={{flex: 1, float: 'right', alignItems: 'flex-end'}}>
                                <TextInput style={{...styles.input, width: 50, fontSize: 15}} keyboardType={'number-pad'} value={calories.toString()} onChangeText={onChangeCalories} />
                            </View> 
                        </View>

                        <View style={{flexDirection: 'row', marginBottom: 20}}>
                            <View style={{flex: 1, float: 'left', justifyContent: 'center'}}>
                                <Text style={{fontSize: 20}}>Carbs</Text>
                            </View>
                            <View style={{flex: 1, float: 'right', alignItems: 'flex-end'}}>
                                <TextInput style={{...styles.input, width: 50, fontSize: 15}} keyboardType={'number-pad'} value={carbs.toString()} onChangeText={onChangeCarbs} />
                            </View> 
                        </View>

                        <View style={{flexDirection: 'row', marginBottom: 20}}>
                            <View style={{flex: 1, float: 'left', justifyContent: 'center'}}>
                                <Text style={{fontSize: 20}}>Fat</Text>
                            </View>
                            <View style={{flex: 1, float: 'right', alignItems: 'flex-end'}}>
                                <TextInput style={{...styles.input, width: 50, fontSize: 15}} keyboardType={'number-pad'} value={fat.toString()} onChangeText={onChangeFat} />
                            </View> 
                        </View>

                        <View style={{flexDirection: 'row', marginBottom: 20}}>
                            <View style={{flex: 1, float: 'left', justifyContent: 'center'}}>
                                <Text style={{fontSize: 20}}>Protein</Text>
                            </View>
                            <View style={{flex: 1, float: 'right', alignItems: 'flex-end'}}>
                                <TextInput style={{...styles.input, width: 50, fontSize: 15}} keyboardType={'number-pad'} value={protein.toString()} onChangeText={onChangeProtein} />
                            </View> 
                        </View>

                        {/* Modal */}
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
                                        <Button style={{flex: 1}} title="Confirm" onPress={() => { 
                                            if(option == 'Calories') {
                                                setCalories(text);
                                            } else if (option == 'Carbs') {
                                                setCarbs(text);
                                            } else if (option == 'Fat') {
                                                setFat(text);
                                            } else if (option == 'Protein') {
                                                setProtein(text);
                                            }

                                            setModalVisible(false);
                                        }}/>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                        
                        <View style={{flexDirection: 'row', marginBottom: 10}}>
                            <View style={{flex: 1, float: 'left', justifyContent: 'center'}}>
                                <Text style={{fontSize: 20}}>Make public</Text>
                            </View>
                            <View style={{flex: 1, float: 'right', alignItems: 'flex-end'}}>
                                <Switch trackColor={{ false: "#767577", true: "#81b0ff" }} onValueChange={setIsEnabled} value={isEnabled}/>
                            </View> 
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default CreateFood