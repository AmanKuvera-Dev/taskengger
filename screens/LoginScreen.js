import React, { useEffect, useLayoutEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import { Button, Input, Image } from 'react-native-elements';
import {StatusBar} from "expo-status-bar"
import { auth } from '../firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-simple-toast';
import { Platform } from 'react-native'
import {logo} from '../assets/index'

const LoginScreen = ({navigation}) => {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

useLayoutEffect(() => {
    navigation.setOptions({
        title: "Welcome to Taskengger",
            headerStyle: {backgroundColor: "#6C63FF"},
            headerTitleStyle: {color: "white"},
            headerTintColor: "white",
            headerTitleAlign: "center",
    })
}, [navigation])

useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
        if(authUser){
            (Platform.OS === 'android')? Toast.show('Logged in successfully'): alert('Logged in successfully')
            navigation.replace("Sidebar")
        }
    })

    return unsubscribe
}, [])

const signIn = () =>{
    auth.signInWithEmailAndPassword(email,password)
    .catch((error)=>alert(error.message))
}
    return (
        <KeyboardAvoidingView style={styles.container}>
            <StatusBar style="light"/>

            <Image source={logo} style={{width:250,height:107}}/>
            
        
        <View style={{alignItems: "center",}}>
            <View style={styles.inputContainer}>
                <Input 
                    type="email" 
                    placeholder="Email" 
                    autoFocus 
                    value={email} 
                    onChangeText={(text)=>setEmail(text)}
                    leftIcon={
                        <Icon
                          name='envelope'
                          size={18}
                          color='gray'
                          style={styles.icons}
                        />
                      }
                />
                <Input 
                    type="password" 
                    placeholder="Password" 
                    secureTextEntry 
                    value={password} 
                    onChangeText={(text)=>setPassword(text)}
                    leftIcon={
                        <Icon
                          name='lock'
                          size={24}
                          color='gray'
                          style={styles.icons}
                        />
                      }
                />
            </View>
            <Button title="Login" containerStyle={styles.button} buttonStyle={{backgroundColor: '#6C63FF'}} onPress={signIn} onSubmitEditing={signIn}/>
            <Button title="Register" type="outline" titleStyle={{color: '#6C63FF'}} containerStyle={styles.button} onPress={()=> navigation.navigate("Register")}/>
            </View>
            <View style={{height:80}}/>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: "center",
        justifyContent: "space-evenly",
        padding:20,
        backgroundColor: "white",
        minHeight:'100%'
    },
    inputContainer:{
        width:300,
    },
    button:{
        width:200,
        marginTop:10,
        borderColor: '#6C63FF'
    },
    icons:{
        marginRight: 10
    }
})
