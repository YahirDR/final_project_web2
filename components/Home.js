import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, Platform, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';

//firebase
import "./firebaseConfig";
import { getAuth, signOut } from "firebase/auth";

const Home = ({ route }) => {
    const navigation = useNavigation();
    const [idUser, setUserId] = useState(route.params.userId);
    console.log(route.params);
    const auth = getAuth();

    const logout = () => {
        signOut(auth)
            .then(() => {
                showAlert("Session close successfully");
                navigation.goBack();
            })
            .catch((error) => {
                showAlert("Error al cerrar sesión: ", error);
            });
    };
    // Mostrar alerta dependiendo de la plataforma
    const showAlert = (message) => {
        if (Platform.OS === 'web') {
            alert(message);
        } else {
            Alert.alert(message);
        }
    };
    return (
        <View style={styles.container}>
            <View  style={styles.content}>
                <Text style={styles.title}>Welcome to our Academic Contacts Project!</Text>
                <Text style={styles.description}>
                    We're thrilled to have you here.{"\n\n"}
                    In this project, you have the opportunity to efficiently organize{"\n\n"}
                    and manage all your academic contacts.{"\n\n"}

                    With our user-friendly interface, you can easily add, edit,{"\n\n"}
                    and delete your contacts with just a few clicks. Whether it's professors,{"\n\n"}
                    fellow students, or academic institutions, you can store their names, addresses, phone numbers, emails, and more,{"\n\n"}
                    all in one secure place.
                </Text>
                <TouchableOpacity style={[styles.button, { backgroundColor: '#007bff' }]} onPress={() => navigation.navigate('Contact Students List', { userId: route.params.userId })}>
                    <Text style={styles.buttonText}>Contacts Students</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: '#28a745' }]} onPress={() => navigation.navigate('Contact teacher List', { userId: route.params.userId })}>
                    <Text style={styles.buttonText}>Contacts Teachers</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: '#ffc107' }]} onPress={() => navigation.navigate('Contact Institute List', { userId: route.params.userId })}>
                    <Text style={styles.buttonText}>Contacts Institute</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]} onPress={logout}>
                    <Text style={styles.buttonText}>Exit</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        borderWidth: 10, // Agregar bordes
        borderColor: "orange", // Color de los bordes
        backgroundColor: '#EBDBD4',
        borderRadius: 70, // Radio de los bordes
        padding: 30, // Espaciado interno para el contenido
        marginTop: 80
    },
    container: {
        flex: 1,
        backgroundColor: 'black',
        borderWidth: 1, // Agregar bordes
        borderColor: "black", // Color de los bordes
        borderRadius: 8, // Radio de los bordes
        padding: 20 // Espaciado interno para el contenido
      },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10,
        width: '100%'
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16
    }
});

export default Home;
