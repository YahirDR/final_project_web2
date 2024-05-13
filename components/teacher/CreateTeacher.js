import React, { useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Picker, Image, Alert  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
//Firebase
import firebaseConfig from '../firebaseConfig';
import { collection, addDoc, getFirestore} from 'firebase/firestore';

const db =getFirestore(firebaseConfig);

const CreateTeacher = ({route})=>{

    const navigation = useNavigation();

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
            Alert.alert("It´s require a name.");
            return;
        case !teacher.Age:
            Alert.alert("It´s require an age.");
            return;
        case !teacher.recidence:
            Alert.alert("It´s require a recidence.");
            return;
        case !teacher.phone:
            Alert.alert("It´s require a phone number.");
            return;
        case !teacher.email:
            Alert.alert("It´s require a email.");
            return;
        case !teacher.courses:
            Alert.alert("It´s require a course(s).");
            return;
      default:
        break;
    }
    try{
        await addDoc(collection(db, "Teachers"),{
            ...teacher
        })
        Alert.alert("Contact Teacher create");
        navigation.navigate('Contact teacher List',{ userId: route.params.userId });
    }catch(error){
        console.error(error);
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
        <View style={styles.container}>
          <Text>Create a Teacher Contac.</Text>
    
    
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
                maxLength={30}
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
          {/*Recidencia*/}
         <View
          style={styles.input}
         >
            <TextInput 
                placeholder='Courses he taught'
                maxLength={30}
                onChangeText={(value) => handleChangeText(value, 'courses')}
              
            />
         </View>
         <View
          style={styles.input}
         >
            <TextInput 
                placeholder='Email'
                maxLength={30}
                onChangeText={(value) => handleChangeText(value, 'email')}
              
            />
         </View>
         <View>
            <Button 
                title='Save Contact Teacher'
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