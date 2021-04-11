import React from 'react'
import { ScrollView } from 'react-native';
import { Image } from 'react-native';
import { StyleSheet, Text, View } from 'react-native'
import Unorderedlist from 'react-native-unordered-list';
import{firebaseLogo, firestoreLogo, expoLogo, nativeLogo,} from '../assets/index'

const About = () => {
    return (
        <View style={{padding:10}}>
            <ScrollView>
                <Text style={{alignSelf:'center', marginBottom:30, marginTop:20, fontWeight:'700',fontSize:20, color:'#3f3d56',  borderColor:'lightgray', borderBottomWidth:1, width:'90%', paddingBottom:8,}}>About App</Text>
                <Text style={styles.description}>Taskengger is a project and team management application with two major functionalities. As the name goes, <Text style={{ fontWeight: 'bold' }}>Taskengger which means "Task Manager" + "Messenger"</Text> 
                It can be used to carry out discussions among different departments of a project team with accessibilty control defined by the project managers and it also helps the employees keep a note of their tasks and their deadlines. The application also displays
                the primary data to contact the team members and maintains stats of their tasks completion based on the pending and completed tasks.{'\n\n'}<Text style={{ fontWeight: 'bold', fontStyle:'italic' }}>This application is not "open for all" type and is designed for specific company/organization only based on their request.</Text> </Text>
                
                <Text style={{alignSelf:'center', marginBottom:30, marginTop:30, fontWeight:'700',fontSize:20, color:'#3f3d56',  borderColor:'lightgray', borderBottomWidth:1, width:'90%', paddingBottom:8}}>Features</Text>
                    <Unorderedlist bulletUnicode={0x2022} color="#2f2e41" style={{paddingLeft:20,lineHeight:23,textAlign:'justify',fontSize:15}}>                    
                        <Text style={{textAlign:'justify',fontSize:15,color:"#2f2e41",lineHeight:23,paddingRight:20,marginBottom:20}}>Messenger</Text>
                        <Text style={{textAlign:'justify',fontSize:14,color:"gray",lineHeight:23, paddingRight:20,marginBottom:10}}>The name desribes everything. This feature helps the employees logged in to chat in discussion groups of their department. The sub features are:</Text>
                        <Unorderedlist bulletUnicode={0x2043} color="#6c63ff" style={{paddingLeft:20,lineHeight:23,textAlign:'justify',fontSize:12}}>
                            <Text style={{textAlign:'justify',fontSize:15,color:"#6c63ff",lineHeight:23,paddingRight:20}}>Department based accessibility</Text>
                            <Text style={{textAlign:'justify',fontSize:14,color:"gray",lineHeight:23, paddingRight:20,marginBottom:10}}>Disuss about the project and assign/get assigned with tasks for your project role from your superiors. Access to disscussion lobbies that are made only for your job role/department. Lobbies created with accessibility as "all" is visible to all the employees irrespective of their job role whereas managers are able to view all the discussion lobbies without any restrictions.</Text>
                        </Unorderedlist>
                        <Unorderedlist bulletUnicode={0x2043} color="#6c63ff" style={{paddingLeft:20,lineHeight:23,textAlign:'justify',fontSize:12}}>
                            <Text style={{textAlign:'justify',fontSize:15,color:"#6c63ff",lineHeight:23,paddingRight:20}}>Create department discussions</Text>
                            <Text style={{textAlign:'justify',fontSize:14,color:"gray",lineHeight:23, paddingRight:20,marginBottom:10}}>Create department-wise discussion lobbies and assign a lobby image (optional) along with the accessbility definition (what roles can access this disscussion lobby). Only managers are alowed to create department discussion lobbies.</Text>
                        </Unorderedlist>
                        <Unorderedlist bulletUnicode={0x2043} color="#6c63ff" style={{paddingLeft:20,lineHeight:23,textAlign:'justify',fontSize:12}}>
                            <Text style={{textAlign:'justify',fontSize:15,color:"#6c63ff",lineHeight:23,paddingRight:20}}>Realtime Chat updates</Text>
                            <Text style={{textAlign:'justify',fontSize:14,color:"gray",lineHeight:23, paddingRight:20,marginBottom:10}}>Once your manager creates a discussion lobby for your department and gives you the accessibility, you can send messages in the lobby to communicate with your fellow departmentmates and decide various aspects of the project. The chats have the sender name and the timestamp based on your timezone along with realtime updates in the chats. </Text>
                        </Unorderedlist>
                    </Unorderedlist>

                    <Unorderedlist bulletUnicode={0x2022} color="#2f2e41" style={{paddingLeft:20,lineHeight:23,textAlign:'justify',fontSize:15,marginTop:30}}>                    
                        <Text style={{textAlign:'justify',fontSize:15,color:"#2f2e41",lineHeight:23,paddingRight:20,marginBottom:20,marginTop:30}}>Task Manager</Text>
                        <Text style={{textAlign:'justify',fontSize:14,color:"gray",lineHeight:23, paddingRight:20,marginBottom:10}}>The task manager feature allows you to note down the tasks that you have been assigned in between the discussion in the department-wise lobbies. The sub features are :</Text>
                        <Unorderedlist bulletUnicode={0x2043} color="#6c63ff" style={{paddingLeft:20,lineHeight:23,textAlign:'justify',fontSize:12}}>
                            <Text style={{textAlign:'justify',fontSize:15,color:"#6c63ff",lineHeight:23,paddingRight:20}}>Add Tasks</Text>
                            <Text style={{textAlign:'justify',fontSize:14,color:"gray",lineHeight:23, paddingRight:20,marginBottom:10}}>Add tasks to you panding tasks list along with a deadline that you have been given by your project manager.</Text>
                        </Unorderedlist>
                        <Unorderedlist bulletUnicode={0x2043} color="#6c63ff" style={{paddingLeft:20,lineHeight:23,textAlign:'justify',fontSize:12}}>
                            <Text style={{textAlign:'justify',fontSize:15,color:"#6c63ff",lineHeight:23,paddingRight:20}}>Pending Tasks</Text>
                            <Text style={{textAlign:'justify',fontSize:14,color:"gray",lineHeight:23, paddingRight:20,marginBottom:10}}>This list helps you to keep track of your pending tasks and the approaching deadline by mentioning the status of the task(pending/completed), due date of the task and number of days left for you to complete the task. Once you have completed a task, you can click on the "Mark as completed" butto beside the tasks to move it to the completed list. All the activities (add/modify/delete tasks) are in realtime.</Text>
                        </Unorderedlist>
                        <Unorderedlist bulletUnicode={0x2043} color="#6c63ff" style={{paddingLeft:20,lineHeight:23,textAlign:'justify',fontSize:12}}>
                            <Text style={{textAlign:'justify',fontSize:15,color:"#6c63ff",lineHeight:23,paddingRight:20}}>Completed Tasks</Text>
                            <Text style={{textAlign:'justify',fontSize:14,color:"gray",lineHeight:23, paddingRight:20,marginBottom:10}}>This list keeps track of the tasks that you have marked as completed from your pending list and gives the user an option to mark it as "pending" as well. This is becasue the user might have marked a task as completed and then realizes that theres still some parts left for the task to be completed. This list also as a "clear all" button that helps the user to clear all the completed tasks from the list when the list gets highly populated.</Text>
                        </Unorderedlist>
                        <Unorderedlist bulletUnicode={0x2043} color="#6c63ff" style={{paddingLeft:20,lineHeight:23,textAlign:'justify',fontSize:12}}>
                            <Text style={{textAlign:'justify',fontSize:15,color:"#6c63ff",lineHeight:23,paddingRight:20}}>Stats</Text>
                            <Text style={{textAlign:'justify',fontSize:14,color:"gray",lineHeight:23, paddingRight:20,marginBottom:10}}>This feature is the opening screen of the task manager and it displays various stats such as "Number of tasks pending today", "Number of tasks pending in the upcoming 7 days", "Number of tasks pending overall" and "Number of tasks that you have completed in yout lifetime ever since youve started using the app". The last mentioned stat keeps the count of your completed tasks even if you clear the tasks from the completed tasks list and delete the tasks permanently.</Text>
                        </Unorderedlist>
                    </Unorderedlist>

                    <Unorderedlist bulletUnicode={0x2022} color="#2f2e41" style={{paddingLeft:20,lineHeight:23,textAlign:'justify',fontSize:15,marginTop:30}}>                    
                    <Text style={{textAlign:'justify',fontSize:15,color:"#2f2e41",lineHeight:23,paddingRight:20,marginBottom:20,marginTop:30}}>My Team</Text>
                    <Text style={{textAlign:'justify',fontSize:14,color:"gray",lineHeight:23, paddingRight:20,marginBottom:10}}>This feature displays all the participants/employees in the project team who are using this application along with their job role and email address to facilitate ease of tracking and getting the email IDs of fellow colleagues.</Text>
                    </Unorderedlist>


                <Text style={{alignSelf:'center', marginBottom:30, marginTop:30, fontWeight:'700',fontSize:20, color:'#3f3d56',  borderColor:'lightgray', borderBottomWidth:1, width:'90%', paddingBottom:8,}}>Tech Stack</Text>

                <View style={styles.tech}>
                    <Image source={expoLogo} style={{width:52,height:58}}/>
                    <Image source={nativeLogo} style={{width:60,height:60}}/>
                </View>

                <View style={styles.tech}>
                    <Image source={firebaseLogo} style={{width:55,height:55}}/>
                    <Image source={firestoreLogo} style={{width:55,height:50}}/>
                </View>

                <View style={{flexDirection:'row',alignSelf:'center', alignItems:'center',justifyContent:'space-between', paddingTop:15, paddingBottom:15, width:'90%', borderColor:'lightgray', borderTopWidth:1,}}>
                    <Text style={{ fontWeight:'700',fontSize:20, color:'#3f3d56',}}>Release Version</Text>
                    <Text style={{ fontSize:15, color:'gray'}}>v2021.04.10.01.02</Text>
                </View>
            </ScrollView>
        </View>
    )
}

export default About

const styles = StyleSheet.create({
    description:{
        color:'gray',
        textAlign:'justify',
        width:'95%',
        paddingLeft:15,
        lineHeight:23    
    },
    tech:{
        flexDirection:'row',
        alignSelf:'center',
        width:'100%',
        marginBottom:30,
        justifyContent:'space-around'
    }
})
