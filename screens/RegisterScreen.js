import { StatusBar } from 'expo-status-bar'
import React, { useLayoutEffect, useState } from 'react'
import { Button, Input, Image } from 'react-native-elements';
import {auth, db} from '../firebase'
import {Picker} from '@react-native-picker/picker';
import { KeyboardAvoidingView, StyleSheet, Text, ScrollView, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-simple-toast';
import { Platform } from 'react-native'


const RegisterScreen = ({navigation}) => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [selectedRole, setSelectedRole] = useState("none");

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Register User",
            headerStyle: {backgroundColor: "#6C63FF"},
            headerTitleStyle: {color: "white"},
            headerTintColor: "white",
            headerTitleAlign: "center",
        })
    }, [navigation])

    const addTaskOwner = async () =>{
        await db.collection('taskList').add({
            email:email
        })
    }

    const addOwner = async () => {
        await db.collection('Users').add({
            email:email,
            role:selectedRole,
            displayName: name,
            photoURL: imageUrl || "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png"
        })
    }

    const addStats = async () => {
        await db.collection('Stats').add({
            email:email,
            pendingLifetime: 0,
            completedLifetime: 0,
        })
    }

    const register = () =>{
        auth
        .createUserWithEmailAndPassword(email,password)
        .then((authUser) => {
                authUser.user.updateProfile({
                displayName: name,
                photoURL: imageUrl || "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
            })

        }).then(()=>{
            addTaskOwner()
        }).then(()=>{
            addOwner()
        }).then(()=>{
            addStats()
        }).then(()=>{
            (Platform.OS === 'android')? Toast.show('User registered successfully'): alert('User registered successfully')
        }).catch((error)=> alert(error.message))

    }

    return (
        <ScrollView style={styles.parent}>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            
                <StatusBar style="light"/>

                    <View style={styles.inputContainer}>
                        <Input 
                            placeholder="Full Name" 
                            autofocus type="text" 
                            value={name} 
                            onChangeText={(text)=>setName(text)}
                            leftIcon={
                                <Icon
                                name='user'
                                size={24}
                                color='gray'
                                style={styles.icons}
                                />
                            }
                        />
                        <Input 
                            placeholder="Email" 
                            type="email" 
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
                            placeholder="Password" 
                            type="password" 
                            value={password} 
                            secureTextEntry 
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
                        <Input 
                            placeholder="Profile Picture URL (optional)" 
                            type="text" 
                            value={imageUrl} 
                            onChangeText={(text)=>setImageUrl(text)} 
                            onSubmitEditing={register}
                            leftIcon={
                                <Icon
                                name='photo'
                                size={18}
                                color='gray'
                                style={styles.icons}
                                />
                            }
                        />

                        <Picker
                            selectedValue={selectedRole}
                            
                            onValueChange={(itemValue, itemIndex) =>
                                setSelectedRole(itemValue)
                            }
                            style={styles.picker}
                        >
                            <Picker.Item label="Position of Responsibility" value="none" />
                            <Picker.Item label="Project Manager" value="manager" />
                            <Picker.Item label="Designer" value="designer" />
                            <Picker.Item label="Front-end Dev" value="frontend" />
                            <Picker.Item label="Back-end Dev" value="backend" />
                        </Picker>

                    </View>

                    <Button disabled={!name || !email || !password || selectedRole === "none"} containerStyle={styles.button} buttonStyle={{backgroundColor: '#6C63FF'}} raised onPress={register} title="Register"/>
                
        </KeyboardAvoidingView>
        </ScrollView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    parent:{
        flex:1,
        minHeight:'100%',
        backgroundColor: "white",
    },
    container:{
        flex:1,
        alignItems: "center",
        justifyContent: "center",
        paddingBottom:50,
        paddingTop:50,
        backgroundColor: "white",
    },
    button: {
        width:200,
        marginTop:10,
    },
    inputContainer:{
        width:300,
    },
    icons:{
        marginRight: 10
    },
    picker:{
        maxWidth:300,
        height:50,
        marginBottom: 20,
    }
})
