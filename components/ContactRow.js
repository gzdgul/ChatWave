import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {getUser} from "../firebaseConfig";
import useAuth from "../stores/useAuth";
import useSelectedUser from "../stores/useSelectedUser";
import {COLORS} from "../config/constants";

const ContactRow = ({name, subtitle, style, chatData, navigation, setlastMessage}) => {
    const currentUser = useAuth((state) => state.currentUser);
    const setSelectedUser = useSelectedUser((state) => state.setSelectedUser);
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
    }
    useEffect(() => {
        getUser(name,setUser)
    },[name])
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
            <TouchableOpacity style={[styles.row, style]} onPress={handlePress}>
                <View style={[styles.avatar, {backgroundColor: colorCreator(user?.colorNum)}]}>
                    <Text style={styles.avatarLabel}>{
                        user?.name.toUpperCase().split(' ').reduce((prev,current) => `${prev}${current[0]}`,'')
                        }
                    </Text>
                </View>
                <View style={styles.userInfoText}>
                    <Text style={styles.name}>{user?.name}</Text>
                    <Text style={styles.subtitle}>{subtitle}</Text>
                </View>
                <Ionicons name={'chevron-forward-outline'} size={20}/>
            </TouchableOpacity>
            <View style={styles.seperator}/>
        </>
    );
};
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: 'red',
        paddingHorizontal: 16,
        paddingVertical: 20,
    },
    userInfoText: {
        flex: 1,
        marginStart: 16,
    },
    name: {
        fontSize: 16,
    },
    subtitle: {
        marginTop: 2,
        color: '#565656',
    },
    seperator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#E2E2E2',
        marginStart: 88,
    },
    avatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarLabel: {
        fontSize: 20,
        color: 'white',
    },
});
export default ContactRow;