import React, { useLayoutEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import TaskScreen from './TaskScreen';
import { TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-elements'
import { Icon } from 'react-native-elements'
import { auth, db } from '../firebase'
import Team from './Team';
import { Ionicons } from '@expo/vector-icons';
import About from './About';




const Drawer = createDrawerNavigator();

const Sidebar = ({navigation,route}) => {

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Taskengger",
            headerTitleAlign: "left",
            headerStyle: {backgroundColor: "#6C63FF"},
            headerTitleStyle: {color: "white"},
            headerTintColor: {color: "white"},
            headerRight: () => (
                <View style={{marginRight: 20}}>
                    <TouchableOpacity activeOpacity={0.5} onPress={signOutUser}>
                        <Avatar rounded source={{uri: auth?.currentUser?.photoURL}}/>
                    </TouchableOpacity>
                </View>
            ),
            headerLeft: () => (
                <View style={{marginLeft: 10}} >
                    <TouchableOpacity activeOpacity={0.5} onPress={()=> navigation.dispatch(DrawerActions.toggleDrawer())}>
                        <Icon name="menu" color="white"/>
                    </TouchableOpacity>
                </View>
            ),
        })
    }, [navigation])

    const signOutUser = async () =>{
        await auth.signOut().then(()=>{
            navigation.replace("Login")
        })
    }



    return (
        <Drawer.Navigator drawerType="slide" edgeWidth={400} drawerContentOptions={{activeTintColor: '#6C63FF'}}>
            
            <Drawer.Screen name="All Chats" options={{
                title: 'All chats',
                drawerIcon: ({focused,color, size}) => (
                  <Ionicons name={focused ? "chatbubbles" :"chatbubbles-outline"} size={size} color={color} />
                ),
              }} component={HomeScreen}/>
            <Drawer.Screen name="My Tasks" options={{
                title: 'My Tasks',
                drawerIcon: ({focused,color, size}) => (
                    <Ionicons name={focused ? "clipboard" :"clipboard-outline"} size={size} color={color} />
                ),
              }} component={TaskScreen} />
            <Drawer.Screen name="The Team" options={{
                title: 'The Team',
                drawerIcon: ({focused,color, size}) => (
                    <Ionicons name={focused ? "people" :"people-outline"} size={size} color={color} />
                ),
              }} component={Team} />
              <Drawer.Screen name="About App" options={{
                title: 'About app',
                drawerIcon: ({focused,color, size}) => (
                    <Ionicons name={focused ? "information-circle" :"information-circle-outline"} size={size} color={color} />
                ),
              }} component={About} />
        </Drawer.Navigator>
    )
}

export default Sidebar

const styles = StyleSheet.create({})
