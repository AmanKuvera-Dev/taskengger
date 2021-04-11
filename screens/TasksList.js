import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { SafeAreaView, StyleSheet, View, Button, Alert } from 'react-native'
import { db, auth } from '../firebase'
import { StatusBar } from 'expo-status-bar'
import { LogBox } from 'react-native';
import Task from '../components/Task'
import Toast from 'react-native-simple-toast';
import { Platform } from 'react-native'
import { Text } from 'react-native'
import { Image } from 'react-native'
import {tasksCompleted, tasksPending} from '../assets/index'

const TasksList = ({myTasks,id,pending,completed}) => {

    const [completedState, setCompletedState] = useState(false)
    const [comp, setComp] = useState()
    const [pend, setPend] = useState()
    const [modifyStats, setModifyStats] = useState()
    const [statsId, setStatsId] = useState('')

    let compCount=0,pendCount=0;




    useEffect(() => {
        LogBox.ignoreLogs(['Setting a timer for a long period of time']);
    }, [])


    const updateStatus = async (taskId,taskName,deadline,status) =>{
        await db.collection('taskList').doc(id.myId).collection('tasks').doc(taskId).update({
            taskName,
            deadline,
            status,
            deadline,
        })
    }

    useEffect(() => {
        const unsubscribe = db.collection('Stats').onSnapshot((snapshot)=>
        snapshot.docs.map((doc)=>{
            if(doc.data().email.toLowerCase() === auth.currentUser.email){
                setStatsId({
                    myId:doc.id,
                    myEmail: doc.data().email,
                })
            }
        })
        )
        return unsubscribe 
    }, [])

    const clearCompleted = async () =>{
            await myTasks.map((myTask)=>{
                if(myTask.data.status === "complete"){
                    db.collection('taskList').doc(id.myId).collection('tasks').doc(myTask.id).delete().catch(()=>{
                        alert('Unable to clear list. Please try Again later!')
                    })
                }
            })

            if(Platform.OS === 'android'){
                Toast.show('List cleared successfully')
             }else{
                alert('List cleared successfully')
             } 
    }

    const showAlert1 = () => {  

        if(completedState){
            Alert.alert(  
                'Are you sure ?',  
                'This will deleted the list of completed tasks permanently from the database.',  
                [  
                    
                    {text: 'Yes', onPress: () => clearCompleted()},  
                    {  
                        text: 'Cancel',  
                        onPress: () => console.log('Cancel Pressed'),  
                        style: 'cancel',  
                    }, 
                ]  
            );  
            setCompletedState(false)
        }
        else{
            alert('There is nothing to clear')
        }
    }  

    useEffect(() => {

        const checkList = async () =>{
            await myTasks.map((myTask)=>{
                if(myTask.data.status === "complete"){
                    setCompletedState(true)
                }
            })
        }

        setComp(compCount)
        setPend(pendCount)

        return checkList
    }, [myTasks])

    const updateCompletedStats = async () => {
        await db.collection('Stats').doc(statsId.myId).update({
                        completedLifetime:modifyStats.completed+1,
                        email:modifyStats.email,
                        pendingLifetime: modifyStats.pending-1,
                    })

    }

    const updatePendingStats = async () => {
        await db.collection('Stats').doc(statsId.myId).update({
                        completedLifetime:modifyStats.completed-1,
                        email:modifyStats.email,
                        pendingLifetime: modifyStats.pending+1,
                    })

    }

    
    useEffect(() => {
        const unsubscribe = db.collection('Stats').onSnapshot((snapshot)=>
        snapshot.docs.map((doc)=>{
            if(doc.data().email.toLowerCase() === auth.currentUser.email){
                setModifyStats({
                    myId:doc.id,
                    email:doc.data().email,
                    pending: doc.data().pendingLifetime,
                    completed: doc.data().completedLifetime,
                })
            }
        })
        )
        return unsubscribe 
    }, [updateCompletedStats,updatePendingStats])


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light"/>
            <View style={styles.buttonContainer}>
                {   (completed && comp!==0) ? (
                        <Button
                            title={"Clear List"} 
                            titleStyle={{
                                color: "white",
                                fontSize: 12,
                            }} 
                            raised 
                            buttonStyle={{backgroundColor: '#6C63FF'}}
                            containerStyle={{width: 200,backgroundColor: '#6C63FF'}} 
                            onPress={showAlert1}/> 
                                
                        ) : null
                }
            </View>
            <View style={styles.paddingBtm}>
                <ScrollView>
                    
                    {
                        myTasks.map((myTask)=>{
                            
                            if(pending && myTask.data.status === 'pending'){
                                pendCount++
                                return (
                                        <Task key={myTask.id} id={myTask.id} taskObject={myTask.data} updateStatus={updateStatus} updateCompletedStats={updateCompletedStats} pending/>     
                                )
                            }
                            else{
                                if(completed){ 
                                    if(myTask.data.status === 'complete'){
                                        compCount++;
                                        return (
                                            <Task key={myTask.id} id={myTask.id} taskObject={myTask.data} updateStatus={updateStatus} updatePendingStats={updatePendingStats}/>     
                                        )
                                    }
                                }
                            }
                        })
                        
                    }

                </ScrollView>

                    

            </View>

            <View style={{justifyContent:'center'}}>
            {
                (completed && compCount === 0) ? (
                    <>
                        <Image source={tasksCompleted} style={{width:'60%',height:'60%',marginTop:40,alignSelf:'center'}}/>
                        <Text style={styles.imageTxt}>Looks like you have completed all your tasks {'\n'}or you are just getting started!</Text>
                    </>
                ) : (pending && pendCount===0) ? (
                    <>
                        <Image source={tasksPending} style={{width:'60%',height:'60%',marginTop:40,alignSelf:'center'}}/>
                        <Text style={styles.imageTxt}>Hurray! you don't have any pending tasks {'\n'}Have tasks assigned? Add them now.</Text>
                    </>
                    )  : null
            }
            </View>
            
        </SafeAreaView>
    )
}

export default TasksList

const styles = StyleSheet.create({
    container:{
        minHeight:'100%',
        flex:1,
        backgroundColor:'#fff'
    },
    buttonContainer:{
        width:'85%',
        alignSelf:'center',
        padding:10
    },
    button:{
        width:200,
        marginTop:10
    },
    paddingBtm:{
        paddingBottom:55
    },
    imageTxt:{
        textAlign:'center',
        lineHeight:25,
        fontWeight: 'bold',
        color:'gray'
    }
    
})
