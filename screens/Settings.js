import React from 'react';
import {View, SafeAreaView, StyleSheet, Text, TouchableOpacity} from "react-native";
import ContactRow from "../components/ContactRow";
import { COLORS } from "../config/constants";
import {Ionicons} from "@expo/vector-icons";
import CellButton from "../components/CellButton";
import CellOptions from "../components/CellOptions";

function Settings({navigation}) {
    return (
        <SafeAreaView style={styles.container}>
            <ContactRow
                name={'Gözde Gül'}
                subtitle={'gozde@test.com'}
                style={styles.contactRow}
                onPress={() => { alert('bu benim!!') }}
            />
            <CellOptions navigation={navigation}/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contactRow: {
        backgroundColor: COLORS.white,
        marginTop: 16,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: COLORS.ash,
    },
});

export default Settings;