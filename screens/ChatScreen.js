import React, { useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-elements'
import {AntDesign, FontAwesome, Ionicons} from '@expo/vector-icons'
import { SafeAreaView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { KeyboardAvoidingView } from 'react-native'
import { Platform } from 'react-native'
import { ScrollView, TextInput } from 'react-native'
import { Keyboard } from 'react-native'
import { auth, db } from '../firebase'
import * as firebase from "firebase"
import moment from 'moment'
import { LogBox } from 'react-native';
import { Image } from 'react-native'
import {chatEmpty} from '../assets/index'


const ChatScreen = ({navigation, route}) => {

    const [input, setInput] = useState("")
    const [messages, setMessages] = useState([])

    useEffect(() => {
        LogBox.ignoreLogs(['Setting a timer for a long period of time']);
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitleAlign: "left",
            headerStyle: {backgroundColor: "white"},
            headerTintColor: "black",
            headerTitle: () =>(
                <View style={{flexDirection:"row", alignItems:"center", marginLeft: -20}}>
                    <Avatar rounded source={{uri: route.params.photoURL}}/>
                    <Text style={{color: "black", marginLeft:15, fontWeight:"700"}}>{route.params.chatName}</Text>
                </View>
            ),
        })
    }, [navigation])

    useLayoutEffect(() => {
        const unsubscribe = db.collection('chats').doc(route.params.id).collection('messages').orderBy('timestamp',"asc").onSnapshot((snapshot)=>{
            setMessages(snapshot.docs.map((doc)=> ({
                id: doc.id,
                data:doc.data(),
            })))
        })
        return unsubscribe
    }, [route])

    const sendMessage = () =>{
        if(input){
            db.collection('chats').doc(route.params.id).collection('messages').add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                message:input,
                displayName:auth.currentUser.displayName,
                email:auth.currentUser.email,
                photoURL: auth.currentUser.photoURL,
            })
            setInput('')
        }
    }

    
    return (
        <SafeAreaView style={{flex:1, backgroundColor: "white"}}>
            <StatusBar style="dark"/>
            <KeyboardAvoidingView
                behaviour={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
                keyboardVerticalOffset={90}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <>
                        <ScrollView contentContainerStyle={{paddingTop: 40}} >
                            {
                                messages.map(({id,data,date})=>(
                                    data.email=== auth.currentUser.email ? (
                                        <View key={id} style={styles.reciever}>
                                            <Avatar 
                                                rounded size={30} 
                                                source={{uri:data.photoURL}} 
                                                position="absolute" 
                                                top={-15} 
                                                right={-5}
                                                containerStyle={{
                                                    position:"absolute", 
                                                    top:-15,
                                                    right:-5,
                                                }}
                                            />
                                            <Text style={styles.recieverName}>You</Text>
                                            <Text style={styles.recieverText}>{data.message}</Text>
                                            <Text style={styles.Date}>{(data.timestamp) ? moment(data.timestamp.toDate()).calendar() : ""}</Text>
                                        </View>
                                    ) : (
                                        <View key={id} style={styles.sender}>
                                            <Avatar 
                                                rounded size={30} 
                                                source={{uri:data.photoURL}} 
                                                position="absolute" 
                                                top={-15} 
                                                left={-5}
                                                containerStyle={{
                                                    position:"absolute", 
                                                    top:-15,
                                                    left:-5,
                                                }}
                                            />
                                            <Text style={styles.senderName}>{data.displayName}</Text>
                                            <Text style={styles.senderText}>{data.message}</Text>
                                            <Text style={styles.Date}>{(data.timestamp) ? moment(data.timestamp.toDate()).calendar() : ""}</Text>
        
                                        </View>
                                    )
                                ))
                            }
                        </ScrollView>
                        <View>
                            {(!messages.length) ? (<>
                                <Image source={chatEmpty} style={{width:'80%',height:'60%',marginTop:0,alignSelf:'center'}}/>
                                <Text style={styles.imageTxt}>There are no messages to show 😟 {'\n'}Start a converstation.</Text>
                            </>) : null}
                        </View>
                        <View style={styles.footer}>
                            <TextInput 
                                placeholder="Textengger"
                                value={input}
                                onChangeText={(text)=> setInput(text)}
                                placeholder="Send a message"
                                style={styles.textInput}
                                onSubmitEditing={sendMessage}
                            />
                            <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                                <Ionicons name="send" size={24} color="grey"/>
                            </TouchableOpacity>
                        </View>
                    </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    reciever:{
        padding:15,
        backgroundColor:"#6C63FF",
        alignSelf:"flex-end",
        borderRadius:20,
        marginRight:15,
        marginBottom:20,
        maxWidth:"80%",
        minWidth:"50%",
        position:"relative"
    },
    sender:{
        padding:15,
        backgroundColor:"#1b1b2f",
        alignSelf:"flex-start",
        borderRadius:20,
        marginLeft:15,
        marginBottom:20,
        maxWidth:"80%",
        minWidth:"50%",
        position:"relative",
    },
    senderName:{
        color:"lightgrey",
        marginBottom:5,
        marginLeft:10,
    },
    recieverName:{
        color:"lightgrey",
        marginLeft:5,
        marginBottom:5,
    },
    senderText:{
        color:"white",
        fontWeight: "500",
        marginLeft:10,
        marginBottom:5,
        alignSelf:"flex-start",
    },
    recieverText:{
        color:"white",
        fontWeight: "500",
        marginLeft:5,
        alignSelf:"flex-start",
    },
    Date:{
        alignSelf:"flex-end",
        fontSize:10,
        marginTop:10,
        color:"lightgrey"
    },
    footer:{
        flexDirection:"row",
        alignItems: "center",
        width: "100%",
        padding: 15
    },
    textInput:{
        bottom: 0,
        height:40,
        flex:1,
        marginRight:15,
        backgroundColor:"#ECECEC",
        padding:10,
        color:"grey",
        borderRadius:30,
    },
    imageTxt:{
        textAlign:'center',
        lineHeight:25,
        fontWeight: 'bold',
        color:'gray'
    }
})
