import React, {useEffect, useState} from 'react';
import {
    Button,
    InputAccessoryView,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import {COLORS} from "../config/constants";
import Modal from "react-native-modal";
import useNotificationModal from "../stores/useNotificationModal";
import { SafeAreaView as SafeAreaViewContent, useSafeAreaInsets } from 'react-native-safe-area-context';
import {ColorCreator} from "./ColorCreator";
import {setNotificationStatus} from "../firebaseConfig";
import useAuth from "../stores/useAuth";
import useSelectedUser from "../stores/useSelectedUser";
import useThemeProvider from "../stores/useThemeProvider";


function NotificationModal({ }) {
    const theme = useThemeProvider((state) => state.theme);
    const [modalKey, setModalKey] = React.useState(0);
    const insets = useSafeAreaInsets();
    const setNotificationModalStatus = useNotificationModal((state) => state.setNotificationModalStatus);
    const notificationModalStatus = useNotificationModal((state) => state.notificationModalStatus);
    const notificationNumber = useNotificationModal((state) => state.notificationNumber);
    const notificationData = useNotificationModal((state) => state.notificationData);

    useEffect(() => {
        const currentTime = new Date();
        const isApproximatelyEqual = Math.abs(currentTime - notificationData?.createdAt) <= 10000; // Yaklaşık olarak eşitlik kontrolü (5000 milisaniye tolerans)
        if (isApproximatelyEqual) {
            setNotificationModalStatus(true);
            setModalKey((prevKey) => prevKey + 1);
            const timeoutId = setTimeout(() => {
                setNotificationModalStatus(false);
            }, 3000);

            return () => {
                clearTimeout(timeoutId); // Değişiklik temizleyici fonksiyonunda zamanlayıcıyı temizle
            };
        }
    }, [notificationNumber]);

    const handlePress = () => {
       notificationData.handlePress();
        setNotificationModalStatus(false);
    }
    return (

        <View style={[styles.areaView, { backgroundColor: theme.headerColor}]}>
            <Modal
                key={modalKey}
                animationType="slide"
                transparent={true}
                isVisible={notificationModalStatus}
                animationIn={'slideInDown'}
                animationOut={"slideOutUp"}
                onSwipeComplete={() => setNotificationModalStatus(false)}
                // onSwipeMove={() => setNotificationModalStatus(false)}
                swipeDirection={'up'}
                // hideModalContentWhileAnimating={true}
                hasBackdrop={false}
                coverScreen={false}
                // backdropColor={'transparent'}
            >
                <TouchableOpacity style={[styles.modalView, { backgroundColor: theme.notificationModalColor}]} onPress={handlePress }>
                   <View style={styles.info}>
                       <View style={[styles.avatar, { borderColor: theme.borderColor}, { backgroundColor: ColorCreator(notificationData?.color)}]}>
                           <Text style={styles.avatarLabel}>{
                               notificationData?.name?.toUpperCase().split(' ')
                                   .reduce((prev,current) => `${prev}${current[0]}`,'')}
                           </Text>
                       </View>
                       <View style={styles.modalTextArea}>
                           <Text style={styles.modalText}>{notificationData?.name}</Text>
                           <Text style={[styles.modalTextMessage, {color: theme.text}]}>{notificationData?.text?.length >= 30 ? notificationData?.text.slice(0,30)+'...' : notificationData?.text}</Text>
                           {/*<Text style={styles.modalTextMessage}>{notificationData?.text}</Text>*/}
                       </View>
                   </View>
                    <View style={styles.swipeLine}></View>
                </TouchableOpacity>
            </Modal>
        </View>

    );
}
const styles = StyleSheet.create({
    areaView: {
        width: '100%',
        height: 40,
        // flex: 1,
        // flexDirection: 'row',
        // justifyContent: 'center',
        // alignItems: 'center',

    },
    modalView: {
        width: '100%',
        position: "absolute",
        top: 30,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 0,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10,
        padding: 0,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 5,
        gap: 10,
    },
    info: {
        width: '100%',
        flexDirection: "row",
        alignItems: "center",
    },
    modalTextArea: {
      marginLeft: 8,
    },
    modalText: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.orange,
    },
    modalTextMessage: {
        marginTop: -2,
        fontSize: 15,
        fontWeight: '400',
    },
    avatar: {
        width: 45,
        height: 45,
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

    },
    avatarLabel: {
        fontSize: 20,
        color: 'white',
    },
    swipeLine: {
        width: 70,
        height: 2,
        marginTop: 2,
        backgroundColor: COLORS.ash,
    },
});
export default NotificationModal;