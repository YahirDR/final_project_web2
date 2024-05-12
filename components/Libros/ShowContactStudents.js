import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Picker, Image, Alert  } from 'react-native';
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
            Alert.alert("It´s necesary fill all the fields");
            return;
        }
        switch (true) {
            case !contactStudent.nameStudent:
              Alert.alert("It´s require a name.");
              return;
            case !contactStudent.Age:
              Alert.alert("It´s require an age.");
              return;
            case !contactStudent.university:
              Alert.alert("It´s require an school.");
              return;
            case !contactStudent.recidence:
              Alert.alert("It´s require a recidence.");
              return;
            case !contactStudent.phone:
              Alert.alert("It´s require a phono number.");
              return;
            default:
              break;
        }

        try {
            const docRef = doc(db, 'Students', route.params.studentId);
            await setDoc(docRef, contactStudent);
            Alert.alert("Student update successfully");
            navigation.goBack();
            // Si necesitas hacer algo después de la actualización, puedes hacerlo aquí, como navegar a otra pantalla.
            // navigation.navigate('OtraPantalla');
        } catch (error) {
            console.log(error);
        }
    };

    const Delete = async () => {
        Alert.alert(
            "Delete Student",
            "Are you sure you want to delete this student?",
            [
                {
                    text: "Cancel",
                    onPress: () => Alert.alert("Cancel"),
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: async () => {
                        try {
                            const docRef = doc(db, 'Students', route.params.studentId);
                            await deleteDoc(docRef);
                            Alert.alert("Student deleted successfully");
                            navigation.goBack();
                        } catch (error) {
                            console.log(error);
                        }
                    }
                }
            ],
            { cancelable: false }
        );
    }

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
                    title='Update'
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