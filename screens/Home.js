import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Button, SafeAreaView, FlatList, TouchableOpacity, Modal } from 'react-native'
import colors from '../config/colors'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Item = ({ time, title, calories, id, carbs, protein, fat }) => {
    const [modalVisible, setModalVisible] = useState(false)

    const deleteFromLog = () => {
        
    }

    return (
        <View>
            <TouchableOpacity style={{ backgroundColor: colors.primary, borderRadius: 5, marginBottom: 10, width: 300}} onPressOut={() => setModalVisible(true)}>
                <View style={{flexDirection: 'row', width: 300 }}>
                    <View style={{ float: 'left', flex: 1 }}>
                        <Text style={{ textAlign: 'left', fontSize: 20, paddingLeft: 10 }}>{`${time.split(':')[0]}:${time.split(':')[1]}`}</Text>
                    </View>
                    <View style={{ float: 'left', flex: 1 }}>
                        <Text style={{ textAlign: 'right', fontSize: 20, paddingRight: 10 }}>{calories} cal</Text>
                    </View>
                </View>
                <View style={{ float: 'center', flex: 1 }}>
                    <Text style={{ textAlign: 'center', fontSize: 20 }} numberOfLines={2}>{title}</Text>
                </View>
            </TouchableOpacity>

            <Modal animationType="none" transparent={true} visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={{textAlign: 'center', fontSize: 25, marginBottom: 10}}>Details</Text>
                        <View style={{flexDirection: 'row', alignItems:'center'}}>
                            <View style={{ flex: 1}}> 
                                <Text style={{textAlign: 'center', fontSize: 20}}>Carbs: {carbs}</Text>
                            </View>
                            <View style={{ flex: 1}}>
                                <Text style={{textAlign:'center', fontSize: 20}}>Protein: {protein}</Text>
                            </View>
                            <View style={{flex: 1}}>
                                <Text style={{textAlign: 'center', fontSize: 20}}>Fat: {fat}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Button style={{flex: 1}} title="Cancel" onPress={() => {setModalVisible(false)}}/>  
                            <Button style={{flex: 1}} title="Delete from log" onPress={() => {setModalVisible(false); deleteFromLog}}/>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
};


const Homescreen = ({ navigation }) => {
    const [greeting, setGreeting] = useState('')
    const [caloriesGoal, setCaloriesGoal] = useState(0)
    const [values, setValues] = useState(0)
    const [date, setDate] = useState(new Date())
    const [logs, setLogs] = useState([])
    const hour = new Date().getHours()

    /* Get the name and caloriesGoal of the user */
    useEffect(async () => {
        const token = await AsyncStorage.getItem('@accessToken')
        if (token == null) {
            navigation.navigate('Login')
            return
        }
        let response
        try {
            response = await fetch('https://fiitness-pal.ey.r.appspot.com/user', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            })
        }
        catch (error) {
            console.log('GET /user', error)
        }
        let json
        try {
            json = await response.json()
        }
        catch (error) {
            console.log('JSON /user', response)
            return
        }
        console.log(json.message.firstName)
        if (json.status == 200) {
            setCaloriesGoal(json.message.caloriesGoal)
        }

        if (hour < 11)
            setGreeting(`Good morning, ${json.message.firstName}.\nWhat did you have for breakfast?`)
        else if (hour < 16)
            setGreeting(`Hello, ${json.message.firstName}.\nWhat did you have for lunch?`)
        else
            setGreeting(`Good evening, ${json.message.firstName}.\nWhat did you have for dinner?`)
    }, [])

    /* Update values */
    useEffect(() => {
        let totalCalories = 0
        let totalCarbs = 0
        let totalProtein = 0
        let totalFat = 0
        logs.forEach(log => {
            totalCalories += log.calories
            totalCarbs += log.carbs
            totalProtein += log.protein
            totalFat += log.fat
        })
        setValues({ calories: parseFloat(totalCalories.toString()).toFixed(2), carbs: parseFloat(totalCarbs.toString()).toFixed(2), protein: parseFloat(totalProtein.toString()).toFixed(2), fat: parseFloat(totalFat.toString()).toFixed(2) })
    }, [logs])

    /* Get the logs of the day */
    useEffect(async () => {
        const myDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
       const token = await AsyncStorage.getItem('@accessToken')
        if (token == null) {
            navigation.navigate('Login')
            return
        }
        let response
        try {
            response = await fetch(`https://fiitness-pal.ey.r.appspot.com/log?date=${myDate}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            })
        }
        catch (error) {
            console.log('GET /logs', error)
        }
        let json
        try {
            json = await response.json()
        }
        catch (error) {
            console.log('JSON /logs', JSON.stringify(response))
            return
        }
        if (json.status == 200) {
            setLogs(json.logs)
        }
    }, [date])

    const logsBack = () => {
        const newDate = new Date(date)
        newDate.setDate(newDate.getDate() - 1)
        setDate(newDate)
    }

    const logsForward = () => {
        const newDate = new Date(date)
        newDate.setDate(newDate.getDate() + 1)
        setDate(newDate)
    }

    const renderItem = ({ item }) => {
        return (
            <Item
                item={item}
                title={item.name}
                calories={item.calories}
                time={item.time}
                id={item.id}
                carbs={item.carbs}
                protein={item.protein}
                fat={item.fat}
            />
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Top message */}
            <View style={{ top: 10, backgroundColor: colors.primary, padding: 10, borderRadius: 5 }}>
                <Text style={styles.text}>{greeting}</Text>
                <Button title='Add to log' />
            </View>
            {/* Intake */}
            <View style={{ alignItems: 'center', paddingTop: 50 }}>
                <Text style={{ fontSize: 40 }}>Your intake</Text>
                <Text style={{ fontSize: 70 }}>{`${values.calories} /\n${caloriesGoal}`}</Text>
            </View>
            {/* Detailed intake */}
            <View style={{ alignContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                <View style={{ padding: 10, textAlign: 'center' }}>
                    <Text style={{ textAlign: 'center', fontSize: 20 }}>
                        {`${values.carbs}\nCarbs`}
                    </Text>
                </View>
                <View style={{ padding: 10 }}>
                    <Text style={{ textAlign: 'center', fontSize: 20 }}>
                        {`${values.fat}\nFat`}
                    </Text>
                </View>
                <View style={{ padding: 10 }}>
                    <Text style={{ textAlign: 'center', fontSize: 20 }}>
                        {`${values.protein}\nProtein`}
                    </Text>
                </View>
            </View>
            {/* Logs */}
            <View style={{ flexDirection: 'row', }}>
                <Pressable style={{ float: 'left', flex: 1, marginLeft: 30}} onPressOut={() => logsBack()}>
                    <Text style={{ textAlign: 'left', fontSize: 40 }}>{'<'}</Text>
                </Pressable>
                <View style={{ float: 'center', flex: 1 }}>
                    <Text style={{ fontSize: 20, textAlign: 'center' }}>{`History\n${date.getDate()}.${date.getMonth() + 1}. ${date.getFullYear()}`}</Text>
                </View>
                <Pressable style={{ float: 'right', flex: 1, marginRight: 30,  }} disabled={date.getDate() == new Date().getDate() && date.getMonth() == new Date().getMonth() && date.getFullYear() == new Date().getFullYear() ? true : false} onPressOut={() => logsForward()}>
                    <Text style={{ textAlign: 'right', fontSize: 40, color:  date.getDate() == new Date().getDate() && date.getMonth() == new Date().getMonth() && date.getFullYear() == new Date().getFullYear() ? 'white' : 'black'}}>{'>'}</Text>
                </Pressable>
            </View>
            <View>
                <View>
                    <FlatList
                        data={logs}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        alignContent: 'center',
    },
    text: {
        fontSize: 20,
    },
    centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22,
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 10,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	},
})

export default Homescreen