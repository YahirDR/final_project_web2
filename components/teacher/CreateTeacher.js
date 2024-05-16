import React, { useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Picker, Image, Alert, Platform  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

//Firebase
import firebaseConfig from '../firebaseConfig';
import { collection, addDoc, getFirestore} from 'firebase/firestore';

const db =getFirestore(firebaseConfig);

const CreateTeacher = ({route})=>{

  const navigation = useNavigation();
  const showAlert = (message) => {
    if (Platform.OS === 'web') {
        alert(message);
    } else {
        Alert.alert(message);
    }
  };
  //Crear teacher
  const onSend = async()=>{
    if (!teacher.nameStudent && !teacher.Age && !teacher.school && !teacher.recidence && !teacher.phone
        && !teacher.email && !teacher.courses
    ) {
      Alert.alert("It´s necesary fill all the fields");
      return;
    }

    switch (true) {
        case !teacher.nameTeacher:
            showAlert("It´s require a name.");
            return;
        case !teacher.Age:
            showAlert("It´s require an age.");
            return;
        case !teacher.recidence:
            showAlert("It´s require a recidence.");
            return;
        case !teacher.phone:
            showAlert("It´s require a phone number.");
            return;
        case !teacher.email:
            showAlert("It´s require a email.");
            return;
        case !teacher.courses:
            showAlert("It´s require a course(s).");
            return;
        case !teacher.school:
            showAlert("It´s require a school.");
            return;
      default:
        break;
    }
    //VALIDAR CORREO
    const emailRegex = /^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/;
    const phonoRegex = /^[0-9]+$/;
    // Verificar si el correo electrónico coincide con el formato regex
    if (!emailRegex.test(teacher.email)) {
          showAlert('Email not validate !');
          return;
    }
    if (!phonoRegex.test(teacher.phone)) {
      showAlert('Phone number must be numeric!');
      return;
    }
    if (!phonoRegex.test(teacher.Age)) {
      showAlert('Age must be numeric!');
      return;
    }
    // Validar la longitud del número de teléfono
    if (teacher.phone.length !== 10) {
        showAlert("Phone number must be 10 characters long.");
        return;
    } 
    try{
        await addDoc(collection(db, "Teachers"),{
            ...teacher
        })
          showAlert("Contact Teacher create");
        navigation.navigate('Contact teacher List',{ userId: route.params.userId });
    }catch(error){
        showAlert(error);
    }
  }

    const teacherValuesDefault ={
        nameTeacher: "",
        Age: "",
        school: "",
        idTeacher: route.params.userId,
        recidence: "",
        phone: "",
        email: "",
        courses: ""
      }
      const [teacher, setTeacher] = useState(teacherValuesDefault);
      const handleChangeText = (value, name) => {
        setTeacher({ ...teacher, [name]: value });
        console.log("Teacher data: ",teacher);
       
      };

    return (
        <KeyboardAwareScrollView 
        behavior={{padding : 'height'}}
        style={styles.container}
        >
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
                placeholder='Teacher Name'
                maxLength={35}
                onChangeText={(value) => handleChangeText(value, 'nameTeacher')}
                
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
                
            />
         </View>
         {/*Institucion*/}
         <View
          style={styles.input}
         >
            <TextInput 
                placeholder='School where impart courses '
                maxLength={65}
                onChangeText={(value) => handleChangeText(value, 'school')}
              
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
              
            />
         </View>
          {/*MATERIAS QUE IMPARTE*/}
         <View
          style={styles.input}
         >
            <TextInput 
                placeholder='Courses he taught'
                maxLength={50}
                onChangeText={(value) => handleChangeText(value, 'courses')}
              
            />
         </View>
         <View
          style={styles.input}
         >
            <TextInput 
                placeholder='Email'
                maxLength={50}
                onChangeText={(value) => handleChangeText(value, 'email')}
              
            />
         </View>
         <View>
            <Button 
                title='Save Contact Teacher'
                onPress={onSend}
            />
         </View>
    
        </KeyboardAwareScrollView>
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
    }
  });

export default CreateTeacher;