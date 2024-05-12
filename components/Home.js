import React, {useState} from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from '@react-navigation/native';

const Home = ({route})=>{
    const navigation = useNavigation();
    const [idUser, setUserId] = useState(route.params.userId);
    console.log(route.params);
    
    return(
        <View
            style={{alignItems:'center'}}
        >
            <Text>HOME </Text>
            <Text>{route.params.userId}</Text>
            <Button title="Up a new book"
                onPress={ () => navigation.navigate('Create Student',{ userId: route.params.userId })}
            />
            <Button title="Up a new book"
                onPress={ () => navigation.navigate('Contact Students List',{ userId: route.params.userId })}
            />
        </View>
    );
}

export default Home;