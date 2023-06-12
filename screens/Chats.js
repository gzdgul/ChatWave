import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Pressable, Modal, TextInput} from "react-native";
import {Ionicons} from '@expo/vector-icons'
import ContactRow from "../components/ContactRow";
// import SignUp from "./SignUp";
import LoginScreen from "./LoginScreen";
import {createChat, listenChats, listenChatss, snapshotToArray} from "../firebaseConfig";
import useAuth from "../stores/useAuth";
import {COLORS} from "../config/constants";

function Chats({navigation}) {
    const [chats, setChats] = useState(
        [{
        users: ['ggg@test.com','TEST@test.com'],

    }]
    )
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const currentUser = useAuth((state) => state.currentUser);
    const [modalVisible, setModalVisible] = useState(false);
    const [userMail, setUserMail] = useState('')
    const ChatKey = currentUser?.email+userMail
    console.warn('AAAAAAA',currentUser?.email+userMail)
    const createConnection = () => {
        createChat(userMail)
        setModalVisible(!modalVisible)
    }

    useEffect(() => {
        if (!currentUser) {
            navigation.navigate('Login')
        }

    },[])
    useEffect(() => {
        if (currentUser !== null) {
            listenChatss(setChats)
        }
    },[currentUser])

    return (
        <SafeAreaView>
            {
                chats?.map((x, index) => (
                    <React.Fragment key={x.users.join('')}>
                        <ContactRow name={x.users[1]}
                                    subtitle={'No messages yet'}
                                    onPress={() => {
                                        navigation.navigate('Chat', {id: x.users.join(''),mail: x.users[1]});
                                    }}/>
                    </React.Fragment>
                ))
            }
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    // Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {/*<Text style={styles.modalText}>Hello World!</Text>*/}
                        <TextInput style={styles.input}
                                   value={userMail}
                                   onChangeText={text => setUserMail(text)}
                        ></TextInput>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}
                                  onPress={createConnection}
                            >
                                Create
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}>
                <Text style={styles.textStyle}>CREATE CHAT</Text>
            </Pressable>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    input: {
        width: 200,
        backgroundColor: COLORS.inputColor,
        color: COLORS.white
    }
});

export default Chats;