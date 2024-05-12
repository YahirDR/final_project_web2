import React, {useState, useEffect} from "react";
import { Text, ScrollView, ScrollViewBase, View, TouchableOpacity, StyleSheet } from "react-native";
//FIREBASE
import firebaseConfig from '../../firebaseConnection/firebaseConfig';
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, setDoc } from "firebase/firestore";

const db =getFirestore(firebaseConfig);


const ContactListStudents = ({route})=>{

    const [list, setListCST] = useState([]);
    const idTeacherUser = route.params.userId;
    useEffect(() =>{
        const getList = async() =>{
            try{
                const querySnapchot = await getDocs(collection(db, 'Students'));
                const docs = [];
                querySnapchot.forEach((doc) =>{
                    const {Age, idTeacher, nameStudent, phone, recidence, university} = doc.data();
                    if(idTeacher === idTeacherUser){ // Solo agrega el estudiante a la lista si su idTeacher es igual a idTeacherUser
                        docs.push({
                            id: doc.id,
                            Age,
                            idTeacher,
                            nameStudent,
                            phone,
                            recidence,
                            university,
                        });
                    }
                });
                setListCST(docs);
            }catch(error){
                console.log(error)
            }
        }
        getList()
    },[]);
    

    return(
        <ScrollView>
            <View>
                {
                    list.map((item) => ( // Cambié el nombre de la variable en el mapeo para evitar confusiones
                        <TouchableOpacity
                            key={item.id}
                        >
                            <Text>
                                Edad:
                                {item.Age}
                            </Text>
                            <Text>
                                {item.idTeacher}
                            </Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({

});

export default ContactListStudents;