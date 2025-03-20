import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  DrawerLayoutAndroid,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/commonjs/src/types";

interface CustomDrawerContentProps {
  navigation: DrawerNavigationHelpers;
}
const CustomDrawerContent: React.FC<CustomDrawerContentProps> = ({ navigation }) => {
  const drawer = useRef<DrawerLayoutAndroid>(null);
  const [drawerPosition, setDrawerPosition] = useState<"left" | "right">("left");

  const navigationView = () => (
    <View style={styles.drawerContainer}>
      {/* Header của Drawer */}
      <View style={styles.drawerHeader}>
        <Image
          source={{ uri: "https://your-logo-url.com/logo.png" }}
          style={styles.logo}
        />
        <Text style={styles.headerText}>Fast Ticket</Text>
      </View>

      {/* Các mục điều hướng */}
      <View style={styles.menuSection}>
        <TouchableOpacity style={styles.drawerItem} onPress={() => drawer.current?.closeDrawer()}>
          <MaterialCommunityIcons name="view-grid" size={24} color="#4CAF50" />
          <Text style={styles.drawerText}>Overview</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.drawerItem} onPress={() => drawer.current?.closeDrawer()}>
          <MaterialCommunityIcons name="wallet" size={24} color="#333" />
          <Text style={styles.drawerText}>Wallet</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.drawerItem} onPress={() => drawer.current?.closeDrawer()}>
          <MaterialCommunityIcons name="account-group" size={24} color="#333" />
          <Text style={styles.drawerText}>Audiences</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.drawerItem} onPress={() => drawer.current?.closeDrawer()}>
          <MaterialCommunityIcons name="earth" size={24} color="#333" />
          <Text style={styles.drawerText}>Global Report</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.drawerItem} onPress={() => drawer.current?.closeDrawer()}>
          <MaterialCommunityIcons name="cog" size={24} color="#333" />
          <Text style={styles.drawerText}>Settings</Text>
        </TouchableOpacity>
      </View>

      {/* Nút Logout */}
      <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={() => drawer.current?.closeDrawer()}>
          <MaterialCommunityIcons name="logout" size={24} color="red" />
          <Text style={styles.logoutText}>LogOut</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition={drawerPosition}
      renderNavigationView={navigationView}
    >

      <View style={styles.container}>
        <TouchableOpacity style={styles.openButton} onPress={() => drawer.current?.openDrawer()}>
          <MaterialCommunityIcons name="menu" size={30} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.mainText}>Welcome to Fast Ticket Admin</Text>
      </View>
    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  openButton: {
    position: "absolute",
    top: 40,
    left: 20,
    padding: 10,
    backgroundColor: "#4CAF50",
    borderRadius: 50,
  },
  mainText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  drawerContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  drawerHeader: {
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingBottom: 10,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
  },
  menuSection: {
    marginTop: 10,
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  drawerText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#333",
  },
  logoutContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  logoutText: {
    marginLeft: 10,
    color: "red",
    fontSize: 16,
  },
});

export default CustomDrawerContent;
