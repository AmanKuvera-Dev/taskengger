import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {ListItem, Avatar} from "react-native-elements"
import moment from 'moment'
import { Input, Button } from 'react-native-elements'


const Task = ({id,taskObject,updateStatus,pending,updatePendingStats,updateCompletedStats}) => {



    const markAsComplete = () =>{
        if(taskObject.status === 'pending')
        {
            updateStatus(id,taskObject.taskName,taskObject.deadline,'complete')
            updateCompletedStats()
        }
        else{
            updateStatus(id,taskObject.taskName,taskObject.deadline,'pending')
            updatePendingStats()
        }

        if(pending)
        {
            updateCompletedStats()
        }
        else{
            updatePendingStats()
        }
        
    }

    const pastDue = (str) =>{
        let s = str.indexOf('s')

        return str.slice(0,6)+' '+'past due'
    }

    return (
        <ListItem bottomDivider key={id}>
        
            <ListItem.Content>
                <ListItem.Title style={{fontWeight:"bold", color:'#2f2e41'}}>
                    {taskObject.taskName}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                    Due date : {taskObject.deadline}
                </ListItem.Subtitle>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail" style={taskObject.status === 'pending' ? styles.red : styles.green}>
                    Status : {taskObject.status}
                </ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Content>
                <ListItem>
                    <Button title={pending ? "Mark as completed" : "Mark as pending"} 
                    titleStyle={{
                        color: "white",
                        fontSize: 12,
                    }} 
                    buttonStyle={{backgroundColor: '#6C63FF'}}
                    raised containerStyle={styles.button} onPress={()=> markAsComplete()}/>
                </ListItem>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail" style={styles.due}>
                        {(moment().format().slice(0,10) === taskObject.deadline) ? "Due today" : (moment().format().slice(0,10) > taskObject.deadline) ? pastDue(moment(taskObject.deadline).fromNow()) : (moment(taskObject.deadline).fromNow().includes('hours')) ? 'Due tomorrow' : moment(taskObject.deadline).fromNow()}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default Task

const styles = StyleSheet.create({
    button:{
        width:140,
    },
    due:{
        backgroundColor:"lightgray",
        padding:5,
        paddingLeft:15,
        display:'flex',
        alignSelf:'flex-end',
        width:140,
        borderRadius:3
    },
    red:{
        color:'red'
    },
    green:{
        color:'green'
    }
})
