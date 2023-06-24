import {AppState, StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {Ionicons} from "@expo/vector-icons";
import {createStackNavigator} from "@react-navigation/stack";
import Settings from "./screens/Settings";
import LoginScreen from "./screens/LoginScreen";
import Chats from "./screens/Chats";
import Chat from "./components/Chat";
import {COLORS} from "./config/constants";
import RegisterScreen from "./screens/RegisterScreen";
import SetUpScreen from "./screens/SetUpScreen";
import useSelectedUser from "./stores/useSelectedUser";
import useModal from "./stores/useModal";
import NotificationModal from "./components/notificationModal";
import React, {useEffect, useRef, useState} from "react";
import {getUser, setOnline} from "./firebaseConfig";
import useAuth from "./stores/useAuth";
import useThemeProvider from "./stores/useThemeProvider";
import Appearance from "./components/Appearance";
import useCurrentUser from "./stores/useCurrentUser";
import useUserColor from "./stores/useUserColor";
import useNotification from "./stores/useNotification";

const ChatsStack = createStackNavigator();
const SettingsStack = createStackNavigator();
const MainStack = createStackNavigator();
const UserStack = createStackNavigator();
const Tabs = createBottomTabNavigator();

const UserScreen = () => {
    const selectedUser = useSelectedUser((state) => state.selectedUser);
    const theme = useThemeProvider((state) => state.theme);
    return (
        <UserStack.Navigator screenOptions={{ headerShown: true }} >
            <UserStack.Screen name={'Tabs'} component={TabsScreen} options={{
                headerTitleStyle: { display: "none" },
                headerShown: false,
            }}/>
            <UserStack.Screen name={'Chat'}  component={Chat} options={{
                title: selectedUser ? selectedUser.name : 'chat',
                headerStyle: { backgroundColor: theme.headerColor },
                headerTitleStyle: { color: theme.text },
                headerTintColor: COLORS.orange, // Geri butonunun rengi
                headerBackTitleVisible: false,
                // tabBarStyle: { display: "none" }

            }}/>
        </UserStack.Navigator>
    )
}
const TabsScreen = ({route}) => {
    const theme = useThemeProvider((state) => state.theme);
    const unreadContacts = useNotification((state) => state.unreadContacts);
    useEffect(() => {
        console.log('unreadContacts',unreadContacts)
    },[unreadContacts])
    return (
        <Tabs.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';}
                    else if (route.name === 'Settings') {
                        iconName = focused ? 'settings' : 'settings-outline';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: COLORS.orange,
                tabBarInactiveTintColor: COLORS.gray,
                tabBarHideOnKeyboard: true,
                tabBarStyle: {
                    backgroundColor: theme.pure, // Footer arka plan rengi
                    borderTopColor: theme.line,
                },
            })}
        >
            <Tabs.Screen name="Home" component={ChatsScreen}
                         options={{
                             tabBarBadge: unreadContacts.length === 0 ? null : unreadContacts.length
                        }}
            />
            <Tabs.Screen name="Settings" component={SettingsScreen} />
        </Tabs.Navigator>
    );
}
const ChatsScreen = ({route}) => {
    const setModalStatus = useModal((state) => state.setModalStatus);
    const theme = useThemeProvider((state) => state.theme);
    const handlePlusPress = () => {
        setModalStatus(true)
    }

    return (
        <ChatsStack.Navigator screenOptions={{ headerShown: true }}
            options={{
                headerStyle: { backgroundColor: theme.headerColor },

        }} >

            <ChatsStack.Screen name={'Mesajlar'}  component={Chats} options={{
                headerStyle: { backgroundColor: theme.headerColor, shadowColor: theme.line },
                headerTitleStyle: { display: "none" },
                headerLeft: () => (
                    <TouchableOpacity style={{ marginLeft: 20 }}>
                        <Text style={styles.editText}>Düzenle</Text>
                    </TouchableOpacity>
                ),

                headerRight: () => (
                    <TouchableOpacity style={{ marginRight: 20 }}>
                        <Text style={styles.plus} onPress={handlePlusPress}>+</Text>
                    </TouchableOpacity>
                ),
            }}/>
        </ChatsStack.Navigator>
    )
}
const SettingsScreen = () => {
    const theme = useThemeProvider((state) => state.theme);
    return (
        <SettingsStack.Navigator screenOptions={{ headerShown: true }} >
            <SettingsStack.Screen name={'Account Settings'}  component={Settings}  options={{
                headerStyle: { backgroundColor: theme.headerColor, shadowColor: theme.line },
                headerTitleStyle: { color: theme.text },
            }}/>
            <SettingsStack.Screen name={'Appearance'}  component={Appearance}  options={{
                headerStyle: { backgroundColor: theme.headerColor, shadowColor: theme.line },
                headerTitleStyle: { color: theme.text },
            }}/>
        </SettingsStack.Navigator>
    )
}



export default function App() {
    const authUser = useAuth((state) => state.authUser);
    console.log('CURRENT_USER',authUser?.email)
    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);

    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            // (appState.current.match(/inactive|background/) && nextAppState === 'active') ? console.log('App foreground!')
            //     : (appState.current === 'active' && nextAppState.match(/inactive|background/)) && console.log('App BACKGROUND')
            appState.current = nextAppState;
            setAppStateVisible(appState.current);
            // console.log('AppState', appState.current);
        });

        return () => {
            subscription.remove();
        };
    }, []);

    useEffect(() => {
        if (appStateVisible === "background") {
            setOnline( false)
        }
        if (appStateVisible === "active") {
            setOnline( true)
        }
    },[appStateVisible])

    return (
        <NavigationContainer>
            <MainStack.Navigator screenOptions={{ presentation: 'card', headerShown: false }} >
                <MainStack.Screen name={'userScreen'} component={UserScreen} options={{
                    headerShown: true,
                    header: () => (
                        // <Text></Text>
                            <NotificationModal/>
                    )
                }}/>
                <MainStack.Screen name={'Login'} component={LoginScreen}  options={{
                    headerTitleStyle: { display: "none" },
                    headerStyle: { backgroundColor: COLORS.deepBlack },
                    headerShadowVisible: false,
                    headerLeft: () => null,
                }}/>
                <MainStack.Screen name={'Register'} component={RegisterScreen} options={{
                    headerTitleStyle: { display: "none" },
                    headerStyle: { backgroundColor: COLORS.deepBlack },
                    headerShadowVisible: false,
                    headerLeft: () => null,
                }}/>
                <MainStack.Screen name={'SetUp'} component={SetUpScreen} options={{
                    headerTitleStyle: { display: "none" },
                    headerStyle: { backgroundColor: COLORS.deepBlack },
                    headerShadowVisible: false,
                    headerLeft: () => null,
                }}/>
            </MainStack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    plus: {
        fontSize: 40,
        fontWeight: "200",
        color: COLORS.orange,
    },
    editText: {
        fontSize: 15,
        color: COLORS.orange,
    },
    // tabBar: {
    //     display: 'flex',
    //     backgroundColor: '#ff0000',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },
});
