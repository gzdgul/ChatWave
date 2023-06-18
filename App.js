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
import SetUpScreen from "./screens/SetUpScreen";
import useSelectedUser from "./stores/useSelectedUser";
import userPlus from "./assets/userplus.png";
import useModal from "./stores/useModal";

const ChatsStack = createStackNavigator();
const SettingsStack = createStackNavigator();
const MainStack = createStackNavigator();
const Tabs = createBottomTabNavigator();

const ChatsScreen = ({route}) => {
    const selectedUser = useSelectedUser((state) => state.selectedUser);
    const setModalStatus = useModal((state) => state.setModalStatus);
    const modalStatus = useModal((state) => state.modalStatus);
    const handlePlusPress = () => {
        setModalStatus(true)
    }
    return (
        <ChatsStack.Navigator screenOptions={{ headerShown: true }}  >
            <ChatsStack.Screen name={'Mesajlar'}  component={Chats} options={{
                headerStyle: { backgroundColor: COLORS.backgroundClr },
                headerTitleStyle: { fontSize: 30, color: COLORS.inputColor },
                // İstediğiniz font büyüklüğünü burada belirleyebilirsiniz
                headerRight: () => (
                    <View style={{ marginRight: 20 }}>
                        <Text style={styles.plus} onPress={handlePlusPress}>+</Text>
                    </View>
                ),
            }}/>
            <ChatsStack.Screen name={'Chat'}  component={Chat} options={{
                title: selectedUser ? selectedUser : 'chat',
                headerStyle: { backgroundColor: 'red' },
            }}/>
        </ChatsStack.Navigator>
    )
}
const SettingsScreen = () => {
    return (
        <SettingsStack.Navigator screenOptions={{ headerShown: true }} >
            <SettingsStack.Screen name={'Account Settings'}  component={Settings}/>
        </SettingsStack.Navigator>
    )
}

const TabsScreen = ({route}) => (
    <Tabs.Navigator screenOptions={
        ({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Home') {
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
        <Tabs.Screen name={'Home'} component={ChatsScreen} />
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
                <MainStack.Screen name={'SetUp'} component={SetUpScreen}/>
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
    tabBar: {
        display: 'flex',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
