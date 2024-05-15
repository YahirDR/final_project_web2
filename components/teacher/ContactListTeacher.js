import React, { useState, useEffect } from "react";
import { Text, ScrollView, Button, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';
//FIREBASE
import firebaseConfig from '../../firebaseConnection/firebaseConfig';
import { getFirestore, collection, onSnapshot } from "firebase/firestore";

const db = getFirestore(firebaseConfig);

const ContactListTeacher = ({ route }) => {
    const navigation = useNavigation();
    const [list, setListCST] = useState([]);
    const idTeacherUser = route.params.userId;
    const imageStudentIcon = require('../../assets/icon_teacher.png'); // Ruta de la imagen predeterminada en la carpeta assets

    useEffect(() => {
        const suscribe = onSnapshot(collection(db, 'Teachers'), (snapshot) => {
            const docs = [];
            snapshot.forEach((doc) => {
                const { Age, idTeacher, nameTeacher, phone, recidence, school, email, courses } = doc.data();
                if (idTeacher === idTeacherUser) {
                    docs.push({
                        id: doc.id,
                        Age,
                        idTeacher,
                        nameTeacher,
                        phone,
                        recidence,
                        school,
                        email,
                        courses
                    });
                }
            });
            setListCST(docs);
        });

        // Limpia la suscripción cuando el componente se desmonte
        return () => suscribe();
    }, []);

    return (
        <ScrollView
            style={styles.containerMain}
            stickyHeaderIndices={[0]} // Esto asegura que el botón siempre esté visible en la parte superior
        >
            <View>
                <Button title="Create a new teacher Contact"
                    color='green'
                    onPress={() => navigation.navigate('Create Teacher', { userId: route.params.userId })}
                />
            </View>
            <View>
                {list.length === 0 ? (
                    <Text style={styles.emptyMessage}>No teacher contacts available</Text>
                ) : (
                    list.map((item) => (
                        <TouchableOpacity
                            style={styles.container}
                            key={item.id}
                            onPress={() => navigation.navigate("Contact Teacher data", { studentId: item.id })}
                        >
                            <View style={styles.imageContainer}>
                                <Image
                                    style={styles.image}
                                    source={imageStudentIcon}
                                />
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.textNormal}>Teacher name: {item.nameTeacher}</Text>
                                <Text style={styles.textNormal}>Age: {item.Age}</Text>
                                <Text style={styles.textNormal}>Phone: {item.phone}</Text>
                                <Text style={styles.textNormal}>School: {item.school}</Text>
                                <Text style={styles.textNormal}>Residence: {item.recidence}</Text>
                                <Text style={styles.textNormal}>Email: {item.email}</Text>
                                <Text style={styles.textNormal}>Courses: {item.courses}</Text>
                            </View>
                        </TouchableOpacity>
                    ))
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    containerMain: {
        backgroundColor: 'black'
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#8ae0db',
        borderRadius: 10,
        marginBottom: 15,
        marginTop: 10,
        marginLeft: 5.5,
        marginRight: 5.5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        // Elimina la altura fija
        // height: 200
    },
    image: {
        height: 110,
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
        marginLeft: 10
    },
    textNormal: {
        maxWidth: '90%',
        fontSize: 18,
        color: 'black',
        marginBottom: 2,
    },
    emptyMessage: {
        textAlign: 'center',
        fontSize: 20,
        color: 'white',
        marginTop: 20,
    },
});

export default ContactListTeacher;
