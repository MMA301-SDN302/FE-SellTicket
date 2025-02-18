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
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Children } from "react";
import StackNavigator from "./route/StackNavigator";

LogBox.ignoreLogs([
  "Warning: Main: Support for defaultProps will be removed from function components in a future major release.",
  "Warning: CountryPicker: Support for defaultProps will be removed from function components in a future major release.",
  "Warning: CountryModal: Support for defaultProps will be removed from function components in a future major release.",
  "Warning: Main: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.",
  "VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.",
]);

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
