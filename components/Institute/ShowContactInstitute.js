import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Picker, Image, Alert, Platform  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
//FIREBASE
import firebaseConfig from '../../firebaseConnection/firebaseConfig';
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, setDoc, getDoc, updateDoc } from "firebase/firestore";

const db =getFirestore(firebaseConfig);


const ShowContactInstitute = ({route}) =>{

    const navigation = useNavigation();
    const [contact, setContact] = useState({});

    const getContactInstitute = async(id) =>{
        try{    
            const docRef =doc(db,'Institutes', id)
            const docSnap = await getDoc(docRef)
            setContact(docSnap.data());
            
            console.log("Data Institute:", contact);
        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        getContactInstitute(route.params.studentId);
        console.log("id ruita",route.params.studentId);
    }, []);
    
    const handleChangeText = (value, key) => {
        setContact(prevState => ({
            ...prevState,
            [key]: value
        }));
        console.log(contact);
    };

    const update = async () =>{
        if (!contact.nameInstitute && !contact.address && !contact.type && !contact.phone
            && !contact.email 
        ) {
          showAlert("It´s necesary fill all the fields !");
          return;
        }
    
        switch (true) {
            case !contact.nameInstitute:
                showAlert("It´s require a name of institute !");
                return;
            case !contact.address:
                showAlert("It´s require an address !");
                return;
            case !contact.type:
                showAlert("It´s require a type of the institute !");
                return;
            case !contact.phone:
                showAlert("It´s require a phone number !");
                return;
            case !contact.email:
                showAlert("It´s require a email !");
                return;
          default:
            break;
        }
        //VALIDAR EMAIL
        const emailRegex = /^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/;
        const phonoRegex = /^[0-9]+$/;
        // Verificar si el correo electrónico coincide con el formato regex
        if (!emailRegex.test(contact.email)) {
              showAlert('Email not validate!');
              return;
        }
        if (!phonoRegex.test(contact.phone)) {
          showAlert('Phone number must be numeric!');
          return;
        }
        //VALIDAR LONGITUD
        if (contact.phone.length !== 10) {
          showAlert("Phone number must be 10 characters long.");
          return;
        }  
        try {
            const docRef = doc(db, 'Institutes', route.params.studentId);
            await setDoc(docRef, contact);
            showAlert("Institute update successfully");
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
                const docRef = doc(db, 'Institutes', route.params.studentId);
                await deleteDoc(docRef);
                window.alert("Institute contact deleted successfully");
                navigation.goBack();
            } catch (error) {
                window.alert("An error occurred while deleting the Institute: " + error);
            }
        } else {
            window.alert("Deletion canceled");
        }
    };
    const DeleteAndroid = async () => {
        Alert.alert(
            "Delete Institute",
            "Are you sure you want to delete this Institutes contact?",
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
                            const docRef = doc(db, 'Institutes', route.params.studentId);
                            await deleteDoc(docRef);
                            showAlert("Institute deleted successfully");
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
            Create a Teacher Contac:
          </Text>
         {/*Nombre*/}
         <View
          style={styles.input}
         >
            <TextInput
                placeholder='Institute'
                maxLength={65}
                onChangeText={(value) => handleChangeText(value, 'nameInstitute')}
                value={contact.nameInstitute || ''}
            />
         </View>
         {/*adress*/}
         <View
          style={styles.input}
         >
            <TextInput
                placeholder='Addres'
                maxLength={65}
                onChangeText={(value) => handleChangeText(value, 'address')}
                value={contact.address || ''}
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
          {/*Email*/}
         <View
          style={styles.input}
         >
            <TextInput
                placeholder='Email'
                maxLength={45}
                onChangeText={(value) => handleChangeText(value, 'email')}
                value={contact.email || ''}
            />
         </View>
          {/*type*/}
         <View
          style={styles.input}
         >
            <TextInput
                placeholder='Type [public, private]'
                maxLength={45}
                onChangeText={(value) => handleChangeText(value, 'type')}
                value={contact.type || ''}
            />
         </View>
        <View>
            <Button 
                title='Update Contact Institute'
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
    TextTitle:{
      color: 'black',
      fontFamily: 'sans-serif-medium',
      fontSize: 18,
      textAlign: 'center',
      marginBottom: 40
    },
    image: {
      height:250,
      width: 250,
      resizeMode: 'contain',
  
    },
    containerImage:{
      alignItems: 'center',
      marginBottom: 30
    },
    buttomDelete:{
        marginTop: 10
    }
  });


  export default ShowContactInstitute;