import React, {useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import "./firebaseConfig";
import { getAuth, signOut , signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';



function Login() {
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const [user, setUser] = React.useState(null);
  const navigation = useNavigation();
  const auth = getAuth();


  const logout = () => {
    signOut(auth)
      .then(() => {
        console.log("Usuario cerró sesión exitosamente");
      })
      .catch((error) => {
        console.log("Error al cerrar sesión: ", error);
      });
  };
  // Agrega este efecto de montaje para llamar a logout cuando el componente se monta
  useEffect(() => {
    logout();
  }, []);  

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        onChangeEmail("");
        onChangePassword("");
        navigation.navigate('Home', { userId: user.uid }); // Pasa el ID del usuario
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        Alert();
      });
  };

  return (
    <View style={styles.container}>
      <Text>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        value={email}
      ></TextInput>
      <Text>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
        secureTextEntry={true}
      ></TextInput>
      <Button title="Login!" onPress={() => login()} />
      <View>
        <Button title="You don´t have account? create one " onPress={() => navigation.navigate("Sing Up")} />
      </View>
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

export default Login;
