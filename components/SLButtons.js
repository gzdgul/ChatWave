import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {COLORS} from "../config/constants";

const SlButtons = ({text, bgColor, txtColor}) => (
    <TouchableOpacity style={[styles.SLButton, {backgroundColor: bgColor}]}>
        <Text style={[styles.text,{color: txtColor}]}>{text}</Text>
    </TouchableOpacity>
);
const styles = StyleSheet.create({
    SLButton: {
        backgroundColor: COLORS.white,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 6,
    },
    text: {
        fontSize: 15,
    }
});

export default SlButtons;