import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import {
    Keyboard,
    KeyboardAvoidingView, SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native'
import {createAccount, getUser, loginAccount, setOnline} from "../firebaseConfig";
import {COLORS} from "../config/constants";
import Checkbox from "expo-checkbox";
import useAuth from "../stores/useAuth";
import useUserColor from "../stores/useUserColor";
import useCurrentUser from "../stores/useCurrentUser";


const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSelected, setIsSelected] = useState(false)
    const [active, setActive] = useState(false)
    const setAuthUser = useAuth((state) => state.setAuthUser);
    const setUserColor = useUserColor((state) => state.setUserColor);
    const setCurrentUser = useCurrentUser((state) => state.setCurrentUser);
    const currentUser = useCurrentUser((state) => state.currentUser);
    // const navigation = useNavigation()

    const handleRegisterScreen = () => {
        setTimeout(() => {
            navigation.navigate('Register');
        }, 100);
    }

    const handleLogin = async () => {
        if (email.length > 0 && password.length > 0) {
            const user = await loginAccount(email, password)
            setAuthUser(user)
            await getUser(user.email, setCurrentUser)
            if (user !== undefined) {
                setTimeout(() => {
                    navigation.navigate('Home');
                }, 1000);
            }
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.label}>Login</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="Email"
                            placeholderTextColor={COLORS.nactiveButtonClr}
                            value={email}
                            onChangeText={text => setEmail(text)}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Password"
                            placeholderTextColor={COLORS.nactiveButtonClr}
                            value={password}
                            onChangeText={text => setPassword(text)}
                            style={styles.input}
                            secureTextEntry
                        />
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            disabled={!email.length > 0 && !password.length > 0}
                            onPress={handleLogin}
                            style={email.length > 0 && password.length > 0
                                ? styles.buttonActive
                                : styles.button}
                        >
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleRegisterScreen}
                            style={[styles.button, styles.buttonOutline]}
                        >
                            <Text style={styles.buttonOutlineText}>Do you have an account? Sign up.</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>


    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        // paddingTop: 50,
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    label: {
        fontSize: 26,
        color: COLORS.white,
        marginBottom: 30,
    },
    inputContainer: {
        width: '100%',
    },
    input: {
        backgroundColor: COLORS.inputColor,
        paddingHorizontal: 15,
        paddingVertical: 13,
        borderRadius: 10,
        marginBottom: 15,
        color: COLORS.white,
        fontSize: 16,
    },
    buttonContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 17,
    },
    button: {
        backgroundColor: COLORS.nactiveButtonClr,
        width: '100%',
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
    },
    buttonActive: {
        backgroundColor: COLORS.succesClr,
        width: '100%',
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
    },
    buttonOutline: {
        marginTop: 5,
        borderWidth: 2,
        backgroundColor: 'transparent'
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    buttonOutlineText: {
        color: COLORS.white,
        fontWeight: '700',
        fontSize: 16,
    },
});