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
    ScrollView, Button
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
import NotificationModal from "../components/notificationModal";
import MessagePopup from "../components/notificationModal";
import useNotificationModal from "../stores/useNotificationModal";
import useThemeProvider from "../stores/useThemeProvider";
import useCurrentUser from "../stores/useCurrentUser";
import useUserColor from "../stores/useUserColor";

function Chats({navigation}) {
    const [chats, setChats] = useState(
        [{
        users: ['ggg@test.com','TEST@test.com'],

    }]
    )
    const theme = useThemeProvider((state) => state.theme);
    const [selectedChat, setSelectedChat] = useState(null); // Seçilen sohbetin status değerini tutan state
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const authUser = useAuth((state) => state.authUser);
    const currentUser = useCurrentUser((state) => state.currentUser);
    const setUserColor = useUserColor((state) => state.setUserColor);
    const modalStatus = useModal((state) => state.modalStatus);
    const setModalStatus = useModal((state) => state.setModalStatus);
    const setNotificationModalStatus = useNotificationModal((state) => state.setNotificationModalStatus);
    const setNotificationNumber = useNotificationModal((state) => state.setNotificationNumber);
    const notificationModalStatus = useNotificationModal((state) => state.notificationModalStatus);
    const setChatData = useChatData((state) => state.setChatData);
    const [modalVisible, setModalVisible] = useState(false);
    const [userMail, setUserMail] = useState('')
    const [lastMessage,setlastMessage] = useState('No message')

    // const ChatKey = authUser?.email+userMail
    // console.warn('hhhhh', chats)
    useEffect(() => {
        console.log('currentUser111111111111111111111111',currentUser)
        if (currentUser) {
            setUserColor(currentUser.colorNum)
        }
    },[currentUser])
    const createConnection = () => {
        const messageRef = [authUser.email,userMail.toLowerCase()].sort().join('')
        // console.warn(userMail.toLowerCase())
        createChat(userMail.toLowerCase(),messageRef)
        //     .then(() => {
        //     navigation.navigate('Chat', {
        //         id: chatData.users.sort().join(''),
        //         mail: chatData.users.find((x) => x !== authUser?.email),
        //         messages: chatData.messages,
        //     });
        // })
        setModalStatus(false)
    }

    useEffect(() => {
        if (!authUser) {
            navigation.navigate('Login')
        }
    },[])
    useEffect(() => {
        if (authUser !== null) {
            listenChatss(setChats)
        }
    },[authUser])

    useEffect(() => {
        chats.forEach((x) => {
            setChatData({
                chatId: x.users.sort().join(''),
                messages:(x.messages ?  x.messages : [])
            })
        })

    },[chats])

    return (
        <ScrollView style={[styles.area, {backgroundColor: theme.pure}]}>
            <View>
                <Text style={[styles.bannerText , {color: theme.text}]}>Mesajlar</Text>
            </View>
            {/*<Button title={'Show Modal'} onPress={() => setNotificationNumber()}/>*/}
            {
                chats?.map((x, index) => (
                    <React.Fragment key={x.users.sort().join('')}>
                        <ContactRow
                                    id={x.users.sort().join('')}
                                    name={x.users.find((x) => x !== authUser?.email)}
                                    chatData={x}
                                    status={x?.status}
                                    // lastTyper={x?.status?.lastTyper}
                                    messages={x.messages ? [...x.messages] : null}
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
                               style={styles.button}
                               onPress={() => setModalStatus(!modalStatus)}>
                               <Text style={styles.textStyle}
                                     onPress={createConnection}
                               >
                                   Create
                               </Text>
                           </TouchableOpacity>
                           <TouchableOpacity
                               style={styles.crossButton}
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
            {/*<NotificationModal/>*/}

            <View style={styles.footerView}>
                <Text style={[styles.footerText, { color: theme.textLight}]}>Lorem ipsum dolor sit amet, consectetur</Text>
            </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    area: {
        flex: 1,
        // backgroundColor: COLORS.backgroundClr,
        // paddingVertical: 25,
    },
    bannerText: {
        fontSize: 33,
        // color: COLORS.black,
        paddingVertical: 10,
        paddingHorizontal: 20,
        fontWeight: '700',
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
        opacity: 0.50
    }
});

export default Chats;