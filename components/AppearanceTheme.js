import React from 'react';
import { GiftedChat, Avatar, Bubble } from 'react-native-gifted-chat';
import {View} from "react-native";
import useThemeProvider from "../stores/useThemeProvider";

const AppearanceTheme = () => {
    const theme = useThemeProvider((state) => state.theme);
    const messages = [
        {
            _id: 2,
            text: 'İyiyim teşekkür ederim, sen nasılsın?',
            createdAt: new Date(),
            user: {
                _id: 1,
                name: 'Ben',
            },
        },
        {
            _id: 1,
            text: 'Merhaba, nasılsın?',
            createdAt: new Date(),
            user: {
                _id: 2,
                name: 'React Native',
            },
        },

    ];
    const renderBubble = (props) => (
        <Bubble
            {...props}
            wrapperStyle={{
                left: {
                    backgroundColor: theme.bubbleLeft, //karşı tarafın bubble backgroundColor
                },
                right: {
                    backgroundColor: theme.bubbleRight, //kullanıcının bubble backgroundColor
                },
            }}
            textProps={{
                style: {
                    color: props.position === 'left'
                        ? theme.bubbleLeftTextColor   // textColor karşı taraf
                        : theme.bubbleRightTextColor , // textColor kullanıcı
                },
            }}
            textStyle={{
                left: {
                    color: '#fff',
                },
                right: {
                    color: '#000',
                },
            }}
        />
    )
    return (
        <View style={{ height: 200, marginBottom: -30}}>
            <GiftedChat
                // messagesContainerStyle={{backgroundColor: theme.pure}}
                messages={messages}
                user={{
                    _id: 1,
                }}
                renderAvatar={(props) => <Avatar {...props} />}
                renderBubble={renderBubble}
                renderInputToolbar={() => null}
            />
        </View>

    );
};

export default AppearanceTheme;