import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {getUser} from "../firebaseConfig";

const ContactRow = ({name, subtitle, style, onPress}) => {
    const [user,setUser] = useState({
        name: 'null',
        id: 'null',
        }
    )

    useEffect(() => {
        getUser(name,setUser)
    },[name])

    return (
        <>
            <TouchableOpacity style={[styles.row, style]} onPress={onPress}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarLabel}>{
                        user?.name.split(' ').reduce((prev,current) => `${prev}${current[0]}`,'')
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
        backgroundColor: '#F44336',
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