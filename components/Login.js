import React from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import "./firebaseConfig";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const [user, setUser] = React.useState(null);

  const auth = getAuth();

  // Escucha los cambios en el estado de autenticación del usuario
  auth.onAuthStateChanged((user) => {
    if (user) {
      // El usuario está autenticado
      console.log("Usuario autenticado: ", user.email);
      setUser(user);
      return;
    } else {
      // El usuario no está autenticado
      console.log("No hay ningún usuario autenticado");
      setUser(null);
    }
  });

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        onChangeEmail("");
        onChangePassword("");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
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
