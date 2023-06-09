import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import {createAccount} from "../firebaseConfig";
import {COLORS} from "../config/constants";
import Checkbox from 'expo-checkbox';


const RegisterScreen = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSelected, setIsSelected] = useState(false)

    // const navigation = useNavigation()


    const handleLoginScreen = () => {
        setTimeout(() => {
            navigation.navigate('Login');
        }, 100);
    }

    const handleRegister = () => {
        createAccount(email,password).then(() => {
            alert('Success Register')
            setTimeout(() => {
                navigation.navigate('Chats');
            }, 2000);
        }).catch((err) => {
            (err.message.includes('invalid-email')) ? alert('Geçersiz e-mail') :
                (err.message.includes('email-already-in-use')) ? alert('Bu e-posta adresi zaten kayıtlı. Lütfen farklı bir e-posta adresi kullanın.') :
                    (err.message.includes('weak-password')) ? alert('Şifreniz çok zayıf. Lütfen daha güçlü bir şifre oluşturun.') :
                        alert('Bilinmeyen Hata')
        })
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
        >
            <View style={styles.content}>
                <Text style={styles.label}>Set Up Your Profile</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Name"
                        placeholderTextColor={COLORS.nactiveButtonClr}
                        value={email}
                        onChangeText={text => setEmail(text)}
                        style={styles.input}
                    />
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
                    <TextInput
                        placeholder="Confirm Password"
                        placeholderTextColor={COLORS.nactiveButtonClr}
                        value={password}
                        onChangeText={text => setPassword(text)}
                        style={styles.input}
                        secureTextEntry
                    />
                </View>
                <View style={styles.opt}>
                        <View style={styles.checkboxContainer}>
                            <Checkbox
                                value={isSelected}
                                onValueChange={setIsSelected}
                                style={styles.checkbox}
                            />
                            <Text style={styles.optText}>Lorem ipsum dolor sit amet, consectetur adipisicing eeeeeeelit. Aliquam aspernatur at beatae corporis id iure provident quidem quisquam repellendus sed.</Text>
                        </View>
                        <View style={styles.checkboxContainer}>
                        <Checkbox
                            value={isSelected}
                            onValueChange={setIsSelected}
                            style={styles.checkbox}
                        />
                        <Text style={styles.optText}>Lorem ipsum dolor sit amet, consectetur adipisicing eeeeeeelit. Aliquam aspernatur at beatae corporis id iure provident quidem quisquam repellendus sed.</Text>
                        </View>
                        {/*<Text>Is CheckBox selected: {isSelected ? '👍' : '👎'}</Text>*/}
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={handleRegister}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Sign Up Now</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleLoginScreen}
                        style={[styles.button, styles.buttonOutline]}
                    >
                        <Text style={styles.buttonOutlineText}>Do you already have an account? Login.</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'black',

    },
    content: {
        width: '90%',
        paddingVertical: 25,
    },
    label: {
      fontSize: 26,
        color: COLORS.white,
        // marginTop: 36,
    },
    inputContainer: {
        width: '100%',
        marginTop: 20,
    },
    input: {
        backgroundColor: COLORS.inputColor,
        paddingHorizontal: 15,
        paddingVertical: 13,
        borderRadius: 10,
        marginTop: 15,
        color: COLORS.white,
        fontSize: 16,
    },
    placeholder: {
      color: COLORS.nactiveButtonClr,
    },
    opt: {
      marginTop: 25,
    },
    checkboxContainer: {
        flexDirection: "row",
        paddingRight: 10,
        marginVertical: 15,
    },
    optButton: {
      width: 3,
        height: 3,
        backgroundColor: COLORS.white
    },
    optText: {
      color: COLORS.nactiveButtonClr,
        fontSize: 13,
        marginStart: 10
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
    buttonOutline: {
        backgroundColor: 'transparent',
        marginTop: 5,
        // borderColor: '#0782F9',
        borderWidth: 2,
    },
    buttonText: {
        color: 'white',
        // fontWeight: '700',
        fontSize: 16,
    },
    buttonOutlineText: {
        color: COLORS.white,
        fontWeight: '700',
        fontSize: 16,
    },
})