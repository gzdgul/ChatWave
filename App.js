import { StatusBar } from 'expo-status-bar';
import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {Ionicons} from "@expo/vector-icons";
import {createStackNavigator} from "@react-navigation/stack";
import Settings from "./screens/Settings";
import LoginScreen from "./screens/LoginScreen";
import Chats from "./screens/Chats";
import Chat from "./components/Chat";
import {COLORS} from "./config/constants";
import RegisterScreen from "./screens/RegisterScreen";

const ChatsStack = createStackNavigator();
const SettingsStack = createStackNavigator();
const MainStack = createStackNavigator();
const Tabs = createBottomTabNavigator();
const ChatsScreen = () => {
    return (
        <ChatsStack.Navigator screenOptions={{ headerShown: true }} >
            <ChatsStack.Screen name={'Chats'}  component={Chats}/>
            <ChatsStack.Screen name={'Chat'}  component={Chat}/>
        </ChatsStack.Navigator>
    )
}
const SettingsScreen = () => {
    return (
        <SettingsStack.Navigator screenOptions={{ headerShown: true }} >
            <SettingsStack.Screen name={'Settings'}  component={Settings}/>
        </SettingsStack.Navigator>
    )
}

const TabsScreen = () => (
    <Tabs.Navigator screenOptions={
        ({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Messages') {
                    iconName = focused
                        ? 'chatbubbles'
                        : 'chatbubbles-outline';
                } else if (route.name === 'Settings') {
                    iconName = focused ? 'settings' : 'settings-outline';
                }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: COLORS.accent,
            tabBarInactiveTintColor: COLORS.gray,
        })}>
        <Tabs.Screen name={'Messages'} component={ChatsScreen}/>
        <Tabs.Screen name={'Settings'} component={SettingsScreen}/>
    </Tabs.Navigator>
);

export default function App() {
    return (
        <NavigationContainer>
            <MainStack.Navigator screenOptions={{ presentation: 'modal', headerShown: false }} >
                <MainStack.Screen name={'Tabs'} component={TabsScreen}/>
                <MainStack.Screen name={'Login'} component={LoginScreen}/>
                <MainStack.Screen name={'Register'} component={RegisterScreen}/>
            </MainStack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        display: 'flex',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
