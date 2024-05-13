import React, {useState} from "react";
import { View, Text, Button, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';

//firebase
import "./firebaseConfig";
import { getAuth, signOut} from "firebase/auth";

const Home = ({route})=>{
    const navigation = useNavigation();
    const [idUser, setUserId] = useState(route.params.userId);
    console.log(route.params);
    const auth = getAuth();

    const logout = () => {
        signOut(auth)
          .then(() => {
            Alert.alert("Session close successfully");
            navigation.goBack();
          })
          .catch((error) => {
            console.log("Error al cerrar sesión: ", error);
          });
      };

    return(
        <View
            style={{alignItems:'center'}}
        >
            <Text>HOME </Text>
            <Text>{route.params.userId}</Text>
            <Button title="Contacs Students"
                onPress={ () => navigation.navigate('Contact Students List',{ userId: route.params.userId })}
            />
            <Button title="Contacs Teachers"
                onPress={ () => navigation.navigate('Contact teacher List',{ userId: route.params.userId })}
            />
            <Button title="Exit"
                color='red'
                onPress={logout}
            />
        </View>
    );
}

export default Home;