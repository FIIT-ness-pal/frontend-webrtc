import React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, Image, Button, StyleSheet, TouchableWithoutFeedback, Keyboard, SafeAreaView, TextInput, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const Profile = () => {
    const [image, setImage] = useState('https://i.ibb.co/0Gq2600/avatar.png');

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

    const saveProfile = () => {
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.container}>
                
                <Text style={{marginBottom: 20, fontSize: 40}}>Profile</Text>
                
                <View style={{flexDirection: 'row', width: 300, marginBottom: 10}}>
                    <View style={{float: 'left', justifyContent: 'center', flex: 1}}>
                        <Text style={styles.text}>Profile picture</Text>
                    </View>
                    <View style={{float: 'right', flex: 1}}>
                        <Image source={{uri: image}} style={styles.profilePicture}></Image>
                    </View>
                </View>

                <Button style={styles.button} title='Change profile picture' onPress={pickImage} />

                <View style={{flexDirection: 'row', width: 300, marginBottom: 10}}>
                    <View style={{float: 'left', justifyContent: 'center', flex: 1}}>
                        <Text style={styles.text}>Name</Text>
                    </View>
                    <View style={{float: 'right', flex: 1, marginRight: 100}}>
                        <TextInput style={styles.input}></TextInput>
                    </View>
                </View>

                <View style={{flexDirection: 'row', width: 300, marginBottom: 10}}>
                    <View style={{float: 'left', justifyContent: 'center', flex: 1}}>
                        <Text style={styles.text}>Height</Text>
                    </View>
                    <View style={{float: 'right', flex: 1, marginRight: 100}}>
                        <TextInput style={styles.input}></TextInput>
                    </View>
                </View>

                <View style={{flexDirection: 'row', width: 300, marginBottom: 10}}>
                    <View style={{float: 'left', justifyContent: 'center', flex: 1}}>
                        <Text style={styles.text}>Weight</Text>
                    </View>
                    <View style={{float: 'right', flex: 1, marginRight: 100}}>
                        <TextInput style={styles.input}></TextInput>
                    </View>
                </View>

                <View style={{flexDirection: 'row', width: 300, marginBottom: 10}}>
                    <View style={{float: 'left', justifyContent: 'center', flex: 1}}>
                        <Text style={styles.text}>Calories</Text>
                    </View>
                    <View style={{float: 'right', flex: 1, marginRight: 100}}>
                        <TextInput style={styles.input}></TextInput>
                    </View>
                </View>

                <View style={{flexDirection: 'row', width: 300, marginBottom: 10}}>
                    <View style={{float: 'left', justifyContent: 'center', flex: 1}}>
                        <Text style={styles.text}>E-mail</Text>
                    </View>
                    <View style={{float: 'right', flex: 1, marginRight: 100}}>
                        <TextInput style={styles.input}></TextInput>
                    </View>
                </View>

                <View style={{flexDirection: 'row', width: 300, marginBottom: 10}}>
                    <View style={{float: 'left', justifyContent: 'center', flex: 1}}>
                        <Text style={styles.text}>Password</Text>
                    </View>
                    <View style={{float: 'right', flex: 1, marginRight: 100}}>
                        <TextInput style={styles.input}></TextInput>
                    </View>
                </View>

                <Button style={styles.button} title='Save' onPress={saveProfile()} />

                
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
    text: { textAlign: 'left', fontSize: 20},
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