import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { SafeAreaView, StyleSheet, View, Text } from 'react-native'
import CustomListItem from '../components/CustomListItem'
import { TouchableOpacity } from 'react-native'
import {SimpleLineIcons} from '@expo/vector-icons'
import { db, auth } from '../firebase'
import { StatusBar } from 'expo-status-bar'
import { LogBox } from 'react-native';
import { Image } from 'react-native'
import {chatEmpty} from '../assets/index'
import {firstOne} from '../assets/index'


const HomeScreen = ({navigation}) => {

    const [chats, setChats] = useState([])
    const [role, setRole] = useState('')
    let flag = 0

    useEffect(() => {
        const unsubscribe = db.collection('chats').orderBy('chatName','asc').onSnapshot((snapshot)=>
            setChats(
                snapshot.docs.map((doc) => ({
                id:doc.id,
                data: doc.data(),
                }))
            )
        )
        return unsubscribe 
    }, [])


    useEffect(() => {

        const myRole = db.collection('Users').onSnapshot((snapshot)=>{
            snapshot.docs.map((doc)=>{
                if(doc.data().email.toLowerCase() === auth.currentUser.email.toLowerCase())
                    setRole(doc.data())
            })
        })

        return myRole
    }, [])

    useEffect(() => {
        LogBox.ignoreLogs(['Setting a timer for a long period of time']);
    }, [])

    const enterChat = (id,chatName,photoURL) =>{
        navigation.navigate("Chat",{
            id,
            chatName,
            photoURL,
        })
    }
    

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light"/>
            <ScrollView>
                {
                    chats.map(({id,data:{chatName,photoURL,acceptedRole}})=>{
                        if(acceptedRole === "all" || role.role === "manager" || acceptedRole === role.role){
                            flag = 1
                            return (<TouchableOpacity activeOpacity={0.5}>
                                <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat} photoURL={photoURL}/>  
                            </TouchableOpacity>)
                        }
                        else{
                            return null
                        }
                    })
                }

            </ScrollView>

            <View style={{justifyContent:'flex-start'}}>
                {
                    (!flag) ? (<>
                        <Image source={firstOne} style={{width:'90%',height:'60%',alignSelf:'center'}}/>
                        <Text style={styles.imageTxt}>Hey there! {'\n'}Seems like you are the first one here.{'\n'}Please wait for your manager {'\n'}to add a department chat.</Text>
                    </>) :  null
                }
            </View>
            
            <TouchableOpacity activeOpacity={0.5} style={styles.addButton} onPress={()=> navigation.navigate('AddChat')}>
                <SimpleLineIcons name="pencil" size={24} color="white"/>   
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container:{
        minHeight:'100%',
        flex:1,
        backgroundColor:'#fff'
    },
    addButton:{
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
        backgroundColor: "#6C63FF",
        position:"absolute",
        right: 20,
        bottom:40
    },
    imageTxt:{
        textAlign:'center',
        lineHeight:25,
        fontWeight: 'bold',
        color:'gray'
    }
})
