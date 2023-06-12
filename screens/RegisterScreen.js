import { useNavigation } from '@react-navigation/core'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import React, { useEffect, useState } from 'react'
import {
    Keyboard,
    KeyboardAvoidingView,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    Platform,
    ScrollView,
} from 'react-native'
import { createAccount } from "../firebaseConfig";
import { COLORS } from "../config/constants";
import Checkbox from 'expo-checkbox';

const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')
    // const [isSelected, setIsSelected] = useState(false)

    const handleLoginScreen = () => {
        setTimeout(() => {
            navigation.navigate('Login');
        }, 100);
    }

    const handleSetUpScreen = () => {
        if (email?.includes('@') && email?.includes('.com')) {
            setTimeout(() => {
                navigation.navigate('SetUp',{email: email});
            }, 100);
        }
        else alert('Lütfen geçerli bir e-posta adresi giriniz')

    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.label}>Enter Your Email</Text>
                    <View style={styles.inputContainer}>

                        <TextInput
                            placeholder="Email"
                            placeholderTextColor={COLORS.nactiveButtonClr}
                            value={email}
                            onChangeText={text => setEmail(text)}
                            style={styles.input}
                        />
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity disabled={email.length === 0}
                            onPress={handleSetUpScreen}
                            style={email.length === 0 ? styles.button : styles.buttonActive}
                        >
                            <Text style={styles.buttonText}>Next</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleLoginScreen}
                            style={[styles.button, styles.buttonOutline]}
                        >
                            <Text style={styles.buttonOutlineText}>Do you already have an account? Login.</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        // paddingTop: 100,
        paddingHorizontal: 20,
        justifyContent: 'center',

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
