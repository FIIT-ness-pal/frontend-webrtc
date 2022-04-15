import React, {useState} from 'react'
import { TouchableWithoutFeedback, Keyboard, SafeAreaView, Text, Pressable, View, Button, TextInput, FlatList, Modal } from 'react-native'
import styles from '../config/styles'


const FoodDetails = ({navigation}) => {
    let food = {         
        "id": "eff39dd1-19eb-4094-8fef-bab28c3e2665",
        "name": "Frosted flakes",         
        "brand": "Kelloggs",         
        "description": "",         
        "calories": 382.35,         
        "carbs": 88.24,         
        "fat": 0,         
        "protein": 5.88,         
        "isPublic": true     
    }

    const [modalVisible, setModalVisible] = useState(false)
    const [amount, setAmount] = useState('0')
    const [text, onChangeText] = useState('')


    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                    <Text style={{fontSize: 30, padding: 20, textAlign: 'center'}}>{food.name}</Text>
                    <Text style={{textAlign:'center'}}>{food.brand}</Text>
                </View>

                {/* Values */}
                <View style={{padding: 5, flexDirection: 'row', borderBottomColor: 'black', borderBottomWidth: 1, marginBottom: 50}}>
                    <View style={{flex: 1}}>
                        <Text style={{textAlign: 'center', fontSize: 20}}>{`${food.calories}\nCalories`}</Text>
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={{textAlign: 'center', fontSize: 20}}>{`${food.carbs}\nCarbs`}</Text>
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={{textAlign: 'center', fontSize: 20}}>{`${food.fat}\nFat`}</Text>
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={{textAlign: 'center', fontSize: 20}}>{`${food.protein}\nProtein`}</Text>
                    </View>
                </View>

                {/* Details */}
                <View style={{flexDirection: 'row', width: 300, marginBottom: 10}}>
                    <View style={{flex: 1, float: 'left', paddingLeft: 100, justifyContent: 'center'}}>
                        <Text style={{fontSize: 20}}>Amount</Text>
                    </View>
                    <View style={{flex:1, float: 'right', alignItems: 'flex-end'}}>
                        <TextInput style={{...styles.input, width: 50, fontSize: 15}} editable={false} defaultValue={amount} onPressOut={() => {setModalVisible(true)}}/>
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
                                <Button style={{flex: 1}} title="Confirm" onPress={() => {setAmount(text); setModalVisible(false)}}/>
                            </View>
                        </View>
                    </View>
                </Modal>

            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default FoodDetails