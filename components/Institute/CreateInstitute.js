import React, { useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Image, Alert, Platform   } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

//Firebase
import firebaseConfig from '../firebaseConfig';
import { collection, addDoc, getFirestore} from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const db =getFirestore(firebaseConfig);

const CreateInstitute = ({route}) =>{
    
    const navigation = useNavigation();
    const showAlert = (message) => {
      if (Platform.OS === 'web') {
          alert(message);
      } else {
          Alert.alert(message);
      }
    };
    //Create Institute
    const onSend = async()=>{
      if (!institute.nameInstitute && !institute.address && !institute.type && !institute.phone
          && !institute.email 
      ) {
        showAlert("It´s necesary fill all the fields !");
        return;
      }
  
      switch (true) {
          case !institute.nameInstitute:
              showAlert("It´s require a name of institute !");
              return;
          case !institute.address:
              showAlert("It´s require an address !");
              return;
          case !institute.type:
              showAlert("It´s require a type of the institute !");
              return;
          case !institute.phone:
              showAlert("It´s require a phone number !");
              return;
          case !institute.email:
              showAlert("It´s require a email !");
              return;
        default:
          break;
      }
      //VALIDAR EMAIL
      const emailRegex = /^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/;
      const phonoRegex = /^[0-9]+$/;
      // Verificar si el correo electrónico coincide con el formato regex
      if (!emailRegex.test(institute.email)) {
            showAlert('Email not validate!');
            return;
      }
      if (!phonoRegex.test(institute.phone)) {
        showAlert('Phone number must be numeric!');
        return;
      }
      //VALIDAR LONGITUD
      if (institute.phone.length !== 10) {
        showAlert("Phone number must be 10 characters long.");
        return;
      }  
      try{
          await addDoc(collection(db, "Institutes"),{
              ...institute
          })
          showAlert("Contact Institute create");
          navigation.navigate('Contact Institute List',{ userId: route.params.userId });
      }catch(error){
          showAlert(error);
      }
    }

    const instituteValuesDefault ={
        nameInstitute: "",
        idTeacher: route.params.userId,
        address: "",
        phone: "",
        email: "",
        type: ""
        
      }
      const [institute, setInstitute] = useState(instituteValuesDefault);
      const handleChangeText = (value, name) => {
        setInstitute({ ...institute, [name]: value });
        console.log("Teacher data: ",institute);
       
      };

    return (
        <View style={styles.container}>
          <Text
            style={styles.TextTitle}
          >
            Create a Institute Contac:
          </Text>
         {/*Nombre*/}
         <View
          style={styles.input}
         >
            <TextInput
                placeholder='Institute'
                maxLength={65}
                onChangeText={(value) => handleChangeText(value, 'nameInstitute')}
                
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
          {/*Email*/}
         <View
          style={styles.input}
         >
            <TextInput
                placeholder='Email'
                maxLength={45}
                onChangeText={(value) => handleChangeText(value, 'email')}
                
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
                
            />
         </View>
         <View>
            <Button 
                title='Save Contact Institute'
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
    }
  });

export default CreateInstitute;