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
import ShowContactTeacher from './components/teacher/ShowContactTeacher';
import ContactListInstitute from './components/Institute/ContactListInstitute';
import CreateInstitute from './components/Institute/CreateInstitute';
import ShowContactInstitute from './components/Institute/ShowContactInstitute';


export default function App() {
  const Stack = createNativeStackNavigator();
  
  return (
  <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Login'
        screenOptions={{
          headerStyle: {
            backgroundColor: '#FBE0E0', // Color de fondo del header
          },
          headerTintColor: 'black', // Color del texto del header
          headerTitleStyle: {
            fontWeight: 'bold', // Estilo del título del header
          },
        }}
      >
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Sing Up' component={SingUp} />
      <Stack.Screen 
      name='Home' 
      component={Home} 
      options={{ headerShown: false }} // Oculta la flecha de regreso
      />
      {/*STUDENT NAVIGATE*/}
      <Stack.Screen name='Create Student' component={CreateStudent} />
      <Stack.Screen name='Contact Students List' component={ContactListStudents} />
      <Stack.Screen name='Contact Student data' component={ShowContactStudents} />
      {/*TEACHER NAVIGATE*/}
      <Stack.Screen name='Create Teacher' component={CreateTeacher} />
      <Stack.Screen name='Contact teacher List' component={ContactListTeacher} />
      <Stack.Screen name='Contact Teacher data' component={ShowContactTeacher} />
      {/*INSTITUTE NAVIGATE*/}
      <Stack.Screen name='Create Institute' component={CreateInstitute} />
      <Stack.Screen name='Contact Institute List' component={ContactListInstitute} />
      <Stack.Screen name='Contact Institute data' component={ShowContactInstitute} />
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