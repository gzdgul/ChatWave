import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import {sendMessage, setNotificationStatus, setTyping} from "../firebaseConfig";
import useAuth from "../stores/useAuth";
import useChatData from "../stores/useMessages";
import {BackHandler, StyleSheet} from "react-native";
import {COLORS} from "../config/constants";
import TypingIndicator from "./TypingIndicator";
import useSelectedUser from "../stores/useSelectedUser";
import useNotificationModal from "../stores/useNotificationModal";
import {useFocusEffect} from "@react-navigation/core";

const Chat = ({route, navigation}) => {
    const [messages, setMessages] = useState([]);
    const setSelectedUser = useSelectedUser((state) => state.setSelectedUser);
    const currentUser = useAuth((state) => state?.currentUser);
    const chatData = useChatData((state) => state.chatData);
    const setNotificationData = useNotificationModal((state) => state.setNotificationData);
    const userMail = route.params?.mail
    const messageRef = [currentUser.email,route.params?.mail].sort().join('')
    const [isTyping, setIsTyping] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                // setNavigatedChat('')
                setSelectedUser(null)
                return true;
            };

            navigation.addListener('beforeRemove', onBackPress);

            return () => {
                navigation.removeListener('beforeRemove', onBackPress);
            };
        }, [navigation])
    );

    useEffect(() => {
        const aa = chatData.find((x) => x.chatId === route.params?.id).messages
        // Her messages güncellendiğinde yapılacak işlemler
        const a = convertMessages([aa])
        setMessages(a)
        if (([...a].shift()?.user)) {
            // setNotificationData([...a].shift())
            if (([...a].shift().user._id) !== currentUser.email) {
                setNotificationStatus(messageRef,false)
            }
        }
    }, [chatData]);

    useEffect(() => {
        if (route.params?.messages) {
            const a = convertMessages([route.params?.messages])
            setMessages(a)
        }
    }, [])

    const onSend = useCallback((messages = []) => {
        if (messages.length > 0) {
            const message = messages[0]; // İlk mesajı alın

            sendMessage(
                {
                    _id: message?._id,
                    createdAt: message?.createdAt,
                    text: message?.text,
                    user: message?.user,
                },
                messageRef
            );
            setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
            // console.warn(messages);
        }
    }, []);

    const convertMessages = (chatMessages) => {
        const convertedMessages = [];

        chatMessages[0].forEach((chat) => {
            const convertedMessage = {
                _id: chat._id,
                text: chat.text,
                createdAt: chat.createdAt.toDate(),
                user: {
                    _id: chat.user._id,
                    name: chat.user.name,
                },
            };
                convertedMessages.push(convertedMessage);
        });
        return convertedMessages;
    };
    const handleInputTextChanged = text => {
        setIsTyping(text.length > 0);

    };
    // useEffect(() => {
    //     if (isTyping){
    //         setTyping(route.params?.mail, true)
    //         console.warn(route.params?.mail, true)
    //     }
    //     else  setTyping('aaaaaaaaaaaaaaa', false)
    //
    // },[isTyping])

    const renderFooter = () => {
        if (isTyping) {
            return <TypingIndicator />;
        }
        return null;
    };

    return (
        <GiftedChat
            messagesContainerStyle={styles.deneme}
            onInputTextChanged={handleInputTextChanged}
            // renderFooter={renderFooter}
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: currentUser?.email,
                name: currentUser?.displayName,
            }}
        />
    )
}
const styles = StyleSheet.create({
    deneme: {
       backgroundColor: COLORS.white
    }
});
export default Chat;