import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Picker, Image, Alert, Platform  } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
//FIREBASE
import firebaseConfig from '../../firebaseConnection/firebaseConfig';
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, setDoc, getDoc, updateDoc } from "firebase/firestore";

import { useNavigation } from '@react-navigation/native';

const db =getFirestore(firebaseConfig);

const ShowContactStudents = ({route }) =>{

    const navigation = useNavigation();
    const [name, setName] = useState("");
    const [contactStudent, setContactStudent] = useState({});

    const getContactStudent = async(id) =>{
        try{    
            const docRef =doc(db,'Students', id)
            const docSnap = await getDoc(docRef)
            setContactStudent(docSnap.data());
            
            console.log("Data estudiante:", contactStudent);
        }catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
      getContactStudent(route.params.studentId);
    }, []);

    const handleChangeText = (value, key) => {
        setContactStudent(prevState => ({
            ...prevState,
            [key]: value
        }));
        console.log(contactStudent);
    };

    const update = async () => {
        if (!contactStudent.nameStudent && !contactStudent.Age && !contactStudent.controlNumber && !contactStudent.university && !contactStudent.recidence) {
            showAlert("It´s necesary fill all the fields");
            return;
        }
        switch (true) {
            case !contactStudent.nameStudent:
                showAlert("It´s require a name.");
              return;
            case !contactStudent.Age:
                showAlert("It´s require an age.");
              return;
            case !contactStudent.university:
                showAlert("It´s require an school.");
              return;
            case !contactStudent.recidence:
                showAlert("It´s require a recidence.");
              return;
            case !contactStudent.phone:
                showAlert("It´s require a phono number.");
              return;
            default:
              break;
        }
        const phonoRegex = /^[0-9]+$/;

        if (!phonoRegex.test(contactStudent.phone)) {
          showAlert('Phone number must be numeric!');
          return;
        }
        if (!phonoRegex.test(contactStudent.Age)) {
          showAlert('Age number must be numeric!');
          return;
        }
        // Validar la longitud del número de teléfono
        if (contactStudent.phone.length !== 10) {
            showAlert("Phone number must be 10 characters long.");
            return;
        } 
        try {
            const docRef = doc(db, 'Students', route.params.studentId);
            await setDoc(docRef, contactStudent);
            showAlert("Student update successfully");
            navigation.goBack();
            // Si necesitas hacer algo después de la actualización, puedes hacerlo aquí, como navegar a otra pantalla.
            // navigation.navigate('OtraPantalla');
        } catch (error) {
            showAlert(error);
        }
    };
    const showAlert = (message) => {
        if (Platform.OS === 'web') {
            alert(message);
        } else {
            Alert.alert(message);
        }
    };

    const Delete = async () => {
        if (Platform.OS === 'android') {
            // En Android, llama a la función Delete
            DeleteAndroid();
        } else {
            // En otras plataformas (como web), llama a la función DeleteWeb
            DeleteWeb();
        }
    };
    
    const DeleteWeb = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this student?");
        if (confirmed) {
            try {
                const docRef = doc(db, 'Students', route.params.studentId);
                await deleteDoc(docRef);
                window.alert("Student deleted successfully");
                navigation.goBack();
            } catch (error) {
                window.alert("An error occurred while deleting the student: " + error);
            }
        } else {
            window.alert("Deletion canceled");
        }
    };
    
    const DeleteAndroid = async () => {
        Alert.alert(
            "Delete Student",
            "Are you sure you want to delete this student?",
            [
                {
                    text: "Cancel",
                    onPress: () => showAlert("Cancel"),
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: async () => {
                        try {
                            const docRef = doc(db, 'Students', route.params.studentId);
                            await deleteDoc(docRef);
                            showAlert("Student deleted successfully");
                            navigation.goBack();
                        } catch (error) {
                            showAlert(error);
                        }
                    }
                }
            ],
            { cancelable: false }
        );
    };


    return (
        <View style={styles.container}>
            <Text
                style={styles.TextTitle}
            >Student Data:
            </Text>

            {/*Nombre*/}
            <View style={styles.input}>
                <TextInput
                    placeholder='Student Name'
                    maxLength={40}
                    onChangeText={(value) => handleChangeText(value, 'nameStudent')}
                    value={contactStudent.nameStudent || ''} // Agregado aquí
                />
            </View>
            {/*EDAD*/}
            <View style={styles.input}>
                <TextInput
                    placeholder='Age'
                    maxLength={3}
                    keyboardType='numeric'
                    onChangeText={(value) => handleChangeText(value, 'Age')}
                    value={contactStudent.Age || ''} // Agregado aquí
                />
            </View>
            {/*Universidad*/}
            <View style={styles.input}>
                <TextInput
                    placeholder='School'
                    maxLength={30}
                    onChangeText={(value) => handleChangeText(value, 'university')}
                    value={contactStudent.university || ''} // Agregado aquí
                />
            </View>
            {/*Phonee */}
            <View style={styles.input}>
                <TextInput
                    placeholder='Phone'
                    maxLength={10}
                    keyboardType='numeric'
                    onChangeText={(value) => handleChangeText(value, 'phone')}
                    value={contactStudent.phone || ''} // Agregado aquí
                />
            </View>
            {/*Recidencia*/}
            <View style={styles.input}>
                <TextInput
                    placeholder='Recidence'
                    maxLength={30}
                    onChangeText={(value) => handleChangeText(value, 'recidence')}
                    value={contactStudent.recidence || ''} // Agregado aquí
                />
            </View>
            <View>
                <Button
                    color='#007bff'
                    title='Update Contact Student'
                    onPress={update}
                />
            </View>
            <View
                style={styles.buttomDelete}
            >
                <Button
                    color='#dc3545'
                    title='Delete'
                    onPress={Delete}
                />
            </View>
        </View>
    );
    
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      padding:35
    },
    input: {
      marginBottom:30,
      borderBottomWidth:3,
      borderBottomColor: "#cccccc"
    },
    TextTitle:{
        color: 'black',
        fontFamily: 'sans-serif-medium',
        fontSize: 18,
        textAlign: 'center'
    },
    buttomDelete:{
        marginTop: 10
    }
  });

export default ShowContactStudents;