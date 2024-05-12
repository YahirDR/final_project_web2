import React, {useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import "./firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';



function SingUp() {
  const [email, setEmail] = useState("");
  const [password, onChangePassword] = React.useState("");
  const navigation = useNavigation();

  const auth = getAuth();
  const createUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        Alert.alert("User created successfully");
        // navigation.pop(); // Comenta o elimina esta línea
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`Error Code: ${errorCode}`);
        console.log(`${errorMessage}`);
        
        if(errorCode){
            const shortErrorCode = errorCode.split('/')[1];
            Alert.alert(`Error : ${shortErrorCode}`);
        }
      });
  };

  return (
    <View style={styles.container}>
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
      <Button title="Sign Up!" onPress={() => createUser()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
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