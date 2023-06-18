import React from 'react';
import {View, SafeAreaView, StyleSheet, Text, TouchableOpacity} from "react-native";
import ContactRow from "../components/ContactRow";
import { COLORS } from "../config/constants";
import {Ionicons} from "@expo/vector-icons";
import CellButton from "../components/CellButton";
import CellOptions from "../components/CellOptions";
import { getAuth } from "firebase/auth";

import { useEffect, useState } from 'react';
import useAuth from "../stores/useAuth";

function Settings({ navigation }) {
    // const [currentUser, setCurrentUser] = useState(null);
    const currentUser = useAuth((state) => state.currentUser);

    return (
        <SafeAreaView style={styles.container}>
            <ContactRow
                name={currentUser ? currentUser.email: 'bos'}
                subtitle={currentUser ? currentUser.email : 'bos'}
                style={styles.contactRow}
                page={'settings'}
            />
            <CellOptions navigation={navigation} />
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