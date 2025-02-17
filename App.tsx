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
import { Alert, LogBox } from "react-native";
import Chat from "./pages/(Main)/Chat/Chat";
import ChatDetail from "./components/ChatDetail/ChatDetail";
import "tailwindcss/tailwind.css";
import { AsyncStorageLocal } from "./utils/AsyncStorageLocal";

LogBox.ignoreLogs([
  "Warning: Main: Support for defaultProps will be removed from function components in a future major release.",
  "Warning: CountryPicker: Support for defaultProps will be removed from function components in a future major release.",
  "Warning: CountryModal: Support for defaultProps will be removed from function components in a future major release.",
  "Warning: Main: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.",
  "VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.",
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
          case "Map":
            icon = <Ionicons name="map-outline" size={24} color={"#0c1440"} />;
            break;
          case "MyTicket":
            icon = (
              <Ionicons name="ticket-outline" size={24} color={"#0c1440"} />
            );
            break;
          case "Profile":
            icon = (
              <Ionicons name="person-outline" size={24} color={"#0c1440"} />
            );
            break;
          case "Logout":
            icon = <Ionicons name="log-out" size={24} color={"#0c1440"} />;
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
      name="Map"
      component={Home}
      options={{ header: () => <Header />, headerShown: true }}
    />
    <Tab.Screen
      name="MyTicket"
      component={MyTickets}
      options={{ header: () => <Header />, headerShown: true }}
    />
    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{ header: () => <Header />, headerShown: true }}
    />
    <Tab.Screen
      name="Logout"
      component={() => null}
      listeners={{
        tabPress: (e) => {
          e.preventDefault();

          Alert.alert(
            "Logout",
            "Are you sure you want to log out?",
            [
              { text: "Cancel", style: "cancel" },
              {
                text: "OK",
                onPress: () => {
                  navigation.reset({
                    index: 0,
                    routes: [{ name: "SignIn" }],
                  }),
                    AsyncStorageLocal.remove("user");
                },
              },
            ],
            { cancelable: false }
          );
        },
      }}
    />
  </Tab.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeStack">
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{
            header: () => <Header goHome={true} />,
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{
            header: () => <Header goHome={true} />,
            headerShown: true,
          }}
        />
        <Stack.Screen
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
          name="HomeStack"
          component={TabNavigatorHome}
          options={{ headerShown: false }}
        />
        <Tab.Screen
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
