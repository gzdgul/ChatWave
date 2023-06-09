import React, {useEffect} from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet} from "react-native";
import {Ionicons} from '@expo/vector-icons'
import ContactRow from "../components/ContactRow";
// import SignUp from "./SignUp";
import LoginScreen from "./LoginScreen";

function Chats({navigation}) {
    const chats = [
        {
            users: ['gozde@test.com', 'aaa@test.com'],
            messages: [],
        },
        {
            users: ['gozde@test.com', 'bbb@test.com'],
            messages: [],
        },
        {
            users: ['gozde@test.com', 'ccc@test.com'],
            messages: [],
        },
    ]
    useEffect(() => {
        const isLoggedIn = false;
        if (!isLoggedIn) {
            navigation.navigate('Login')
        }
    },[])

    return (
        <SafeAreaView>
            {
                chats.map((x, index) => (
                    <React.Fragment key={index}>
                        <ContactRow name={x.users[1]}
                                    subtitle={'No messages yet'}
                                    onPress={() => {
                                        navigation.navigate('Chat', {id: `${index}AAJHKJD5486R4G`});
                                    }}/>
                    </React.Fragment>
                ))
            }
            {/*<ContactRow name={'Gözde Gül'} subtitle={'Selamm nasıllsınn aşk'} onPress={() => {*/}
            {/*   navigation.navigate('Chat');*/}
            {/*}}/>*/}
            {/*<ContactRow name={'Furkan Yıldırım'} subtitle={'Selamm nasıllsınn aşk'}/>*/}
            {/*<ContactRow name={'Selin Deniz'} subtitle={'Selamm nasıllsınn aşk'}/>*/}
            {/*<ContactRow name={'Gözde Gül'} subtitle={'Selamm nasıllsınn aşk'}/>*/}
            {/*<ContactRow name={'Gözde Gül'} subtitle={'Selamm nasıllsınn aşkkkk'}/>*/}
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({

});

export default Chats;