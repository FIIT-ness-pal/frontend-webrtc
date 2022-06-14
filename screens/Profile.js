import React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, Image, Button, StyleSheet, TouchableWithoutFeedback, Keyboard, SafeAreaView, TextInput, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({navigation}) => {

    const [user, setUser] = useState({
        "caloriesGoal": 0,
        "email": "",
        "firstName": "",
        "height": 0,
        "lastName": "",
        "weight": 0,
    });

    const [image, setImage] = useState('https://i.ibb.co/0Gq2600/avatar.png');
    const [firstName, onChangeFirstName] = useState(null)
    const [lastName, onChangeLastName] = useState(null)
    const [email, onChangeEmail] = useState(null)
    const [password, onChangePassword] = useState(null)
    const [passwordConfirm, onChangePasswordConfirm] = useState(null)
    const [weight, onChangeWeight] = useState(null)
    const [height, onChangeHeight] = useState(null)
    const [caloriesGoal, onChangeCaloriesGoal] = useState(null)

    useEffect(async () => {
        const token = await AsyncStorage.getItem('@accessToken');
        if (token == null) {
            navigation.navigate('Login');
            return;
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
            console.log(error)
        }
        let json
        try {
            json = await response.json()
        }
        catch {
            console.log(JSON.stringify(response))
        }
        setUser(json.message)
    }, [])

    useEffect(() => {
        onChangeFirstName(user.firstName)
        onChangeLastName(user.lastName)
        onChangeEmail(user.email)
        onChangeWeight(user.weight.toString())
        onChangeHeight(user.height.toString())
        onChangeCaloriesGoal(user.caloriesGoal.toString())
    }, [user])

    useEffect(async () => {
        if(user.id === undefined) {
            return
        }
        const token = await AsyncStorage.getItem('@accessToken');
        if (token == null) {
            navigation.navigate('Login');
            return
        }
        let response
        try {
            response = await fetch('http://147.175.161.127:8080/userPhoto?id=' + user.id, {
                method: 'GET',
                headers: {
                    'Authorization': token,
                }
            })
        }
        catch (err) {
            console.log(err)
        }
        console.log("response", JSON.stringify(response.body))
        const imageBlob = await response.blob()
        const imageObjectUrl = await URL.createObjectURL(imageBlob)
        const fr = new FileReader();
        fr.onload = async () => {
            const fileUri = `${FileSystem.documentDirectory}/avatar.png`;
            await FileSystem.writeAsStringAsync(fileUri, fr.result.split(',')[1], { encoding: FileSystem.EncodingType.Base64 });
            Sharing.shareAsync(fileUri);
        };
        await fr.readAsDataURL(image);
        console.log('imageURL', imageObjectUrl)
        setImage(imageObjectUrl)
    }, [user])

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    }

    const saveProfilePic = async () => {
        console.log('save profile pic')
        const token = await AsyncStorage.getItem('@accessToken');
        if (token == null) {
            navigation.navigate('Login');
            return
        }
        // Create FormData
        const data = new FormData();
        data.append("avatar", {
            name: "image",
            type: "image/png",
            uri: image
        });
        // Change file upload URL
        var url = "http://147.175.161.127:8080/userPhoto";
        let response
        try {
            response = await fetch(url, {
                method: "POST",
                body: data,
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                    Authorization: token
                }
            });
        }
        catch(error) {
            console.log(error)
        }
        let json
        try {
            json = await response.json();
            return
        }
        catch (error) {
            console.log(JSON.stringify(response))
        }
        if (json.status == 200) {
            console.log("Profile picture updated Successful");
        }else{
            console.log("Something went wrong, please try again");
        }        
    }

    const saveProfile = async () => {
        console.log(JSON.stringify({
            "caloriesGoal": Number(caloriesGoal),
            "email": email,
            "firstName": firstName,
            "height": Number(height),
            "lastName": lastName,
            "weight": Number(weight),
            "password": password,
            "passwordConfirm": passwordConfirm,
            "birthDate": "1990-10-10"
        }))
        const token = await AsyncStorage.getItem('@accessToken');
        if (token == null) {
            navigation.navigate('Login');
            return;
        }
        let response
        try {
            response = await fetch('https://fiitness-pal.ey.r.appspot.com/user', {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                },
                body: JSON.stringify({
                    "caloriesGoal": Number(caloriesGoal),
                    "email": email,
                    "firstName": firstName,
                    "height": Number(height),
                    "lastName": lastName,
                    "weight": Number(weight),
                    "password": password,
                    "passwordConfirm": passwordConfirm,
                    "birthDate": "1990-10-10"
                })
            })
        }
        catch (error) {
            console.log(error)
        }
        let json
        try {
            json = await response.json()
        }
        catch {
            console.log("error json", JSON.stringify(response))
        }
        if(json.status == 422)
        {
            alert(json.message)
        }
        else {
            navigation.navigate('Home')
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <Text style={{ marginBottom: 20, fontSize: 40 }}>Profile</Text>

                    <View style={{ flexDirection: 'row', width: 300, marginBottom: 10 }}>
                        <View style={{ float: 'left', justifyContent: 'center', flex: 1 }}>
                            <Text style={styles.text}>Profile picture</Text>
                        </View>
                        <View style={{ float: 'right', flex: 1 }}>
                            <Image source={{ uri: image }} style={styles.profilePicture}></Image>
                        </View>
                    </View>

                    <Button style={styles.button} title='Change profile picture' onPress={pickImage} />

                    <Button style={styles.button} title='Save' onPress={saveProfilePic} />

                    <View style={{ flexDirection: 'row', width: 300, marginBottom: 10 }}>
                        <View style={{ float: 'left', justifyContent: 'center', flex: 1 }}>
                            <Text style={styles.text}>First name</Text>
                        </View>
                        <View style={{ float: 'right', flex: 1, marginRight: 100 }}>
                            <TextInput style={styles.input} value={firstName} onChangeText={onChangeFirstName}></TextInput>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', width: 300, marginBottom: 10 }}>
                        <View style={{ float: 'left', justifyContent: 'center', flex: 1 }}>
                            <Text style={styles.text}>Last name</Text>
                        </View>
                        <View style={{ float: 'right', flex: 1, marginRight: 100 }}>
                            <TextInput style={styles.input} value={lastName} onChangeText={onChangeLastName}></TextInput>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', width: 300, marginBottom: 10 }}>
                        <View style={{ float: 'left', justifyContent: 'center', flex: 1 }}>
                            <Text style={styles.text}>Height</Text>
                        </View>
                        <View style={{ float: 'right', flex: 1, marginRight: 100 }}>
                            <TextInput style={styles.input} value={height} onChangeText={onChangeHeight}></TextInput>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', width: 300, marginBottom: 10 }}>
                        <View style={{ float: 'left', justifyContent: 'center', flex: 1 }}>
                            <Text style={styles.text}>Weight</Text>
                        </View>
                        <View style={{ float: 'right', flex: 1, marginRight: 100 }}>
                            <TextInput style={styles.input} value={weight} onChangeText={onChangeWeight} ></TextInput>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', width: 300, marginBottom: 10 }}>
                        <View style={{ float: 'left', justifyContent: 'center', flex: 1 }}>
                            <Text style={styles.text}>Calories</Text>
                        </View>
                        <View style={{ float: 'right', flex: 1, marginRight: 100 }}>
                            <TextInput style={styles.input} value={caloriesGoal} onChangeText={onChangeCaloriesGoal}></TextInput>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', width: 300, marginBottom: 10 }}>
                        <View style={{ float: 'left', justifyContent: 'center', flex: 1 }}>
                            <Text style={styles.text}>E-mail</Text>
                        </View>
                        <View style={{ float: 'right', flex: 1, marginRight: 100 }}>
                            <TextInput style={styles.input} value={email} onChangeText={onChangeEmail}></TextInput>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', width: 300, marginBottom: 10 }}>
                        <View style={{ float: 'left', justifyContent: 'center', flex: 1 }}>
                            <Text style={styles.text}>Password</Text>
                        </View>
                        <View style={{ float: 'right', flex: 1, marginRight: 100 }}>
                            <TextInput style={styles.input} secureTextEntry onChangeText={onChangePassword} value={password}></TextInput>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', width: 300, marginBottom: 10 }}>
                        <View style={{ float: 'left', justifyContent: 'center', flex: 1 }}>
                            <Text style={styles.text}>Confirm password</Text>
                        </View>
                        <View style={{ float: 'right', flex: 1, marginRight: 100 }}>
                            <TextInput style={styles.input} secureTextEntry onChangeText={onChangePasswordConfirm} value={passwordConfirm}></TextInput>
                        </View>
                    </View>

                    <Button style={styles.button} title='Save' onPress={saveProfile} />
                </ScrollView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        //justifyContent: "center",
    },
    input: {
        backgroundColor: "#EFEFEF",
        borderRadius: 5,
        width: 200,
        height: 40,
        fontSize: 20,
        margin: 10,
    },
    text: { textAlign: 'left', fontSize: 20 },
    bodyInput: {
        backgroundColor: "#EFEFEF",
        borderRadius: 5,
        width: 65,
        height: 40,
        fontSize: 20,
        margin: 10,
    },
    profilePicture: {
        width: 150,
        height: 150,
    }
});

export default Profile;