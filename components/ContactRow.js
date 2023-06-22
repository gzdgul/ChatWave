import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TextBase, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {getUser, listenTyping, setChatStatus, setNotificationStatus} from "../firebaseConfig";
import useAuth from "../stores/useAuth";
import useSelectedUser from "../stores/useSelectedUser";
import {COLORS} from "../config/constants";
import useNotificationModal from "../stores/useNotificationModal";
import {ColorCreator} from "./ColorCreator";
import TypingIndicator from "./TypingIndicator";
import LoadingIndicator from "./LoadingIndicator";

const ContactRow = ({id, name, subtitle, style, chatData, navigation, status, page, lastTyper, messages}) => {
    const currentUser = useAuth((state) => state.currentUser);
    const setSelectedUser = useSelectedUser((state) => state.setSelectedUser);
    const selectedUser = useSelectedUser((state) => state.selectedUser);
    const [notification, setNotification] = useState(false)
    const setNotificationData = useNotificationModal((state) => state.setNotificationData);
    const setNotificationNumber = useNotificationModal((state) => state.setNotificationNumber);
    const [typers, setTypers] = useState([]);
    const [typing, setTyping] = useState(false);


    const [user,setUser] = useState({
        name: undefined,
        id: undefined,
        colorNum: 4,
        online: false
        }
    )
    const handlePress = () => {

        if (user?.id !== undefined && page !== 'settings') {

            navigation.navigate('Chat', {
                id: chatData.users.sort().join(''),
                mail: chatData.users.find((x) => x !== currentUser?.email),
                messages: chatData.messages,
            });

            navigation.setOptions({
                setNotification: setNotification,
            });

            setSelectedUser(
                {
                    name: user?.name,
                    email: user?.id
                }
            )
            if (status) {
                if (status?.lastTyper !== currentUser.email) {
                    setNotificationStatus(id, false)
                    setNotification(false)
                }
            }
        }
        else alert('my profile')
    }

    useEffect(() => {
            if (status?.unread){
                if ( status?.lastTyper !== currentUser?.email) {
                    setNotification(true)
                }
                else setNotification(false)
            }
            else setNotification(false)

    },[])

    useEffect(() => {
        listenTyping(id,setTypers)
    },[])

    useEffect(() => {
        if (typers !== [] && typers.includes(user?.id)) {
            setTyping(true)
        }
        else setTyping(false)
    },[typers])


    useEffect(() => {
        if (user?.id !== undefined) {
            if (selectedUser?.email !== user?.id && messages?.length > 0) {
                const LastMessageCreatedAt = messages[0].createdAt.toDate();
                const currentTime = new Date();
                const isApproximatelyEqual = Math.abs(currentTime - LastMessageCreatedAt) <= 5000; // Yaklaşık olarak eşitlik kontrolü (5000 milisaniye tolerans)
                // console.log(isApproximatelyEqual)
                if (messages[0]?.user._id !== currentUser?.email) {
                    if (isApproximatelyEqual) {
                        setNotification(true)
                        setNotificationData({
                            id: messages[0].user._id,
                            name: messages[0].user.name,
                            text: messages[0].text,
                            color: user?.colorNum,
                            createdAt: LastMessageCreatedAt,
                            handlePress: handlePress
                        });
                        currentUser && setNotificationNumber();
                    }
                }
            }
        }
    }, [messages?.length]);



    useEffect(() => {
        if (name) {
            getUser(name, setUser);
        }
    }, [name]);


    return (
        <>

            <TouchableOpacity style={[styles.row, style,  page === 'settings' && styles.settings]} onPress={handlePress}>
                {
                    user?.id !== undefined ?
                    <>
                        {
                            page === 'chats' &&
                            <View style={[styles.indicator,  notification && { backgroundColor: COLORS.orange}]}></View>
                        }
                        <View style={[styles.avatar, {backgroundColor: ColorCreator(user?.colorNum)}]}>
                            {
                                page === 'chats' &&
                                <View style={[styles.active, user?.online && {backgroundColor: COLORS.activeClr}]}></View>
                            }
                            <Text style={styles.avatarLabel}>{
                                user?.name?.toUpperCase().split(' ')
                                    .reduce((prev,current) => `${prev}${current[0]}`,'')}
                            </Text>
                        </View>
                        <View style={styles.userInfoText}>
                            <Text style={[styles.name, notification && { color: COLORS.orange,  fontWeight: "700"}]}>{user?.name}</Text>
                            {
                                typing
                                    ? <TypingIndicator/>
                                    : <Text style={[styles.subtitle, notification && { fontWeight: "600"}]}>{subtitle?.length >= 30 ? subtitle?.slice(0,30)+'...' : subtitle}</Text>
                            }
                            {/*<Text style={styles.subtitle}>{!chatData.messages ? 'No message yet' : [...chatData.messages][0].text}</Text>*/}
                        </View>
                        <Ionicons name={'chevron-forward-outline'} style={ notification ? { color: COLORS.orange} : { color: COLORS.ash} } size={20}/>
                    </>
                        : <LoadingIndicator/>

                }
            </TouchableOpacity>
           <View style={styles.lineCont}>
               <View style={styles.line}></View>
           </View>
        </>
    );
};
const styles = StyleSheet.create({
    settings: {
        shadowOpacity: 0,
        borderRadius: 0,
        marginVertical: 0,
        marginHorizontal: 0,
        paddingHorizontal: 15,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginVertical: 1,
        marginHorizontal: 0,
        borderRadius: 0,
        // borderBottomWidth: 1,
        // borderBottomColor: COLORS.ash
        // shadowOffset: { width: 0, height: 2 },
        // shadowColor: COLORS.black,
        // shadowOpacity: 0.10,
        // shadowRadius: 4,
        // elevation: 3,
    },
    indicator: {
        width: 4,
        height: 40,
        backgroundColor: COLORS.ash,
        borderRadius: 10,
        marginRight: 10,
    },
    userInfoText: {
        flex: 1,
        marginStart: 16,
    },
    name: {
        fontSize: 16,
        fontWeight: "600",
        color: '#3b3b3b'
    },
    subtitle: {
        marginTop: 2,
        color: COLORS.inputColor,
        fontSize: 14,

    },
    avatar: {
        width: 52,
        height: 52,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        position: "relative",
        shadowOffset: { width: 0, height: 2 },
        shadowColor: COLORS.black,
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: COLORS.white,
    },
    avatarLabel: {
        fontSize: 20,
        color: 'white',
    },
    active: {
        width: 12,
        height: 12,
        backgroundColor: COLORS.ash,
        borderRadius: 10,
        position: "absolute",
        top: -3,
        right: -3,
        borderColor: 'white',
        borderStyle: "solid",
        borderWidth: 1
    },
    lineCont: {
        width: '100%',
        display: "flex",
        // backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: "flex-end"
    },
    line: {
        width: '77%',
        height: 2,
        backgroundColor: COLORS.line,
    }
});
export default ContactRow;