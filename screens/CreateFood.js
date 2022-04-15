import React, {useState} from 'react'
import { TouchableWithoutFeedback, Keyboard, SafeAreaView, Text, Pressable, View, Button, TextInput, FlatList, Modal } from 'react-native'
import styles from '../config/styles'


const CreateFood = ({navigation}) => {
    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView>
                 {/* Top buttons */}
                 <View style={{flexDirection:'row'}}>
                    <Pressable onPress={() => { navigation.goBack() }} style={{flex: 1, float: 'left'}}>
                        <Text style={{ fontSize: 25, textAlignVertical: 'top', padding: 10 }}>{'< Back'}</Text>
                    </Pressable>
                    <Button style={{flex: 1, float: 'right', padding: 10}} title={'Create'} />
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default CreateFood