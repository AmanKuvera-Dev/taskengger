import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {ListItem, Avatar} from "react-native-elements"


const Members = ({email, displayName , role, photoURL}) => {

    return (
        <ListItem bottomDivider key={email}>
            <Avatar
                rounded
                source={{
                    uri: photoURL
                }}
            />
            <ListItem.Content>
                <ListItem.Title style={{fontWeight:"900"}}>
                    {displayName.toUpperCase()}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                    {email}
                </ListItem.Subtitle>
            </ListItem.Content>
            <ListItem>
                <Text>{role.toUpperCase()}</Text>
            </ListItem>
        </ListItem>
    )
}

export default Members

const styles = StyleSheet.create({})
