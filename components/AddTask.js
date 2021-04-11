import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Input, Button } from 'react-native-elements'
import DatePicker from 'react-native-datepicker'
import { LogBox } from 'react-native';
import { auth, db } from '../firebase'
import Toast from 'react-native-simple-toast';
import { Platform } from 'react-native'

const AddTask = ({navigation}) => {

    const [date, setDate] = useState('')
    const [task, setTask] = useState('')
    const [addStats, setAddStats] = useState()
    const [id, setId] = useState('')


    useEffect(() => {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
        LogBox.ignoreLogs(['componentWillReceiveProps has been renamed']);
        LogBox.ignoreLogs(['DatePickerAndriod has been merged with']);
    }, [])

    useEffect(() => {
        const unsubscribe = db.collection('taskList').onSnapshot((snapshot)=>
        snapshot.docs.map((doc)=>{
            if(doc.data().email.toLowerCase() === auth.currentUser.email){
                setId({
                    myId:doc.id,
                    myEmail: doc.data().email,
                })
            }
        })
        )
        return unsubscribe 
    }, [])

    
    useEffect(() => {
        const unsubscribe = db.collection('Stats').onSnapshot((snapshot)=>
        snapshot.docs.map((doc)=>{
            if(doc.data().email.toLowerCase() === auth.currentUser.email){
                setAddStats({
                    myId:doc.id,
                    email:doc.data().email,
                    pending: doc.data().pendingLifetime,
                    completed: doc.data().completedLifetime,
                })
            }
        })
        )
        return unsubscribe 
    }, [addTask])

    const addTask = async () =>{
        if(date !== ''){
            db.collection('taskList').doc(id.myId).collection('tasks').add({
                taskName:task,
                deadline:date,
                status:'pending'
            }).then(()=>{
                updateStats()
            }).then(()=>{
                setDate('');
                setTask('');
                (Platform.OS === 'android')? Toast.show('Task added successfully'): alert('Task added successfully');
                navigation.navigate('Pending')
            }).catch(error => alert(error.message))
        }
        else{
            alert('A deadline for the task must be provided')
        }

    }

    const updateStats = (x) => {
        db.collection('Stats').doc(addStats.myId).update({
                        completedLifetime:addStats.completed,
                        email:addStats.email,
                        pendingLifetime: addStats.pending+1,
                    })

    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.input}>
                <Input 
                    type="text" 
                    value={task}
                    onChangeText={(text)=>setTask(text)}
                    placeholder="Task Title" 
                    containerStyle={{width:'100%'}}
                />
                <DatePicker
                    style={{width: '95%', marginBottom: 20, marginLeft:10}}
                    date={date}
                    mode="date"
                    placeholder="Add Deadline"
                    format="YYYY-MM-DD"
                    minDate="2021-04-01"
                    maxDate="2050-06-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        right: 0,
                        top: 4,
                        marginLeft: 0
                    },
                    
                    }}
                    onDateChange={(date) => {setDate(date)}}
                />
            </View>

            <Button title="Add Task" disabled={(task.length < 3) && (date === '')} buttonStyle={{backgroundColor: '#6C63FF'}} containerStyle={styles.button} onPress={addTask}/>

        </KeyboardAvoidingView>
    )
}

export default AddTask

const styles = StyleSheet.create({
    container:{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        width:'100%',
        height:'100%',
        padding:10
    },
    button:{
        width:'85%',
        marginTop:10
    },
    input:{
        width:'90%'
    }
})
