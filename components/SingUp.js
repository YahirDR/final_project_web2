import React, {useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert, Platform } from "react-native";
import "./firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';



function SingUp() {
  const [email, setEmail] = useState("");
  const [password, onChangePassword] = React.useState("");
  const navigation = useNavigation();

  const showAlert = (message) => {
    if (Platform.OS === 'web') {
        alert(message);
    } else {
        Alert.alert(message);
    }
  };
  const auth = getAuth();
  const createUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        showAlert("User created successfully");
        // navigation.pop(); // Comenta o elimina esta línea
        setEmail("");
        onChangePassword("");
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`Error Code: ${errorCode}`);
        console.log(`${errorMessage}`);
        
        if(errorCode){
            const shortErrorCode = errorCode.split('/')[1];
            showAlert(`Error : ${shortErrorCode}`);
        }
      });
  };

  return (
    <View style={styles.container}>
      <View
        style={styles.containerLogin}
      >
        <Text
          style={styles.singUpText}
        >
          Sing Up
        </Text>
      <Text>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
      ></TextInput>
      <Text>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
        secureTextEntry={true}
      ></TextInput>
      <Button title="Sign Up!" color='green' onPress={() => createUser()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black" // Color de los bordes

  },
  containerLogin:{
    borderWidth: 1, // Agregar bordes
    borderColor: "black", // Color de los bordes
    borderRadius: 8, // Radio de los bordes
    padding: 20, // Espaciado interno para el contenido
    backgroundColor: "white"
  },
  singUpText: {
    fontSize: 20, // Tamaño del texto
    fontWeight: "bold", // Peso de la fuente
    color: "black", // Color del texto
    marginBottom: 10, // Margen inferior
    textAlign: 'center'
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10
  }
});

export default SingUp;