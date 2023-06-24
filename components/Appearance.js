import React from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import AppearanceColors from "./AppearanceColors";
import useThemeProvider from "../stores/useThemeProvider";
import {useFocusEffect} from "@react-navigation/core";
import useUserColor from "../stores/useUserColor";
import {setUserColorDB} from "../firebaseConfig";
import useCurrentUser from "../stores/useCurrentUser";
import {COLORS, darkTheme, lightTheme, natureTheme, oceanTheme, sunsetTheme} from "../config/constants";
import {ColorCreator} from "./ColorCreator";
import AppearanceTheme from "./AppearanceTheme";
import {Ionicons} from "@expo/vector-icons";

function Appearance({navigation}) {
    const userColor = useUserColor((state) => state.userColor);
    const currentUser = useCurrentUser((state) => state.currentUser);
    const setTheme = useThemeProvider((state) => state.setTheme);
    const theme = useThemeProvider((state) => state.theme);

    const handleSave = async () => {
        await setUserColorDB(userColor)
        alert('Renk seçiminiz başarıyla kaydedildi!')
    }
    // const themeSelector = () => {
    //     if (theme === darkTheme) {
    //         setTheme(lightTheme)
    //     }
    //     else setTheme(darkTheme)
    //
    // }
    return (
        <SafeAreaView style={[styles.container, {backgroundColor: theme.pure}]}>
            <View style={styles.colorContainer}>
                <View style={[styles.labelCotainer]}>
                    <Text style={[styles.label, {color: theme.text}]}>Display Color</Text>
                </View>

                <View style={styles.profileContainer}>
                    <View style={[styles.avatar, {borderColor: theme.borderColor}, {backgroundColor: ColorCreator(userColor)}]}>
                        <Text style={styles.avatarLabel}>{
                            currentUser?.name?.toUpperCase().split(' ')
                                .reduce((prev,current) => `${prev}${current[0]}`,'')}
                        </Text>
                    </View>
                </View>
                <View style={[styles.colors]}>
                    {
                        [1,2,3,4,5,6,7,8].map((x) => {
                            return <AppearanceColors key={x} colorNum={x}/>
                        })
                    }
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.saveButton, { backgroundColor: theme.buttonColor}]}
                        onPress={handleSave}
                    >
                        <Text style={[styles.saveButtonText, {color: theme.text}]} >Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[styles.labelCotainer]}>
                <Text style={[styles.label, {color: theme.text}]}>Theme</Text>
            </View>
            <AppearanceTheme/>
            <View style={styles.themeContainer}>
                <TouchableOpacity onPress={() =>  setTheme(lightTheme)}>
                  <View style={[styles.themes, {backgroundColor: COLORS.light}]}>
                      <Ionicons name={'sunny-outline'} size={28} color={'black'}/>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>  setTheme(darkTheme)}>
                    <View style={[styles.themes, {backgroundColor: COLORS.black}]}>
                        <Ionicons name={'moon-outline'} size={28} color={'white'}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>  setTheme(oceanTheme)}>
                    <View style={[styles.themes, {backgroundColor: COLORS.ocean}]}>
                        <Ionicons name={'water-outline'} size={28} color={'white'}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>  setTheme(natureTheme)}>
                    <View style={[styles.themes, {backgroundColor: COLORS.nature}]}>
                        <Ionicons name={'leaf-outline'} size={28} color={'white'}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>  setTheme(sunsetTheme)}>
                    <View style={[styles.themes, {backgroundColor: COLORS.sunset}]}>
                        <Ionicons name={'partly-sunny-outline'} size={28} color={'white'}/>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    labelCotainer: {
      // alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    label: {
      fontSize: 18,
        fontWeight: "500"
    },
    colors: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginHorizontal: 20,
        borderRadius: 20
    },
    profileContainer: {
        flexDirection: "row",
      justifyContent: "center",
        marginVertical: 20,
    },
    avatar: {
        width: 100,
        height: 100,
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
        // borderColor: COLORS.white,
    },
    avatarLabel: {
        fontSize: 40,
        color: 'white',
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "flex-end",
        marginVertical: 10,
        marginHorizontal: 20,
    },
    saveButton: {
        width: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        paddingVertical: 7,

    },
    saveButtonText: {
        fontSize: 14,
        fontWeight: "600",
    },
    themeContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 10,
        marginHorizontal: 20,
    },
    themes: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 42,
        height: 42,
        borderRadius: 12,
    }
});
export default Appearance;