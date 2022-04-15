import React, {useState} from 'react'
import { TouchableWithoutFeedback, Keyboard, SafeAreaView, Text, Pressable, View, Button, TextInput, FlatList, Modal, Switch } from 'react-native'
import { ScrollView } from 'react-native'
import styles from '../config/styles'

const Macro = ({title}) => {

    return (
        <View>

        </View>
    )
};

const CreateFood = ({navigation}) => {
    const [modalVisible, setModalVisible] = useState(false)
    const [amount, setAmount] = useState('0')
    const [text, onChangeText] = useState('')
    const [option, setOption] = useState('')

    const [foodName, onChangeName] = useState('');
    const [brand, onChangeBrand] = useState('');
    const [description, onChangeDescription] = useState('');

    const [calories, setCalories] = useState(0);
    const [carbs, setCarbs] = useState(0);
    const [fat, setFat] = useState(0);
    const [protein, setProtein] = useState(0);

    const [isEnabled, setIsEnabled] = useState(false);

    const postFood = () => {
        if(foodName.length == 0) {
            alert('Please enter a name for the food');
            return;
        }

        let body = {
            "name": foodName,
            "description": description,
            "brand": brand,
            "calories": calories == "" ? 0 : calories,
            "carbs": carbs == "" ? 0 : carbs,
            "protein": protein == "" ? 0 : protein,
            "fat": fat == "" ? 0 : fat,
            "isPublic": isEnabled
        }
        
        
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
                                <TextInput style={{...styles.input, width: 50, fontSize: 15}} editable={false} defaultValue={calories.toString()} onPressOut={() => {setModalVisible(true), setOption('Calories')}}/>
                            </View> 
                        </View>

                        <View style={{flexDirection: 'row', marginBottom: 20}}>
                            <View style={{flex: 1, float: 'left', justifyContent: 'center'}}>
                                <Text style={{fontSize: 20}}>Carbs</Text>
                            </View>
                            <View style={{flex: 1, float: 'right', alignItems: 'flex-end'}}>
                                <TextInput style={{...styles.input, width: 50, fontSize: 15}} editable={false} defaultValue={carbs.toString()} onPressOut={() => {setModalVisible(true), setOption('Carbs')}}/>
                            </View> 
                        </View>

                        <View style={{flexDirection: 'row', marginBottom: 20}}>
                            <View style={{flex: 1, float: 'left', justifyContent: 'center'}}>
                                <Text style={{fontSize: 20}}>Fat</Text>
                            </View>
                            <View style={{flex: 1, float: 'right', alignItems: 'flex-end'}}>
                                <TextInput style={{...styles.input, width: 50, fontSize: 15}} editable={false} defaultValue={fat.toString()} onPressOut={() => {setModalVisible(true), setOption('Fat')}}/>
                            </View> 
                        </View>

                        <View style={{flexDirection: 'row', marginBottom: 20}}>
                            <View style={{flex: 1, float: 'left', justifyContent: 'center'}}>
                                <Text style={{fontSize: 20}}>Protein</Text>
                            </View>
                            <View style={{flex: 1, float: 'right', alignItems: 'flex-end'}}>
                                <TextInput style={{...styles.input, width: 50, fontSize: 15}} editable={false} defaultValue={protein.toString()} onPressOut={() => {setModalVisible(true), setOption('Protein')}}/>
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