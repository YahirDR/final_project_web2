import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, StatusBar } from 'react-native';
import SingUp from './components/SingUp';
import Login from './components/Login';
import Home from './components/Home';
import ContactListStudents from "./components/Libros/ContactListStudents";

//navegacion
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import CreateStudent from './components/Libros/CreateStudent';


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