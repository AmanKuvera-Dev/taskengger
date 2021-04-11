import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {ListItem, Avatar} from "react-native-elements"
import { db } from '../firebase'

const CustomListItem = ({id, chatName, enterChat, photoURL}) => {

    const[chatMessages, setChatMessages] = useState([])

    useEffect(() => {
        
        const unsubscribe = db.collection('chats').doc(id).collection('messages').orderBy('timestamp','desc').onSnapshot((snapshot)=>{
            setChatMessages(snapshot.docs.map((doc)=> doc.data()))
        })
        return unsubscribe
    }, [])

    return (
        <ListItem bottomDivider key={id} onPress={()=>enterChat(id,chatName, photoURL)}>
            <Avatar
                rounded
                source={{
                    uri: photoURL
                }}
            />
            <ListItem.Content>
                <ListItem.Title style={{fontWeight:"900"}}>
                    {chatName}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                    {chatMessages[0] ? (`${chatMessages[0]?.displayName} : ${chatMessages[0]?.message}`) : "This group was created"}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({})
