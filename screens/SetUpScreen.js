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
import {createAccount, createUser, getUser, updateDisplayName} from "../firebaseConfig";
import { COLORS } from "../config/constants";
import Checkbox from 'expo-checkbox';
import useAuth from "../stores/useAuth";
import useCurrentUser from "../stores/useCurrentUser";
import useUserColor from "../stores/useUserColor";

const SetUpScreen = ({ navigation, route }) => {
    // const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [cPass, setcPass] = useState('')
    const [checkboxOne, setCheckboxOne] = useState(false)
    const [checkboxTwo, setCheckboxTwo] = useState(false)
    const setAuthUser = useAuth((state) => state.setAuthUser);
    const setCurrentUser = useCurrentUser((state) => state.setCurrentUser);
    const currentUser = useCurrentUser((state) => state.currentUser);
    const setUserColor = useUserColor((state) => state.setUserColor);

    // console.warn(route.params.email)
    const handleLoginScreen = () => {
        setTimeout(() => {
            navigation.navigate('Login');
        }, 100);
    }

    const handleRegister = async () => {
        if (password === cPass) {
            createAccount(route.params.email, password).then((user) => {
                updateDisplayName(firstName+' '+lastName)
                const userData = {
                    id: route.params.email.toLowerCase(),
                    name: (firstName+' '+lastName),
                }
                createUser(userData)
                getUser(user.email, setCurrentUser)
                setAuthUser(user)
                setUserColor(currentUser.colorNum)
                alert('Success Register')
                setTimeout(() => {
                    navigation.navigate('Home');
                }, 2000);
            }).catch((err) => {
                (err.message.includes('invalid-email')) ? alert('Geçersiz e-mail') :
                    (err.message.includes('email-already-in-use')) ? alert('Bu e-posta adresi zaten kayıtlı. Lütfen farklı bir e-posta adresi kullanın.') :
                        (err.message.includes('weak-password')) ? alert('Şifreniz çok zayıf. Lütfen daha güçlü bir şifre oluşturun.') :
                            alert(err)
            })
        } else alert('Parolalar uyuşmuyor')
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.label}>Set Up Your Profile</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="First Name"
                            placeholderTextColor={COLORS.nactiveButtonClr}
                            value={firstName}
                            onChangeText={text => setFirstName(text)}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Last Name"
                            placeholderTextColor={COLORS.nactiveButtonClr}
                            value={lastName}
                            onChangeText={text => setLastName(text)}
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
                            value={cPass}
                            onChangeText={text => setcPass(text)}
                            style={styles.input}
                            secureTextEntry
                        />
                    </View>
                    <View style={styles.opt}>
                        <View style={styles.checkboxContainer}>
                            <Checkbox
                                value={checkboxOne}
                                onValueChange={setCheckboxOne}
                                style={styles.checkbox}
                            />
                            <Text style={styles.optText}>Lorem ipsum dolor sit amet, consectetur adipisicing eeeeeeelit. Aliquam aspernatur at beatae corporis id iure provident quidem quisquam repellendus sed.</Text>
                        </View>
                        <View style={styles.checkboxContainer}>
                            <Checkbox
                                value={checkboxTwo}
                                onValueChange={setCheckboxTwo}
                                style={styles.checkbox}
                            />
                            <Text style={styles.optText}>Lorem ipsum dolor sit amet, consectetur adipisicing eeeeeeelit. Aliquam aspernatur at beatae corporis id iure provident quidem quisquam repellendus sed.</Text>
                        </View>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={handleRegister}
                            style={
                            firstName.length > 0 &&
                            lastName.length > 0 &&
                            password.length > 0 &&
                            cPass.length > 0 &&
                            checkboxOne === true &&
                            checkboxTwo === true
                                ? styles.buttonActive
                                : styles.button}
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
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default SetUpScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 100,
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
    opt: {
        marginTop: 25,
    },
    checkboxContainer: {
        flexDirection: "row",
        paddingRight: 10,
        marginVertical: 15,
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
