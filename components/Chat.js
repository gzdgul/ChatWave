import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import {sendMessage} from "../firebaseConfig";
import useAuth from "../stores/useAuth";
import useChatData from "../stores/useMessages";

const Chat = ({route}) => {
    const [messages, setMessages] = useState([]);
    const currentUser = useAuth((state) => state?.currentUser);
    const chatData = useChatData((state) => state.chatData);
    // const aa = chatData.find((x) => x.chatId === route.params?.id)
    // console.warn('chatkey',route.params?.id)
    // console.warn('mail',route?.params.mail)
    // console.warn(route.params.mail)
    // console.warn('MESSAGES',route.params?.messages)
    // console.warn('currentUserdisplayName',currentUser?.displayName)
    const userMail = route.params?.mail
    const messageRef = [currentUser.email,route.params?.mail].sort().join('')
    // console.warn(messageRef)
    // const messages = route.params.messages
    // const currentUserName = currentUser
    useEffect(() => {
        const aa = chatData.find((x) => x.chatId === route.params?.id).messages
        // Her messages güncellendiğinde yapılacak işlemler
        // console.warn('Messages güncellendi:', aa);
        const a = convertMessages([aa])
        setMessages(a)
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
            // console.warn('CHATTTTTTTTTTTTT',chat)
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

    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: currentUser?.email,
                name: currentUser?.displayName,
            }}
        />
    )
}

export default Chat;