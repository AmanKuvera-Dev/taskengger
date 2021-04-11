import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Text } from 'react-native'
import { ScrollView } from 'react-native'
import { SafeAreaView, StyleSheet, View, Button, Alert } from 'react-native'
import * as firebase from "firebase"
import moment from 'moment'

const Stats = ({myStats,myTasks}) => {

    const [dueToday,setDueToday] = useState()
    const [dueThisWeek,setDueThisWeek] = useState()
    const date = moment().format().slice(0,10)
    const oneWeek = moment().add(7, 'days').format().slice(0,10)

    let count = 0
    let count2 = 0

    const deadlineToday = () =>{
        myTasks.map((task)=>{
            if(task.data.deadline === date && task.data.status === 'pending'){
                count = count + 1
            }
        })

        if(count < 10){
            return '0' + count
        }
        else{
            return count
        }

    }

    const deadlineThisWeek = () =>{
        myTasks.map((task)=>{
            if((task.data.deadline > date) && (task.data.deadline <= oneWeek) && task.data.status === 'pending'){
                count2 = count2 + 1
            }
        })

        if(count2 < 10){
            return '0' + count2
        }
        else{
            return count2
        }

    }

    useEffect(() => {
        setDueToday(deadlineToday)
        setDueThisWeek(deadlineThisWeek)
    },[myTasks])

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light"/>

            <View>

                <ScrollView>

                <Text style={{alignSelf:'center', marginBottom:30, fontWeight:'700',fontSize:20, color:'#3f3d56', borderBottomWidth:1,borderColor:'lightgray', width:'90%', paddingBottom:8,}}>Weekly Stats</Text>
                <View >
                    <View style={styles.squareCardLong}>
                        <Text style={{color:'#3f3d56'}}>Pending deadlines today</Text>
                        <Text style={{color:'#ff6584', fontWeight:'700', fontSize:20}}>{dueToday}</Text>
                    </View>
                    <View style={styles.squareCardLong}>
                        <Text style={{color:'#3f3d56'}}>Pending deadlines upcoming 7 days</Text>
                        <Text style={{color:'#f69448', fontWeight:'700',fontSize:20}}>{dueThisWeek}</Text>
                    </View>
                    
                </View>

                
                    <Text style={{alignSelf:'center', marginBottom:30, marginTop:30, fontWeight:'700',fontSize:20, color:'#3f3d56', borderColor:'lightgray', borderBottomWidth:1, width:'90%', paddingBottom:8,}}>Lifetime Stats</Text>
                    <View style={styles.bgEffect}>
                    <View style={styles.section1}>
                        <View style={styles.squareCard}>
                            <Text style={styles.numberPend}>{(myStats.pendingLifetime < 10) ? '0' + myStats.pendingLifetime : myStats.pendingLifetime}</Text>
                            <Text style={{color:'#3f3d56'}}>  Tasks Pending  </Text>
                        </View>
                        <View style={styles.squareCard}>
                            <Text style={styles.numberComp}>{(myStats.completedLifetime < 10) ? '0' + myStats.completedLifetime : myStats.completedLifetime}</Text>
                            <Text style={{color:'#3f3d56'}}>Tasks Completed</Text>
                        </View>
                    </View>
            </View>
            
            <View style={styles.quote}>
                    <Text style={styles.italics}>"Tomorrow becomes never. No matter how small the task, take the first step now!"</Text>
                </View>
                </ScrollView>
                </View>
            
        </SafeAreaView>
    )
}

export default Stats

const styles = StyleSheet.create({
    container:{
        minHeight:'100%',
        flex:1,
        backgroundColor:'#fff',
        paddingTop:30,
    },
    section1:{
        flexDirection:'row',
        justifyContent:'space-evenly'
    },
    bgEffect:{
        width:'95%',
        paddingTop:30,
        paddingBottom:25,
        borderRadius:25,
        alignSelf:'center',
        backgroundColor:'rgba(108,99,255,0.8)',
    },
    squareCard:{
        maxWidth:200,
        height:150,
        backgroundColor:'#f5f5f5',
        padding:20,
        borderRadius:50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        color:'#3f3d56'
    },
    numberPend:{
        color:'#ff6584',
        textAlign:'center',
        fontSize:60,
        fontWeight:'bold',
        
    },
    numberComp:{
        color:'#57b894',
        textAlign:'center',
        fontSize:60,
        fontWeight:'bold'
    },
    squareCardLong:{
        width:'90%',
        alignSelf:'center',
        height:50,
        marginBottom:20,
        backgroundColor:'#f5f5f5',
        borderRadius:10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingLeft:10,
        paddingRight:10,
        color:'#3f3d56'
    },
    quote:{
        marginTop:10,
        width:'95%',
        alignSelf:'center',
        height:80,
        marginBottom:50,
        color:'white',
        // backgroundColor:'rgba(178,176,190,0.4)',
        borderBottomRightRadius:20,
        borderBottomLeftRadius:20,
        shadowColor: "rgba(0,0,0,0.5)",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingLeft:10,
        paddingRight:10,
        
        
    },
    italics:{
        fontStyle:'italic',
        textAlign:'center',
        color:'#3f3d56',
        borderTopWidth:1,
        borderColor:'lightgray',
        paddingTop:20,
        marginTop:20
    }
})
