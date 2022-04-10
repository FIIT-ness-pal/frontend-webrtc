import React from 'react'
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import colors from '../config/colors';

const Login = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text style={{fontSize: 50, fontWeight: 'bold'}}>FIITness pal</Text>
            <TextInput style={styles.input} placeholder="Email" />
            <TextInput style={styles.input} placeholder="Password" name="password" secureTextEntry/>
            
            <Button style={styles.button} title='Login' onPress={() => navigation.navigate('Screens')} />
            <View style={{marginTop: 20}}> 
                <Text> Don't have an account yet?</Text>
                <Button style={styles.button} onPress={() => navigation.navigate('Register')} title='Register' />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      backgroundColor: colors.primary,
      borderRadius: 5,
      width: 200,
      height: 40,
      fontSize: 20,
      margin: 10,
    },
    bodyInput: {
      backgroundColor: '#EFEFEF',
      borderRadius: 5,
      width: 65,
      height: 40,
      fontSize: 20,
      margin: 10,
    },
    button: {
      backgroundColor: colors.secondary,
      borderRadius: 10,
      padding: 10
    }
  });

export default Login