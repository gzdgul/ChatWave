import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TextBase, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {getUser, setChatStatus} from "../firebaseConfig";
import useAuth from "../stores/useAuth";
import useSelectedUser from "../stores/useSelectedUser";
import {COLORS} from "../config/constants";

const ContactRow = ({id, name, subtitle, style, chatData, navigation, status, page}) => {
    const currentUser = useAuth((state) => state.currentUser);
    const setSelectedUser = useSelectedUser((state) => state.setSelectedUser);
    const [notification, setNotification] = useState(false)
    const [user,setUser] = useState({
        name: 'null',
        id: 'null',
        colorNum: 4
        }
    )
    const handlePress = () => {
        navigation.navigate('Chat', {
            id: chatData.users.sort().join(''),
            mail: chatData.users.find((x) => x !== currentUser?.email),
            messages: chatData.messages,
        });
        setSelectedUser(user?.name)
        if (status?.lastTyper !== currentUser.email){
            setChatStatus(id,false,false)
            setNotification(false)
        }
    }
    useEffect(() => {
        getUser(name,setUser)
    },[name])

    useEffect(() => {
        if (status?.unread){
            if ( status?.lastTyper !== currentUser.email) {
                setNotification(true)
            }
        }
    },[name,status?.unread])
    const colorCreator = (colorNum) => {
        switch (colorNum) {
            case 1:return COLORS.pudra;
            case 2:return COLORS.sky;
            case 3:return COLORS.greeny;
            case 4:return COLORS.peach;
            case 5:return COLORS.gold;
            case 6:return COLORS.babyFire;
            case 7:return COLORS.pig;
            case 8:return COLORS.babyBlue;
        }
    }
    return (
        <>
            <TouchableOpacity style={[styles.row, style,  page === 'settings' && styles.settings]} onPress={handlePress}>
                {
                    page === 'chats' &&
                    <View style={[styles.indicator,  notification && { backgroundColor: COLORS.orange}]}></View>
                }
                <View style={[styles.avatar, {backgroundColor: colorCreator(user?.colorNum)}]}>
                    {
                        page === 'chats' &&
                        <View style={styles.active}></View>
                    }
                    <Text style={styles.avatarLabel}>{
                        user?.name.toUpperCase().split(' ')
                            .reduce((prev,current) => `${prev}${current[0]}`,'')}
                    </Text>
                </View>
                <View style={styles.userInfoText}>
                    <Text style={[styles.name, notification && { color: COLORS.orange,  fontWeight: "600"}]}>{user?.name}</Text>
                    <Text style={styles.subtitle}>{subtitle}</Text>
                </View>
                <Ionicons name={'chevron-forward-outline'} style={ notification && { color: COLORS.orange}} size={20}/>
            </TouchableOpacity>
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
        paddingVertical: 12,
        marginVertical: 5,
        marginHorizontal: 16,
        borderRadius: 20,
        shadowOffset: { width: 0, height: 2 },
        shadowColor: COLORS.black,
        shadowOpacity: 0.10,
        shadowRadius: 4,
        elevation: 3,
    },
    indicator: {
        width: 6,
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
        fontSize: 20,
        fontWeight: "400",
        color: '#3b3b3b'
    },
    subtitle: {
        marginTop: 2,
        color: COLORS.inputColor,
        fontSize: 14,
    },
    avatar: {
        width: 56,
        height: 56,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        position: "relative",
        shadowOffset: { width: 0, height: 2 },
        shadowColor: COLORS.black,
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 3,
    },
    avatarLabel: {
        fontSize: 20,
        color: 'white',
    },
    active: {
        width: 12,
        height: 12,
        backgroundColor: COLORS.activeClr,
        borderRadius: 10,
        position: "absolute",
        top: -3,
        right: -3,
        borderColor: 'white',
        borderStyle: "solid",
        borderWidth: 1
    }
});
export default ContactRow;