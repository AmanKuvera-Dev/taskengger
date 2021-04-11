import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { db } from '../firebase'
import { SafeAreaView } from 'react-native'
import Members from '../components/Members'
import { LogBox } from 'react-native';


const Team = () => {

    const [users,setUsers] = useState([])

    useEffect(() => {
        
        const members = db.collection('Users').orderBy('role',"desc").orderBy('displayName','asc').onSnapshot((snapshot)=>
            setUsers(
                snapshot.docs.map((doc) => ({
                    data:doc.data()
                }))
            )
        )
        return members 
    }, [])

    useEffect(() => {
        LogBox.ignoreLogs(['Uncaught Error in onSnapshot']);
    }, [])


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {
                    users.map(({data:{email,role,displayName,photoURL}})=>(
                        <Members key={email} email={email} role={role} displayName={displayName} photoURL={photoURL} />
                    ))
                }
                
            </ScrollView>
        </SafeAreaView>
    )
}

export default Team

const styles = StyleSheet.create({
    container:{
        minHeight:'100%',
        flex:1,
        backgroundColor:'#fff'
    },

})
