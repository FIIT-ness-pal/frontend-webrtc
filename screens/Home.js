import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Button, SafeAreaView, FlatList } from 'react-native'
import colors from '../config/colors'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const Item = ({ time, title, calories }) => (
    <View style={{ backgroundColor: colors.primary, borderRadius: 5, marginBottom: 10, flexDirection: 'row', width: 300 }}>
        <View style={{ float: 'left', flex: 1 }}>
            <Text style={{ textAlign: 'left', fontSize: 20, paddingLeft: 10 }}>{`${time.split(':')[0]}:${time.split(':')[1]}`}</Text>
        </View>
        <View style={{ float: 'center', flex: 1 }}>
            <Text style={{ textAlign: 'center', fontSize: 20 }}>{title}</Text>
        </View>
        <View style={{ float: 'left', flex: 1 }}>
            <Text style={{ textAlign: 'right', fontSize: 20, paddingRight: 10 }}>{calories}</Text>
        </View>
    </View>
);


const Homescreen = ({ navigation }) => {
    const [greeting, setGreeting] = useState('')
    const [totalCalories, setTotalCalories] = useState(0)
    const [totalProtein, setTotalProtein] = useState(0)
    const [totalCarbs, setTotalCarbs] = useState(0)
    const [totalFat, setTotalFat] = useState(0)

    const today = new Date()
    const hour = 0

    const user = {
        "id": "b05f7ef7-ad07-4a25-8363-cdeafd369d62",
        "firstName": "Adam",
        "lastName": "Blahovič",
        "email": "xblahovic@stuba.sk",
        "weight": 100,
        "height": 100,
        "birthDate": "1998-10-10T02:00:00.000Z",
        "caloriesGoal": 4200
    }

    const logs = [
        {
            "id": "c31ab0e9-3180-482b-a88a-b647fa22905d",
            "name": "Apple",
            "amount": 100,
            "calories": 100,
            "carbs": 10,
            "fat": 10,
            "protein": 10,
            "date": "2022-03-30",
            "time": "10:59:40"
        },
        {
            "id": "c31ab0e9-3180-482b-a88a-b647fa22905e",
            "name": "Orange",
            "amount": 100,
            "calories": 100,
            "carbs": 10,
            "fat": 10,
            "protein": 10,
            "date": "2022-03-30",
            "time": "12:59:40"
        }
    ]

    const logsBack = () => {
        console.log('back')
    }

    const logsForward = () => {
        console.log('forward')
    }

    const renderItem = ({ item }) => {
        return (
            <Item
                item={item}
                title={item.name}
                calories={item.calories}
                time={item.time}
            />
        );
    };

    useEffect(() => {
        if (hour < 11)
            setGreeting(`Good morning, ${user.firstName}.\nWhat did you have for breakfast?`)
        else if (hour < 16)
            setGreeting(`Hello, ${user.firstName}.\nWhat did you have for lunch?`)
        else
            setGreeting(`Good evening, ${user.firstName}.\nWhat did you have for dinner?`)

        let totalCalories = 0
        let totalCarbs = 0
        let totalFat = 0
        let totalProtein = 0

        logs.forEach(log => {
            totalCalories += log.calories
            totalCarbs += log.carbs
            totalFat += log.fat
            totalProtein += log.protein
        })
        setTotalCalories(totalCalories)
        setTotalCarbs(totalCarbs)
        setTotalFat(totalFat)
        setTotalProtein(totalProtein)
    })

    return (
        <SafeAreaView style={styles.container}>
            {/* Top message */}
            <View style={{ top: 10, backgroundColor: colors.primary, padding: 10, borderRadius: 5 }}>
                <Text style={styles.text}>{greeting}</Text>
                <Button title='Log meal' />
            </View>
            {/* Intake */}
            <View style={{ alignItems: 'center', paddingTop: 50 }}>
                <Text style={{ fontSize: 40 }}>Your intake</Text>
                <Text style={{ fontSize: 70 }}>{`${totalCalories} /\n${user.caloriesGoal}`}</Text>
            </View>
            {/* Detailed intake */}
            <View style={{ alignContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                <View style={{ padding: 10, textAlign: 'center' }}>
                    <Text style={{ textAlign: 'center', fontSize: 20 }}>
                        {`${totalCarbs}\nCarbs`}
                    </Text>
                </View>
                <View style={{ padding: 10 }}>
                    <Text style={{ textAlign: 'center', fontSize: 20 }}>
                        {`${totalFat}\nFat`}
                    </Text>
                </View>
                <View style={{ padding: 10 }}>
                    <Text style={{ textAlign: 'center', fontSize: 20 }}>
                        {`${totalProtein}\nProtein`}
                    </Text>
                </View>
            </View>
            {/* Logs */}
            <View style={{ paddingTop: 20 }}>
                <View style={{ flexDirection: 'row', }}>
                    <Pressable style={{ float: 'left', flex: 1 }} onPressOut={() => logsBack()}>
                        <Text style={{ textAlign: 'left', fontSize: 40 }}>{'<'}</Text>
                    </Pressable>
                    <View style={{ float: 'center', flex: 1 }}>
                        <Text style={{ fontSize: 25, textAlign: 'center' }}>{`History\n${today.getDate()}.${today.getMonth() + 1}. ${today.getFullYear()}`}</Text>
                    </View>
                    <Pressable style={{ float: 'right', flex: 1, }}  onPressOut={() => logsForward()}>
                        <Text style={{ textAlign: 'right', fontSize: 40 }}>{'>'}</Text>
                    </Pressable>
                </View>
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
    }
})

export default Homescreen