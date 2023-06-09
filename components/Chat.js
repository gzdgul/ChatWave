import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'

const Chat = ({route}) => {
    const [messages, setMessages] = useState([]);
    console.warn(route.params.id)

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
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        console.warn(messages[0]._id,
            messages[0].createdAt,
            messages[0].text,
            messages[0].user,
        )
        console.warn(messages)
    }, [])

    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: 'gsddfgfgddfodffdddfzde@test.com',
                name: 'Rozde Gul',
            }}
        />
    )
}

export default Chat;