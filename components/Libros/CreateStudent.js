import React, { useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Picker, Image, Alert  } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import firebaseConfig from '../firebaseConfig';
import { collection, addDoc, getFirestore} from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';



const db =getFirestore(firebaseConfig);

const CreateStudent = ({route}) => {
  const [refresh, setRefresh] = useState(false);

  const [selectImage, setSelectImage] = useState(null);
  const navigation = useNavigation();


  //Crear estudiante
  const onSend = async()=>{
    if (!student.nameStudent && !student.Age && !student.controlNumber && !student.university && !student.recidence) {
      Alert.alert("It´s necesary fill all the fields");
      return;
    }

    switch (true) {
      case !student.nameStudent:
        Alert.alert("It´s require a name.");
        return;
      case !student.Age:
        Alert.alert("It´s require an age.");
        return;
      case !student.university:
        Alert.alert("It´s require an school.");
        return;
      case !student.recidence:
        Alert.alert("It´s require a recidence.");
        return;
      default:
        break;
    }
    try{
        await addDoc(collection(db, "Students"),{
            ...student
        })
        Alert.alert("Contact Student create");
        navigation.goBack();
    }catch(error){
        console.error(error);
    }
  }


  //Metodo para guardar una imagen y solicitar permisos
  let openImage = async () =>{
    let permisoMedia = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if(permisoMedia.granted == false){
      Alert.alert('Los permisos para acceder a camara son necesarios');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(pickerResult);

    if(pickerResult.canceled === true){
      return;  
    }
    //Guardar la imagen a traves de su URI
    setSelectImage({
      localUri: pickerResult.assets[0].uri
    })
    setBook({ ...book, bookImage: pickerResult.assets[0].uri });

    console.log("image: ",selectImage.localUri);
    
  };

  const StudentValuesDefault ={
    nameStudent: "",
    Age: "",
    university: "",
    idTeacher: route.params.userId,
    recidence: ""

  }
  const [student, setStudent] = useState(StudentValuesDefault);

  const imagenPredeterminada = require('../../assets/book_default.png'); // Ruta de la imagen predeterminada en la carpeta assets
  //Manejar cambios en los inputs
  const handleChangeText = (value, name) => {
    setStudent({ ...student, [name]: value });
    console.log("Student: ",student);
   
  };
  
  return (
    <View style={styles.container}>
      <Text>Student Info.</Text>


     {/*Nombre*/}
     <View
      style={styles.input}
     >
        <TextInput
            placeholder='Student Name'
            maxLength={20}
            onChangeText={(value) => handleChangeText(value, 'nameStudent')}
            
        />
     </View>
     {/*EDAD*/}
     <View
      style={styles.input}
     >
        <TextInput 
            placeholder='Age'
            maxLength={3}
            keyboardType='numeric'
            onChangeText={(value) => handleChangeText(value, 'Age')}
            
        />
     </View>
     {/*Universidad*/}
     <View
      style={styles.input}
     >
        <TextInput 
            placeholder='School'
            maxLength={30}
            onChangeText={(value) => handleChangeText(value, 'university')}
          
        />
     </View>
      {/*Phonee */}
      <View
      style={styles.input}
     >
        <TextInput 
            placeholder='Phone'
            maxLength={10}
            keyboardType='numeric'
            onChangeText={(value) => handleChangeText(value, 'phone')}
          
        />
     </View>
      {/*Recidencia*/}
     <View
      style={styles.input}
     >
        <TextInput 
            placeholder='Recidence'
            maxLength={30}
            onChangeText={(value) => handleChangeText(value, 'recidence')}
          
        />
     </View>
     <View>
        <Button 
            title='Save Student'
            onPress={onSend}
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
  containerImage:{
    alignItems: 'center',
    marginBottom: 30
  }
});

export default  CreateStudent;
;