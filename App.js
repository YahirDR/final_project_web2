import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, StatusBar } from 'react-native';
import SingUp from './components/SingUp';
import Login from './components/Login';
import Home from './components/Home';
import ContactListStudents from "./components/Libros/ContactListStudents";
import CreateStudent from './components/Libros/CreateStudent';
import ShowContactStudents from './components/Libros/ShowContactStudents';
//navegacion
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ContactListTeacher from './components/teacher/ContactListTeacher';
import CreateTeacher from './components/teacher/CreateTeacher';


export default function App() {
  const Stack = createNativeStackNavigator();

  
  return (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName='Login'
    >
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Sing Up' component={SingUp} />
      <Stack.Screen 
      name='Home' 
      component={Home} 
      options={{ headerShown: false }} // Oculta la flecha de regreso
      />
      <Stack.Screen name='Create Student' component={CreateStudent} />
      <Stack.Screen name='Contact Students List' component={ContactListStudents} />
      <Stack.Screen name='Contact Student data' component={ShowContactStudents} />
      {/*TEACHER NAVIGATE*/}
      <Stack.Screen name='Create Teacher' component={CreateTeacher} />
      <Stack.Screen name='Contact teacher List' component={ContactListTeacher} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',

  }
});