import { NavigationContainer } from "@react-navigation/native";
import "tailwindcss/tailwind.css";
import { AuthProvider } from "./context/AuthContext";
import StackNavigator from "./route/StackNavigator";
import { LogBox } from "react-native";
import ToastMessage from "./components/Common/ToastMessage/ToastMessage";
import { SpinnerProvider } from "./hooks/useSpinner";
import SpinnerLoading from "./components/Common/SpinLoading/SpinLoading";

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
      <SpinnerProvider>
        <NavigationContainer>
          <StackNavigator />
          <ToastMessage />
          <SpinnerLoading />
        </NavigationContainer>
      </SpinnerProvider>
    </AuthProvider>
  );
}
