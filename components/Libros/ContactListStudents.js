import React, {useState, useEffect} from "react";
import { Text, ScrollView, ScrollViewBase, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';
//FIREBASE
import firebaseConfig from '../../firebaseConnection/firebaseConfig';
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, setDoc, onSnapshot, Firestore  } from "firebase/firestore";

const db =getFirestore(firebaseConfig);


const ContactListStudents = ({route})=>{
    const navigation = useNavigation();
    const [list, setListCST] = useState([]);
    const idTeacherUser = route.params.userId;
    const [al, setAl] = useState([]);

    const getList = () => {
        try {
            const suscribe = onSnapshot(collection(db, 'Students'), (snapshot) => {
                const docs = [];
                snapshot.forEach((doc) => {
                    const { Age, idTeacher, nameStudent, phone, recidence, university } = doc.data();
                    if (idTeacher === idTeacherUser) {
                        docs.push({
                            id: doc.id,
                            Age,
                            idTeacher,
                            nameStudent,
                            phone,
                            recidence,
                            university
                        });
                    }
                });
                setListCST(docs);
            });
            
            // Devolver la función de cancelación de la suscripción para limpiarla cuando sea necesario
            return suscribe;
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(() => {
        const suscribe = getList();
    
        // Limpia la suscripción cuando el componente se desmonte
        return () => suscribe();
    }, []);
    const imageStudentIcon = require('../../assets/icon_contact_student.png'); // Ruta de la imagen predeterminada en la carpeta assets

    return(
        <ScrollView
            style={styles.containerMain}
        >
            <View>
                {
                    list.map((item) => ( 
                        <TouchableOpacity
                            style={styles.container}
                            key={item.id}
                            onPress={() => navigation.navigate("Contact Student data", {studentId: item.id})}
                        >
                            <View style={styles.imageContainer}>
                                <Image 
                                    style={styles.image}
                                    source={imageStudentIcon}
                                />
                            </View>
                            <View style={styles.textContainer}>
                                <Text>
                                    Student name:
                                    {item.nameStudent}
                                </Text>
                                <Text>
                                    Age:
                                    {item.Age}
                                </Text>
                                <Text>
                                    Phone:
                                    {item.phone}
                                </Text>
                                <Text>
                                    University:
                                    {item.university}
                                </Text>
                                <Text>
                                    Residence:
                                    {item.recidence}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))
                }
            </View>
        </ScrollView>
    );
    
}


const styles = StyleSheet.create({
    containerMain:{
        backgroundColor: 'black'
    }, 
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 15,
        marginTop: 10,
        marginLeft:5.5,
        marginRight: 5.5,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        height:180
    },
    image: {
        height:110,
        width: 110,
        resizeMode: 'contain',
        borderWidth: 2, // Agregar un borde para definir la imagen en el fondo
        borderRadius: 8, // Redondear las esquinas para suavizar los bordes
        borderColor: 'transparent' // Inicialmente sin color de borde
    },
    textContainer: {
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'space-around',
        marginLeft: 15
    }
});

export default ContactListStudents;