import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Picker, Image, Alert, Platform  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
//FIREBASE
import firebaseConfig from '../../firebaseConnection/firebaseConfig';
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, setDoc, getDoc, updateDoc } from "firebase/firestore";

const db =getFirestore(firebaseConfig);

const ShowContactTeacher =({route})=>{


    const navigation = useNavigation();
    const [contact, setContact] = useState({});

    const getContactTeacher = async(id) =>{
        try{    
            const docRef =doc(db,'Teachers', id)
            const docSnap = await getDoc(docRef)
            setContact(docSnap.data());
            
            console.log("Data teacher:", contact);
        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        getContactTeacher(route.params.studentId);
      }, []);

    const handleChangeText = (value, key) => {
        setContact(prevState => ({
            ...prevState,
            [key]: value
        }));
        console.log(contact);
    };
    const update = async () =>{
        if (!contact.nameTeacher && !contact.Age && !contact.school && !contact.recidence && !contact.phone
            && !contact.email && !contact.courses
        ) {
          Alert.alert("It´s necesary fill all the fields");
          return;
        }
    
        switch (true) {
            case !contact.nameTeacher:
                showAlert("It´s require a name.");
                return;
            case !contact.Age:
                showAlert("It´s require an age.");
                return;
            case !contact.recidence:
                showAlert("It´s require a recidence.");
                return;
            case !contact.phone:
                showAlert("It´s require a phone number.");
                return;
            case !contact.email:
                showAlert("It´s require a email.");
                return;
            case !contact.courses:
                showAlert("It´s require a course(s).");
                return;
            case !contact.school:
                showAlert("It´s require a school.");
                return;
          default:
            break;
        }
        //VALIDAR EMAIL
        const emailRegex = /^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/;
        const phonoRegex = /^[0-9]+$/;
        // Verificar si el correo electrónico coincide con el formato regex
        if (!emailRegex.test(contact.email)) {
                showAlert('Email not validate !');
                return;
        }
        if (!phonoRegex.test(teacher.Age)) {
            showAlert('Age number must be numeric!');
            return;
        }
        //VALIDAR LONGITUD
        if (contact.phone.length !== 10) {
            showAlert("Phone number must be 10 characters long.");
            return;
        }
        try {
            const docRef = doc(db, 'Teachers', route.params.studentId);
            await setDoc(docRef, contact);
            showAlert("Teacher update successfully");
            navigation.goBack();
            // Si necesitas hacer algo después de la actualización, puedes hacerlo aquí, como navegar a otra pantalla.
            // navigation.navigate('OtraPantalla');
        } catch (error) {
            showAlert(error);
        }


    }


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
        const confirmed = window.confirm("Are you sure you want to delete this Teacher?");
        if (confirmed) {
            try {
                const docRef = doc(db, 'Teachers', route.params.studentId);
                await deleteDoc(docRef);
                window.alert("Teacher deleted successfully");
                navigation.goBack();
            } catch (error) {
                window.alert("An error occurred while deleting the Teacher: " + error);
            }
        } else {
            window.alert("Deletion canceled");
        }
    };
    const DeleteAndroid = async () => {
        Alert.alert(
            "Delete Teacher",
            "Are you sure you want to delete this teacher?",
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
                            const docRef = doc(db, 'Teachers', route.params.studentId);
                            await deleteDoc(docRef);
                            showAlert("Teacher deleted successfully");
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
            >
                Teacher Contac Data:
            </Text>
    
    
        {/*Nombre*/}
        <View
            style={styles.input}
        >
            <TextInput
                placeholder='Teacher Name'
                maxLength={35}
                onChangeText={(value) => handleChangeText(value, 'nameTeacher')}
                value={contact.nameTeacher || ''} 
            />
        </View>
        {/*EDAD*/}
        <View
            style={styles.input}
        >
            <TextInput 
                placeholder='Age'
                maxLength={2}
                keyboardType='numeric'
                onChangeText={(value) => handleChangeText(value, 'Age')}
                value={contact.Age || ''}
                
            />
        </View>
        {/*Institucion*/}
        <View
            style={styles.input}
        >
            <TextInput 
                placeholder='School where impart courses '
                maxLength={30}
                onChangeText={(value) => handleChangeText(value, 'school')}
                value={contact.school || ''}
            />
        </View>
            {/*Numero de telefono*/}
            <View
            style={styles.input}
        >
            <TextInput 
                placeholder='Phone'
                maxLength={10}
                keyboardType='numeric'
                onChangeText={(value) => handleChangeText(value, 'phone')}
                value={contact.phone || ''}
            />
        </View>
            {/*Recidencia*/}
        <View
            style={styles.input}
        >
            <TextInput 
                placeholder='recidence'
                maxLength={30}
                onChangeText={(value) => handleChangeText(value, 'recidence')}
                value={contact.recidence || ''}
            />
        </View>
            {/*MATERIAS*/}
        <View
            style={styles.input}
        >
            <TextInput 
                placeholder='Courses he taught'
                maxLength={30}
                onChangeText={(value) => handleChangeText(value, 'courses')}
                value={contact.courses || ''}
            />
        </View>
        <View
            style={styles.input}
        >
            <TextInput 
                placeholder='Email'
                maxLength={30}
                onChangeText={(value) => handleChangeText(value, 'email')}
                value={contact.email || ''}
            />
        </View>
        <View>
            <Button 
                title='Update Contact Teacher'
                onPress={update}
                olor='#007bff'
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
  
    image: {
      height:250,
      width: 250,
      resizeMode: 'contain',
  
    },
    TextTitle:{
        color: 'black',
        fontFamily: 'sans-serif-medium',
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 40
    },
    containerImage:{
      alignItems: 'center',
      marginBottom: 30
    },
    buttomDelete:{
        marginTop: 10
    }
  });

export default ShowContactTeacher;