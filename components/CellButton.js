import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {COLORS} from "../config/constants";
import useThemeProvider from "../stores/useThemeProvider";

const CellButton = ({icon, text, onPress, tintColor}) => {
    const theme = useThemeProvider((state) => state.theme);
    return (
    <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.pure}, { borderColor: theme.line}]}
        onPress={onPress}
    >
        <View style={[styles.icon, { backgroundColor: tintColor }]}>
            <Ionicons name={icon} size={18} color={'white'}/>
        </View>
        <Text style={[styles.text, {color: theme.text}]}>{text}</Text>
        <Ionicons style={{color: theme.indicator}} name={'chevron-forward-outline'} size={16}/>
    </TouchableOpacity>
);

}
const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: "center",
        // backgroundColor: COLORS.white,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderBottomWidth: 1,
        // borderBottomWidth: StyleSheet.hairlineWidth,
    },
    text: {
        flex: 1,
        fontSize: 16,
        // color: COLORS.black,
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