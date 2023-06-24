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
import useThemeProvider from "../stores/useThemeProvider";
import {getUser} from "../firebaseConfig";
import useCurrentUser from "../stores/useCurrentUser";

function Settings({ navigation }) {
    // const [currentUser, setCurrentUser] = useState(null);
    const authUser = useAuth((state) => state.authUser);
    const currentUser = useCurrentUser((state) => state.currentUser);
    const theme = useThemeProvider((state) => state.theme);

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <ContactRow
                name={authUser ? authUser.email: 'bos'}
                subtitle={authUser ? authUser.email : 'bos'}
                style={[styles.contactRow]}
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
        // backgroundColor: COLORS.white,
        marginTop: 16,
        // borderTopWidth: StyleSheet.hairlineWidth,
        // borderColor: COLORS.ash,
    },
});

export default Settings;