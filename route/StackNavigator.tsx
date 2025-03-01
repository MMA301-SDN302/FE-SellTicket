import { createStackNavigator } from "@react-navigation/stack";
import type { RootStackParamList } from "../types/NavigationTypes";
import { Header } from "../components/Header/Header";
import { SignIn } from "../pages/(Auth)/SignIn/SignIn";
import Chat from "../pages/(Main)/Chat/Chat";
import ChatDetail from "../components/ChatDetail/ChatDetail";
import { SignUp } from "../pages/(Auth)/SignUp/SignUp";
import ForgotPassword from "../pages/(Auth)/ForgotPassword/ForgotPassword";
import Booking from "../pages/(Main)/Booking/Booking";
import PlaceOrder from "../pages/(Main)/PlaceOrder/PlaceOrder";
import { Notification } from "../pages/(Main)/Notification/Notification";
import { TabNavigatorHome } from "./TabNavigator";
import RoutePage from "../pages/(Main)/Route/Route";
import ResetPassword from "../pages/(Auth)/ResetPassword/ResetPassword";
import VerifyOtp from "../pages/(Auth)/VerifyOtp/VerifyOtp";

const Stack = createStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  return (
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
      {/* <Stack.Screen
        name="OtpVerify"
        component={VerifyOtp}
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
