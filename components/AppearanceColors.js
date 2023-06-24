import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {ColorCreator} from "./ColorCreator";
import useAuth from "../stores/useAuth";
import useUserColor from "../stores/useUserColor";
import {COLORS} from "../config/constants";
import useThemeProvider from "../stores/useThemeProvider";
import {setUserColorDB} from "../firebaseConfig";

function AppearanceColors({colorNum}) {
    const theme = useThemeProvider((state) => state.theme);
    const userColor = useUserColor((state) => state.userColor);
    const setUserColor = useUserColor((state) => state.setUserColor);
    const handlePress = (colorNum) => {
        setUserColor(colorNum)
        console.log(colorNum)
    }

    return (
            <TouchableOpacity
                style={[
                    styles.colorContainer, { borderColor: theme.pure},
                    { backgroundColor: ColorCreator(colorNum) },
                    userColor === colorNum && { borderColor: theme.text}
                ]}
                onPress={() => handlePress(colorNum)}
            >
            </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    colorContainer: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,

    },
    selectedColor: {

    }
});
export default AppearanceColors;