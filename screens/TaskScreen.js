import React, { useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import AddTask from '../components/AddTask';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TasksList from './TasksList';
import { auth, db } from '../firebase';
import Stats from './Stats';

const Tab = createBottomTabNavigator();

const TaskScreen = ({route}) => {

    const [myTasks, setMyTasks] = useState([])
    const [id, setId] = useState('')

    const [statsData, setStatsData] = useState({})

    useLayoutEffect(() => {
        const unsubscribe = db.collection('Stats').onSnapshot((snapshot)=>
        snapshot.docs.map((doc)=>{
            if(doc.data().email.toLowerCase() === auth.currentUser.email.toLowerCase()){
                setStatsData({
                    myId:doc.id,
                    email:doc.data().email,
                    pendingLifetime: doc.data().pendingLifetime,
                    completedLifetime: doc.data().completedLifetime,
                })
            }
        })
        )
        return unsubscribe 
    }, [route])

    useLayoutEffect(() => {
        const subscribe = db.collection('taskList').doc(`${id.myId}`).collection('tasks').orderBy('deadline','asc').onSnapshot((snapshot)=>{
            setMyTasks(
                snapshot.docs.map((doc)=>({
                        data:doc.data(),
                        id:doc.id,
                        })
                    )
            )
        })  

        return subscribe
    }, [route])

    useEffect(() => {
        const unsubscribe = db.collection('taskList').onSnapshot((snapshot)=>{
        snapshot.docs.map((doc)=>{
            if(doc.data().email.toLowerCase() === auth.currentUser.email){
                setId({
                    myId:doc.id,
                    myEmail: doc.data().email,
                })
            }
        })}
        )
        return unsubscribe 
    }, [])



    return (

        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {

                    if (route.name === 'Pending') {
                        return <Ionicons name={'ios-list-circle'} size={size} color={color} />;
                    } 
                    else if(route.name === 'AddTask') {
                        return <Ionicons name={'ios-add-circle'} size={size} color={color} />
                    }else if(route.name === 'Stats') {
                        return <Ionicons name={'pie-chart'} size={size} color={color} />
                    }else if(route.name === 'Completed') {
                        return <Ionicons name={'checkmark-circle'} size={size} color={color} />
                    }
                },
            })}
            tabBarOptions={{
            activeTintColor: '#6C63FF',
            inactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen name="Stats" children={()=> (<Stats myTasks={myTasks} myStats={statsData}/>)} />
            <Tab.Screen name="Pending" children={()=> (<TasksList myTasks={myTasks} id={id} pending/>)} />
            <Tab.Screen name="Completed" children={()=> (<TasksList myTasks={myTasks} id={id} completed/>)} />
            <Tab.Screen name="AddTask" component={AddTask}/>
            
        </Tab.Navigator>
    )
}

export default TaskScreen

const styles = StyleSheet.create({

})
