import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import {sendMessage, setTyping} from "../firebaseConfig";
import useAuth from "../stores/useAuth";
import useChatData from "../stores/useMessages";
import {StyleSheet} from "react-native";
import {COLORS} from "../config/constants";
import TypingIndicator from "./TypingIndicator";

const Chat = ({route}) => {
    const [messages, setMessages] = useState([]);
    const currentUser = useAuth((state) => state?.currentUser);
    const chatData = useChatData((state) => state.chatData);
    const userMail = route.params?.mail
    const messageRef = [currentUser.email,route.params?.mail].sort().join('')
    const [isTyping, setIsTyping] = useState(false);


    useEffect(() => {
        const aa = chatData.find((x) => x.chatId === route.params?.id).messages
        // Her messages güncellendiğinde yapılacak işlemler
        const a = convertMessages([aa])
        setMessages(a)
        // setlastMessage(a[0]?.text ? a[0].text : 'No message yet')
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