import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Easing, StyleSheet, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import Sidebar from './screens/Sidebar';
import AddChat from './screens/AddChat';
import ChatScreen from './screens/ChatScreen';
import { Platform } from 'react-native'
import { StatusBar } from 'expo-status-bar';


const Stack = createStackNavigator();

const openConfig = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 200,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const closeConfig = {
  animation: 'timing',
  config: {
    duration:200,
    easing: Easing.linear
  },
};

const globalScreenOptions = {
  headerStyle: {backgroundColor: "#2C6BED"},
  headerTitleStyle: {color: "white"},
  headerTintColor: "white",
  gestureEnabled: false,
  gestureDirection:"horizontal",
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  transitionSpec: {
    open: openConfig,
    close:closeConfig
  }
}

export default function App() {

  useEffect(()=>{
    if(Platform.OS === "ios" || Platform.OS === "andriod") LogBox.ignoreLogs(['Setting a timer for a long period of time'])
  },[])
  
  return (
    <NavigationContainer style={styles.container}>
    <StatusBar style="light"/>
      <Stack.Navigator screenOptions={globalScreenOptions}>
        <Stack.Screen options={{title: "Sign Up"}} name="Login" component={LoginScreen}/>
        <Stack.Screen options={{title: "Register"}} name="Register" component={RegisterScreen}/>
        <Stack.Screen options={{title: "Taskengger"}} name="Sidebar" component={Sidebar}/>
        <Stack.Screen options={{title: "New Chat"}} name="AddChat" component={AddChat} />
        <Stack.Screen options={{title: "Chat"}} name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight:'100%',
  },
});
