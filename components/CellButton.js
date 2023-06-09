import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {COLORS} from "../config/constants";

const CellButton = ({icon, text, onPress, tintColor}) => (
    <TouchableOpacity
        style={styles.button}
        onPress={onPress}
    >
        <View style={[styles.icon, { backgroundColor: tintColor }]}>
            <Ionicons name={icon} size={24} color={'white'}/>
        </View>
        <Text style={styles.text}>{text}</Text>
        <Ionicons name={'chevron-forward-outline'} size={20}/>
    </TouchableOpacity>
);
const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: "center",
        backgroundColor: COLORS.white,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: COLORS.ash,

    },
    text: {
        flex: 1,
        fontSize: 16,
        color: COLORS.black,
        marginStart: 16,
    },
    icon: {
        width: 32,
        height: 32,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 6,
    }
});

export default CellButton;