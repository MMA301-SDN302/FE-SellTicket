import { AsyncStorageLocal } from "../utils/AsyncStorageLocal";
import Profile from "../pages/(Main)/Profile/Profile";
import MyTickets from "../pages/(Main)/MyTicket/MyTicket";
import Home from "../pages/(Main)/Home/Home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import type { RootTabParamList } from "../types/NavigationTypes";
import { Ionicons } from "@expo/vector-icons";
import { Header } from "../components/Header/Header";
import { Alert } from "react-native";
import { useAuth } from "../hooks/useAuth";

const Tab = createBottomTabNavigator<RootTabParamList>();
export function TabNavigatorHome({ navigation }: any) {
  const { logout, userInfo } = useAuth();
  return (
    <Tab.Navigator
      initialRouteName={"Trang chủ"}
      screenOptions={({ route }) => ({
        tabBarIcon: ({}) => {
          let icon;
          switch (route.name) {
            case "Trang chủ":
              icon = (
                <Ionicons name="home-outline" size={24} color={"#0c1440"} />
              );
              break;
            case "Vị trí":
              icon = (
                <Ionicons name="map-outline" size={24} color={"#0c1440"} />
              );
              break;
            case "Vé của tôi":
              icon = (
                <Ionicons name="ticket-outline" size={24} color={"#0c1440"} />
              );
              break;
            case "Trang cá nhân":
              icon = (
                <Ionicons name="person-outline" size={24} color={"#0c1440"} />
              );
              break;
            case "Đăng xuất":
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
        name="Trang chủ"
        component={Home}
        options={{ header: () => <Header />, headerShown: true }}
      />
      <Tab.Screen
        name="Vị trí"
        component={Home}
        options={{ header: () => <Header />, headerShown: true }}
      />
      {userInfo != undefined && (
        <>
          <Tab.Screen
            name="Vé của tôi"
            component={MyTickets}
            options={{ header: () => <Header />, headerShown: true }}
          />
          <Tab.Screen
            name="Trang cá nhân"
            component={Profile}
            options={{ header: () => <Header />, headerShown: true }}
          />

          <Tab.Screen
            name="Đăng xuất"
            component={() => null}
            listeners={{
              tabPress: (e) => {
                e.preventDefault();
                Alert.alert("Đăng xuất", "Bạn muốn đăng xuất?", [
                  { text: "Hủy", style: "cancel" },
                  {
                    text: "Đăng xuất",
                    onPress: async () => {
                      await AsyncStorageLocal.remove("user");
                      logout();
                      navigation.reset({
                        index: 0,
                        routes: [{ name: "SignIn" }],
                      });
                    },
                  },
                ]);
              },
            }}
          />
        </>
      )}
    </Tab.Navigator>
  );
}
