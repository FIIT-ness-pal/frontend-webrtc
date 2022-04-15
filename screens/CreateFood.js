import React, {useState} from 'react'
import { TouchableWithoutFeedback, Keyboard, SafeAreaView, Text, Pressable, View, Button, TextInput, FlatList, Modal, Switch } from 'react-native'
import { ScrollView } from 'react-native'
import styles from '../config/styles'

const Macro = ({title}) => {
    const [modalVisible, setModalVisible] = useState(false)
    const [amount, setAmount] = useState('0')
    const [text, onChangeText] = useState('')

    return (
        <View>
            {/* Details */}
            <View style={{flexDirection: 'row', marginBottom: 20}}>
                <View style={{flex: 1, float: 'left', justifyContent: 'center'}}>
                    <Text style={{fontSize: 20}}>{title}</Text>
                </View>
                <View style={{flex: 1, float: 'right', alignItems: 'flex-end'}}>
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
        </View>
    )
};

const CreateFood = ({navigation}) => {
    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView>
                <ScrollView>
                    {/* Top buttons */}
                    <View style={{flexDirection:'row'}}>
                        <Pressable onPress={() => { navigation.goBack() }} style={{flex: 1, float: 'left'}}>
                            <Text style={{ fontSize: 25, textAlignVertical: 'top', padding: 10 }}>{'< Back'}</Text>
                        </Pressable>
                        <Button style={{flex: 1, float: 'right', padding: 10}} title={'Create'} />
                    </View>

                    {/* Meal details */}
                    <View style={{ padding: 20 }}>
                        <Text style={{ fontSize: 20 }}>Food name</Text>
                        <TextInput style={{ ...styles.input, width: '100%' }} />
                    </View>
                    <View style={{ padding: 20, paddingTop: -10 }}>
                        <Text style={{ fontSize: 20 }}>Brand</Text>
                        <TextInput style={{ ...styles.input, width: '100%' }} />
                    </View>

                    <View style={{ padding: 20 }}>
                        <Text style={{ fontSize: 25, marginBottom: 30}}>Macro nutrients and calories</Text>
                        <Macro title={'Calories'} />
                        <Macro title={'Carbohydrates'} />
                        <Macro title={'Fat'} />
                        <Macro title={'Protein'} />
                        
                        <View style={{flexDirection: 'row', marginBottom: 10}}>
                            <View style={{flex: 1, float: 'left', justifyContent: 'center'}}>
                                <Text style={{fontSize: 20}}>Make public</Text>
                            </View>
                            <View style={{flex: 1, float: 'right', alignItems: 'flex-end'}}>
                                <Switch></Switch>
                            </View> 
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default CreateFood