import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, StatusBar } from 'react-native';
import SingUp from './components/SingUp';
import Login from './components/Login';


export default function App() {
  return (
    <View style={styles.container}>
      {/*<SingUp/>*/}
      <Login/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',

  }
});