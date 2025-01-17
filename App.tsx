import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Header } from "./components/Header/Header";
import type { RootStackParamList } from "./types/NavigationTypes";
import { SignUp } from "./pages/(Auth)/SignUp/SignUp";
import { SignIn } from "./pages/(Auth)/SignIn/SignIn";
import ForgotPassword from "./pages/(Auth)/ForgotPassword/ForgotPassword";
import Home from "./pages/(Main)/Home/Home";
import Profile from "./pages/(Main)/Profile/Profile";
import { Notification } from "./pages/(Main)/Notification/Notification";
import { useRef } from "react";
import type { DrawerLayoutAndroid } from "react-native";

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootStackParamList>();

const TabNavigatorHome = ({ navigation }: any) => (
  <Tab.Navigator
    initialRouteName={"Home"}
    screenOptions={({ route }) => ({
      tabBarIcon: ({}) => {
        let icon;
        switch (route.name) {
          case "Home":
            icon = <Ionicons name="home-outline" size={24} color={"green"} />;
            break;
          case "Chat":
            icon = (
              <Ionicons name="chatbox-outline" size={24} color={"green"} />
            );
            break;
          case "Logout":
            icon = <Ionicons name="log-out" size={24} color={"green"} />;
            break;
          case "Notification":
            icon = (
              <Ionicons
                name="notifications-outline"
                size={24}
                color={"green"}
              />
            );
            break;
        }
        return icon;
      },
      tabBarActiveTintColor: "green",
      tabBarInactiveTintColor: "gray",
    })}
  >
    <Tab.Screen
      name="Home"
      component={Home}
      options={{ header: () => <Header />, headerShown: true }}
    />
    <Tab.Screen
      name="Chat"
      component={Home}
      options={{ header: () => <Header />, headerShown: true, tabBarBadge: 2 }}
    />
    <Tab.Screen
      name="Notification"
      component={Notification}
      options={{ header: () => <Header />, headerShown: true, tabBarBadge: 2 }}
    />
    <Tab.Screen
      name="Logout"
      component={() => null}
      listeners={{
        tabPress: (e) => {
          e.preventDefault();
          navigation.navigate("SignIn");
        },
      }}
    />
  </Tab.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            header: () => <Header />,
            headerShown: true,
          }}
        />

        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Home"
          component={TabNavigatorHome}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
