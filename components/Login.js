import React, {useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert, Platform, TouchableOpacity } from "react-native";
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
  
  const showAlert = (message) => {
    if (Platform.OS === 'web') {
        alert(message);
    } else {
        Alert.alert(message);
    }
  };
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
        const shortErrorCode = errorCode.split('/')[1];
        showAlert(`Error : ${shortErrorCode}`);
        
      });
  };

  return (
    <View style={styles.container}>
      <View
      style={styles.containerLogin}
      >
        <Text
          style={styles.loginText}
        >
          LOGIN
        </Text>
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
        <View
          style={{marginBottom:10 }}
        >
        <Button title="Login!" color='green'  onPress={() => login()} />
      </View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Sing Up")}
      >
        <Text
          style={styles.singUpLink}
        >
        You don´t have account? create one
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1, // Agregar bordes
    borderColor: "black", // Color de los bordes
    borderRadius: 8, // Radio de los bordes
    padding: 20, // Espaciado interno para el contenido
  },
  containerLogin:{
    borderWidth: 1, // Agregar bordes
    borderColor: "black", // Color de los bordes
    borderRadius: 8, // Radio de los bordes
    padding: 20, // Espaciado interno para el contenido
    backgroundColor: "white",
  },
  loginText: {
    fontSize: 20, // Tamaño del texto
    fontWeight: "bold", // Peso de la fuente
    color: "black", // Color del texto
    marginBottom: 10, // Margen inferior
    textAlign: 'center'
  },
  singUpLink:{
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold", // Peso de la fuente
    color: "blue", // Color del texto
    textDecorationLine: "underline", // Agregar subrayado
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
