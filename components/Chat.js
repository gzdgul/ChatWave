import React, { useState, useCallback, useEffect } from 'react'
import {Avatar, Bubble, Composer, GiftedChat, InputToolbar, MessageText, Send} from 'react-native-gifted-chat'
import {listenTyping, sendMessage, setNotificationStatus, setTyping} from "../firebaseConfig";
import useAuth from "../stores/useAuth";
import useChatData from "../stores/useMessages";
import {BackHandler, StyleSheet, View, Text, SafeAreaView, TouchableOpacity} from "react-native";
import TypingIndicator from "./TypingIndicator";
import useSelectedUser from "../stores/useSelectedUser";
import {useFocusEffect} from "@react-navigation/core";
import useThemeProvider from "../stores/useThemeProvider";
import {COLORS, darkTheme} from "../config/constants";
import {Ionicons, MaterialIcons} from "@expo/vector-icons";
import {ColorCreator} from "./ColorCreator";


const Chat = ({route, navigation}) => {
    const [messages, setMessages] = useState([]);
    const theme = useThemeProvider((state) => state.theme);
    const setSelectedUser = useSelectedUser((state) => state.setSelectedUser);
    const authUser = useAuth((state) => state?.authUser);
    const chatData = useChatData((state) => state.chatData);
    const chatId = route.params?.id
    const userId = route.params?.mail
    const user = route.params?.user
    // const status = route.params?.status
    const messageRef = [authUser.email,route.params?.mail].sort().join('')
    const [isTyping, setIsTyping] = useState(false);
    const [typers, setTypers] = useState([]);
    const [userTyping, setUserTyping] = useState(false);
    const [keyboardAppearance, setKeyboardAppearance] = useState('light');
    // const [unread, setUnread] = useState(false);
    ///////////////////////////////////////////////////////////////////////////////////////
    // const [isAttachImage, setIsAttachImage] = useState(false);
    // const [isAttachFile, setIsAttachFile] = useState(false);
    // const [imagePath, setImagePath] = useState('');
    // const [filePath, setFilePath] = useState('');

    // useEffect(() => {
    //     if (status?.unread){
    //         if ( status?.lastTyper !== authUser?.email) {
    //             setUnread(true)
    //         }
    //         else setUnread(false)
    //     }
    //     else setUnread(false)
    // },[])
    ///////////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        listenTyping(chatId, (typers) => {
            // Typers'ı dışarıda kullanabilirsiniz
            setTypers(typers)
        });
    },[])

    useEffect(() => {
        if (typers !== [] && typers.includes(userId)) {
            setUserTyping(true)
        }
        else setUserTyping(false)
    },[typers])

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                setSelectedUser(null)
                return true;
            };
            navigation.addListener('beforeRemove', onBackPress);
            navigation.setOptions({ tabBarVisible: true });
            return () => {
                navigation.removeListener('beforeRemove', onBackPress);
                navigation.setOptions({ tabBarVisible: false });

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
            if (([...a].shift().user._id) !== authUser.email) {
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

    useEffect(() => {
        if (isTyping){
            setTyping(chatId, true)
            const timeoutId = setTimeout(() => {
                setIsTyping(false);
            }, 10000); ////////////////////////////////////////////////////////

            return () => {
                clearTimeout(timeoutId); // Değişiklik temizleyici fonksiyonunda zamanlayıcıyı temizle
            };
        }
        else setTyping(chatId, false)

    },[isTyping])
    const renderFooter = () => {
        if (userTyping) {
            return <View style={styles.typingContainer}>
                    <Text style={[styles.typingText, {color: theme.textLight}]}>typing</Text>
                        <View style={styles.typingIndicator}>
                            <TypingIndicator />
                        </View>
                    </View>;
        }
        return null;
    };

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



    const renderInputToolbar = (props) => {
        return (
            <InputToolbar {...props}
                          containerStyle={[styles.inputContainer, { backgroundColor: theme.pure}]} />
        )
    }
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
            style={styles.container}
        />
    )
    const renderComposer = (props) => {
        return (
            <Composer
                {...props}
                placeholder="Mesajınızı yazın..."
                textInputStyle={{
                    color: theme.text,
            }}
                keyboardAppearance={theme === darkTheme ? 'dark' : 'default'}
            />
        );
    };
    const renderSend = (props) => {
        return (
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => alert(1)}>
                    <Ionicons name="file-tray-full-outline" size={24} color={theme.textLight} />


                </TouchableOpacity>
                <Send {...props}>
                    <View style={styles.sendContainer}>
                        <Ionicons name="paper-plane" size={24} color={theme.textLight} />
                    </View>
                </Send>
            </View>

        );
    };

    const renderAvatar = (props) => {
        return (
            <Avatar
                {...props}
                imageStyle={{
                    left: {
                        borderRadius: 24,
                        backgroundColor: ColorCreator(user?.colorNum),
                        marginRight: -8,
                    },
                    right: {
                        borderRadius: 24,
                        backgroundColor: ColorCreator(user?.colorNum),
                        marginRight: -8,
                    }
                }}
                // renderAvatarOnTop={true}

                onPressAvatar={() => console.log('Avatar pressed')}
            />
        );
    };
    // const renderTicks = (props) => {
    //     // const { currentMessage } = props;
    //     // console.log('currentMessage',props)
    //
    //     if (props.user?._id ===  authUser?.email) {
    //         return (
    //                 <View style={styles.ticksContainer}>
    //                          <MaterialIcons name="done" size={16} color="#ffffff" />
    //                 </View>
    //         );}
    //     return null;
    // };
    return (
        <SafeAreaView
            style={[styles.areaView, {backgroundColor: theme.pure}]}
        >
            <GiftedChat
                renderInputToolbar={renderInputToolbar}
                renderComposer={renderComposer}
                messagesContainerStyle={[styles.chatContainer, {backgroundColor: theme.pure}]}
                onInputTextChanged={handleInputTextChanged}
                renderFooter={renderFooter}
                renderBubble={renderBubble}
                renderSend={renderSend}
                renderAvatar={renderAvatar}
                // renderTicks={renderTicks}
                // keyboardShouldPersistTaps='always'
                alwaysShowSend={true}
                // renderAvatar={(props) => {
                //     const { avatarProps } = props.currentMessage;
                //     if (avatarProps.name) {
                //         return(
                //             <UserAvatar size="40" name={avatarProps.name} src={avatarProps.icon} />
                //         );
                //     }
                //     return(null);
                // }}
                messages={messages}

                onSend={messages => onSend(messages)}
                user={{
                    _id: authUser?.email,
                    name: authUser?.displayName,
                }}

            />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    areaView: {
       flex: 1,
    },
    container: {

    },
    sendContainer: {
        height: '100%',
        paddingHorizontal: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    ticksContainer: {
      marginRight: 8,
        marginBottom: 5
    },
    inputContainer: {
       // backgroundColor: 'red'
    },
    typingContainer: {
        flexDirection: "row",
        alignItems: "center",
        // backgroundColor: 'red',
        paddingHorizontal: 5,
    },
    typingText: {
      fontWeight: "500",
    },
    typingIndicator: {
        paddingBottom: 6,
        paddingHorizontal: 3,

    }
});
export default Chat;