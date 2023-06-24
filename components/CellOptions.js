import React from 'react';
import {COLORS, darkTheme, lightTheme} from "../config/constants";
import CellButton from "./CellButton";
import {StyleSheet, View} from "react-native";
import {setOnline, signoutAccount} from "../firebaseConfig";
import useAuth from "../stores/useAuth";
import useCurrentUser from "../stores/useCurrentUser";

const CellOptions = ({navigation}) => {
    const setAuthUser = useAuth((state) => state.setAuthUser);
    const setCurrentUser = useCurrentUser((state) => state.setCurrentUser);

    const handleLogout = async () => {
         await signoutAccount()
            setAuthUser(null)
            setCurrentUser(null)
         setTimeout(() => {
             navigation.navigate('Login')
         },500)
    }
    const handleAppearance = async () => {
             navigation.navigate('Appearance')
    }
return (
    <View style={styles.options}>
        <CellButton
            icon={'information-circle-outline'}
            text={'Help'}
            onPress={() => {alert('Help')}}
            tintColor={COLORS.green}
        />
        <CellButton
            icon={'heart-outline'}
            text={'Tell a Friend'}
            onPress={() => {alert('Thanks v3')}}
            tintColor={COLORS.pink}
        />
        <CellButton
            icon={'contrast-outline'}
            text={'Appearance'}
            onPress={handleAppearance}
            tintColor={COLORS.black}
        />

        <View style={styles.bottomOpt}>
            <CellButton
                icon={'log-out-outline'}
                text={'Logout'}
                onPress={handleLogout}
                tintColor={COLORS.accent}
            />
        </View>
    </View>
)
}
const styles = StyleSheet.create({
    options: {
      marginTop: 16
    },
    bottomOpt: {
        marginTop: 16,
    },
});
export default CellOptions;