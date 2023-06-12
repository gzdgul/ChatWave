import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import {sendMessage} from "../firebaseConfig";
import useAuth from "../stores/useAuth";

const Chat = ({route}) => {
    const [messages, setMessages] = useState([]);
    const currentUser = useAuth((state) => state.currentUser);

    console.warn('chatkey',route?.params.id)
    // console.warn(route.params.mail)
    // console.warn(currentUser.email)
    console.warn('currentUserdisplayName',currentUser?.displayName)
    const userMail = route?.params.mail
    // const currentUserName = currentUser

    useEffect(() => {
        // setMessages([
        //     {
        //         _id: 1,
        //         text: 'Hello developergozde',
        //         createdAt: new Date(),
        //         user: {
        //             _id: 'gozde@test.com',
        //             name: 'React Native',
        //             avatar: 'https://placeimg.com/140/140/any',
        //         },
        //     },
        //     {
        //         _id: 2,
        //         text: 'Hello developer',
        //         createdAt: new Date(),
        //         user: {
        //             _id: 'g@test.com',
        //             name: 'React Native',
        //             avatar: 'https://placeimg.com/140/140/any',
        //         },
        //     },
        //     {
        //         _id: 3,
        //         text: 'Hello developeraaaaa',
        //         createdAt: new Date(),
        //         user: {
        //             _id: 'g@test.com',
        //             name: 'React Native',
        //             avatar: 'https://placeimg.com/140/140/any',
        //         },
        //     },
        // ])

    }, [])

    const onSend = useCallback((messages = []) => {
        if (messages.length > 0) {
            const message = messages[0]; // İlk mesajı alın

            sendMessage(
                {
                    _id: message._id,
                    createdAt: message.createdAt,
                    text: message.text,
                    user: message.user,
                },
                userMail
            );

            setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
            console.warn(messages);
        }
    }, []);


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