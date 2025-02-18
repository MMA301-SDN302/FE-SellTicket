import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Header } from "./components/Header/Header";
import type {
  RootStackParamList,
  RootTabParamList,
} from "./types/NavigationTypes";
import { SignUp } from "./pages/(Auth)/SignUp/SignUp";
import { SignIn } from "./pages/(Auth)/SignIn/SignIn";
import ForgotPassword from "./pages/(Auth)/ForgotPassword/ForgotPassword";
import Home from "./pages/(Main)/Home/Home";
import Profile from "./pages/(Main)/Profile/Profile";
import { Notification } from "./pages/(Main)/Notification/Notification";
import MyTickets from "./pages/(Main)/MyTicket/MyTicket";
import RoutePage from "./pages/(Main)/Route/Route";
import Booking from "./pages/(Main)/Booking/Booking";
import PlaceOrder from "./pages/(Main)/PlaceOrder/PlaceOrder";
import { LogBox, View } from "react-native";
import Chat from "./pages/(Main)/Chat/Chat";
import ChatDetail from "./components/ChatDetail/ChatDetail";
import "tailwindcss/tailwind.css";
import ToastMessage from "./components/Common/ToastMessage/ToastMessage";
import VerifyOtp from "./pages/(Auth)/VerifyOtp/VerifyOtp";

LogBox.ignoreLogs([
  "Warning: Main: Support for defaultProps will be removed from function components in a future major release.",
  "Warning: CountryPicker: Support for defaultProps will be removed from function components in a future major release.",
  "Warning: CountryModal: Support for defaultProps will be removed from function components in a future major release.",
]);

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

const TabNavigatorHome = ({ navigation }: any) => (
  <Tab.Navigator
    initialRouteName={"Home"}
    screenOptions={({ route }) => ({
      tabBarIcon: ({}) => {
        let icon;
        switch (route.name) {
          case "Home":
            icon = <Ionicons name="home-outline" size={24} color={"#0c1440"} />;
            break;
          case "Chat":
            icon = (
              <Ionicons name="chatbox-outline" size={24} color={"#0c1440"} />
            );
            break;
          case "Logout":
            icon = <Ionicons name="log-out" size={24} color={"#0c1440"} />;
            break;
          case "Notification":
            icon = (
              <Ionicons
                name="notifications-outline"
                size={24}
                color={"#0c1440"}
              />
            );
            break;
        }
        return icon;
      },
      tabBarActiveTintColor: "#0c1440",
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
      component={Chat}
      options={{ header: () => <Header />, headerShown: true, tabBarBadge: 2 }}
    />
    <Tab.Screen
      name="Notification"
      component={Notification}
      options={{ header: () => <Header />, headerShown: true, tabBarBadge: 2 }}
    />
    <Tab.Screen
      name="Logout"
      listeners={{
        tabPress: (e) => {
          e.preventDefault();
          navigation.reset({
            index: 0,
            routes: [{ name: "SignIn" }],
          });
        },
      }}
    >
      {() => null}
    </Tab.Screen>
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
            header: () => <Header goHome={true} />,
            headerShown: true,
          }}
        />
        <Tab.Screen
          name="ChatDetail"
          component={ChatDetail}
          options={{
            header: () => <Header back={true} />,
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
        <Stack.Screen
          name="MyTicket"
          component={MyTickets}
          options={{
            header: () => <Header goHome={true} />,
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="Route"
          component={RoutePage}
          options={{
            header: () => <Header goHome={true} />,
            headerShown: true,
          }}
        />

        <Stack.Screen
          name="Booking"
          component={Booking}
          options={{
            header: () => <Header goHome={true} />,
            headerShown: true,
          }}
        />

        <Stack.Screen
          name="PlaceOrder"
          component={PlaceOrder}
          options={{
            header: () => <Header goHome={true} />,
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="OtpVerify"
          component={VerifyOtp}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <ToastMessage />
    </NavigationContainer>
  );
}
