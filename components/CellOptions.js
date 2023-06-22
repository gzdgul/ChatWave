import React from 'react';
import {COLORS} from "../config/constants";
import CellButton from "./CellButton";
import {StyleSheet, View} from "react-native";
import {setOnline, signoutAccount} from "../firebaseConfig";
import useAuth from "../stores/useAuth";

const CellOptions = ({navigation}) => {
    const setCurrentUser = useAuth((state) => state.setCurrentUser);


    const handleLogout = () => {
        setCurrentUser(null)
        alert('Çıkış Yapılıyor');
         signoutAccount()
         setTimeout(() => {
             navigation.navigate('Login')
         },500)
    }
return (
    <View>
        <CellButton
            icon={'log-out-outline'}
            text={'Logout'}
            onPress={handleLogout}
            tintColor={COLORS.accent}
        />
        <View style={styles.bottomOpt}>
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
        </View>
    </View>
)
}
const styles = StyleSheet.create({
    bottomOpt: {
        marginTop: 16,
    },
});
export default CellOptions;