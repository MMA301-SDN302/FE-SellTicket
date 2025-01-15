import { NavigationContainer } from "@react-navigation/native";
import { SignIn } from "./pages/SignIn/SignIn";
import type { RootStackParamList } from "./types/NavigationTypes";
import { createStackNavigator } from "@react-navigation/stack";
import { SignUp } from "./pages/SignUp/SignUp";

const Stack = createStackNavigator<RootStackParamList>();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
