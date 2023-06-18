import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
    Pressable,
    Modal,
    TextInput,
    ScrollView
} from "react-native";
import {Ionicons} from '@expo/vector-icons'
import ContactRow from "../components/ContactRow";
// import SignUp from "./SignUp";
import LoginScreen from "./LoginScreen";
import {createChat, listenChats, listenChatss, snapshotToArray} from "../firebaseConfig";
import useAuth from "../stores/useAuth";
import {COLORS} from "../config/constants";
import chat from "../components/Chat";
import useChatData from "../stores/useMessages";
import useSelectedUser from "../stores/useSelectedUser";
import useModal from "../stores/useModal";

function Chats({navigation}) {
    const [chats, setChats] = useState(
        [{
        users: ['ggg@test.com','TEST@test.com'],

    }]
    )
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const currentUser = useAuth((state) => state.currentUser);
    const modalStatus = useModal((state) => state.modalStatus);
    const setModalStatus = useModal((state) => state.setModalStatus);
    const setChatData = useChatData((state) => state.setChatData);
    const [modalVisible, setModalVisible] = useState(false);
    const [userMail, setUserMail] = useState('')
    const [lastMessage,setlastMessage] = useState('No message')

    // const ChatKey = currentUser?.email+userMail
    // console.warn('hhhhh', chats)

    const createConnection = () => {
        const messageRef = [currentUser.email,userMail.toLowerCase()].sort().join('')
        // console.warn(userMail.toLowerCase())
        createChat(userMail.toLowerCase(),messageRef)
        //     .then(() => {
        //     navigation.navigate('Chat', {
        //         id: chatData.users.sort().join(''),
        //         mail: chatData.users.find((x) => x !== currentUser?.email),
        //         messages: chatData.messages,
        //     });
        // })
        setModalStatus(false)
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

    useEffect(() => {
        chats.forEach((x) => {
            setChatData({
                chatId: x.users.sort().join(''),
                messages:(x.messages ?  x.messages : [])
            })
        })

    },[chats])

    return (
        <ScrollView style={styles.area}>
            <View style={styles.banner}>
                <Text style={styles.bannerText}>Mesajlar</Text>
            </View>
            {
                chats?.map((x, index) => (
                    <React.Fragment key={x.users.sort().join('')}>
                        <ContactRow
                                    id={x.users.sort().join('')}
                                    name={x.users.find((x) => x !== currentUser?.email)}
                                    chatData={x}
                                    status={x?.status}
                                    subtitle={!x.messages ? 'No message yet' : [...x.messages][0].text}
                                    navigation={navigation}
                                    page={'chats'}
                                    />
                    </React.Fragment>
                ))
            }
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalStatus}
                onRequestClose={() => {
                    setModalVisible(!modalStatus);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Enter User's Email</Text>
                        <TextInput style={styles.input}
                                   value={userMail}
                                   onChangeText={text => setUserMail(text)}
                        ></TextInput>
                       <View style={styles.modalOpt}>
                           <TouchableOpacity
                               style={[styles.button, styles.buttonClose]}
                               onPress={() => setModalStatus(!modalStatus)}>
                               <Text style={styles.textStyle}
                                     onPress={createConnection}
                               >
                                   Create
                               </Text>
                           </TouchableOpacity>
                           <TouchableOpacity
                               style={[styles.crossButton, styles.buttonClose]}
                               onPress={() => setModalStatus(!modalStatus)}>
                               <Text style={styles.cross}
                                     onPress={() => { setModalStatus(false)}}
                               >
                                   X
                               </Text>
                           </TouchableOpacity>
                       </View>
                    </View>
                </View>
            </Modal>
            <View style={styles.footerView}>
                <Text style={styles.footerText}>Lorem ipsum dolor sit amet, consectetur</Text>
            </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    area: {
        flex: 1,
        backgroundColor: COLORS.backgroundClr,
        // paddingVertical: 25,
    },
    bannerText: {
        fontSize: 33,
        color: COLORS.black,
        paddingVertical: 10,
        paddingHorizontal: 20,
        fontWeight: '700'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 5,
        gap: 10,
    },
    button: {
        borderRadius: 10,
        padding: 6,
        width: '80%',
        backgroundColor: COLORS.orange
    },
    crossButton: {
        width: 30,
        borderRadius: 20,
        padding: 6,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'red'
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cross: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '500'
    },
    modalOpt: {
      flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        marginTop: 10,
    },
    input: {
        width: 250,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.orange,
        color: COLORS.black,
        paddingVertical: 5,
    },
    footerView: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        paddingVertical: 20
    },
    footerText: {
        fontSize: 12,
        color: COLORS.ash
    }
});

export default Chats;