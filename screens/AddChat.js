import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Text } from 'react-native';
import { StyleSheet, View } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { auth, db } from '../firebase';
import {Picker} from '@react-native-picker/picker';
import { KeyboardAvoidingView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar'
import Toast from 'react-native-simple-toast';
import { Platform } from 'react-native'


const AddChat = ({navigation}) => {

    const [input, setInput] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [selectedRole, setSelectedRole] = useState("all");
    const [role, setRole] = useState()

    useEffect(() => {

        const myRole = db.collection('Users').onSnapshot((snapshot)=>{
            snapshot.docs.map((doc)=>{
                if(doc.data().email.toLowerCase() === auth.currentUser.email.toLowerCase())
                    setRole(doc.data().role)
            })
        })

        return myRole
    }, [])

    const createChat = async () => {
        if(role === 'manager'){
            await db.collection('chats').add({
                chatName:input.toUpperCase(),
                photoURL: (imageUrl !== "") ? imageUrl : "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
                acceptedRole: selectedRole
                }).then(()=>{
                    (Platform.OS === 'android')? Toast.show('Group created successfully'): alert('Group created successfully')
                    navigation.goBack();
                })
                .catch((error)=> alert(error))
        }
        else{
            alert('Only managers are allowed to create a new department chat')
        }
    }

        useLayoutEffect(() => {
            navigation.setOptions({
                title: "Add a new department",
                headerTitleAlign: "left",
                headerStyle: {backgroundColor: "#6C63FF"},
                headerTitleStyle: {color: "white"},
                headerTintColor: "white",
            })
        }, [navigation])

        

    return (
        <ScrollView style={styles.parent}>
            <KeyboardAvoidingView behaviour="padding" style={styles.container}>
                <StatusBar style="light"/>

                <View style={styles.inputContainer}>

                    <Input 
                        placeholder="Enter department name" 
                        value={input} 
                        onChangeText={(text) => setInput(text)}
                    />
                    <Input 
                        placeholder="Enter department icon link" 
                        value={imageUrl} 
                        onChangeText={(text) => setImageUrl(text)}
                        onSubmitEditing={createChat}
                    />

                    <Picker
                        selectedValue={selectedRole}
                                    
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedRole(itemValue)
                        }
                        style={styles.picker}
                    >
                        <Picker.Item label="Accessibility to All" value="all" />
                        <Picker.Item label="Project Manager" value="manager" />
                        <Picker.Item label="Designer" value="designer" />
                        <Picker.Item label="Front-end Dev" value="frontend" />
                        <Picker.Item label="Back-end Dev" value="backend" />
                    </Picker>

                    <Text style={styles.noteLine}>Note : Please enter the above details carefully as these cannot be modified later</Text>
                </View>

                <Button onPress={createChat} buttonStyle={{backgroundColor: '#6C63FF'}} containerStyle={styles.button} disabled={!input && !imageUrl} title="Create new department chat"/>
                        
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

export default AddChat

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
    inputContainer:{
        width:300,
    },
    noteLine:{
        fontSize: 10,
        fontWeight:"600",
        marginBottom:10,
        padding:10,
        color:"orange"
    },
    picker:{
        maxWidth:300,
        height:50,
        marginBottom: 10,
        marginTop:0,
    }
})
