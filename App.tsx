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
import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "Warning: Main: Support for defaultProps will be removed from function components in a future major release.",
  "Warning: CountryPicker: Support for defaultProps will be removed from function components in a future major release.",
  "Warning: CountryModal: Support for defaultProps will be removed from function components in a future major release.",
]);

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

const TabNavigatorHome = ({ navigation }: any) => (
  <Tab.Navigator
    initialRouteName={"HomeTab"}
    screenOptions={({ route }) => ({
      tabBarIcon: ({}) => {
        let icon;
        switch (route.name) {
          case "HomeTab":
            icon = <Ionicons name="home-outline" size={24} color={"green"} />;
            break;
          case "ChatTab":
            icon = (
              <Ionicons name="chatbox-outline" size={24} color={"green"} />
            );
            break;
          case "Logout":
            icon = <Ionicons name="log-out" size={24} color={"green"} />;
            break;
          case "NotificationTab":
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
      name="HomeTab"
      component={Home}
      options={{ header: () => <Header />, headerShown: true }}
    />
    <Tab.Screen
      name="ChatTab"
      component={Home}
      options={{ header: () => <Header />, headerShown: true, tabBarBadge: 2 }}
    />
    <Tab.Screen
      name="NotificationTab"
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
