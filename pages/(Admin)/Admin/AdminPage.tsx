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
import ProductDashboard from "../Dashboard/ProductDashboard";

const AdminPage = () => {
  const drawer = useRef<DrawerLayoutAndroid>(null);
  const [selectedScreen, setSelectedScreen] = useState<"Dashboard" | "Wallet" | "Audiences" | "GlobalReport" | "Settings">("Dashboard");

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
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => {
            setSelectedScreen("Dashboard");
            drawer.current?.closeDrawer();
          }}
        >
          <MaterialCommunityIcons name="view-grid" size={24} color="#4CAF50" />
          <Text style={styles.drawerText}>Dashboard</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => {
            setSelectedScreen("Wallet");
            drawer.current?.closeDrawer();
          }}
        >
          <MaterialCommunityIcons name="wallet" size={24} color="#333" />
          <Text style={styles.drawerText}>Wallet</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => {
            setSelectedScreen("Audiences");
            drawer.current?.closeDrawer();
          }}
        >
          <MaterialCommunityIcons name="account-group" size={24} color="#333" />
          <Text style={styles.drawerText}>Audiences</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => {
            setSelectedScreen("GlobalReport");
            drawer.current?.closeDrawer();
          }}
        >
          <MaterialCommunityIcons name="earth" size={24} color="#333" />
          <Text style={styles.drawerText}>Global Report</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => {
            setSelectedScreen("Settings");
            drawer.current?.closeDrawer();
          }}
        >
          <MaterialCommunityIcons name="cog" size={24} color="#333" />
          <Text style={styles.drawerText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition="left"
      renderNavigationView={navigationView}
    >
      {/* Header có icon menu bên trái AdminPage */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={() => drawer.current?.openDrawer()}>
          <MaterialCommunityIcons name="menu" size={30} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AdminPage</Text>
      </View>

      {/* Hiển thị nội dung theo mục được chọn */}
      <View style={styles.container}>
        <View style={styles.screenContainer}>
          {selectedScreen === "Dashboard" && (
            <View>
              <Text style={styles.title}>Dashboard Screen</Text>
              <ProductDashboard />
            </View>
          )}
          {selectedScreen === "Wallet" && (
            <Text style={styles.title}>Wallet Screen</Text>
          )}
          {selectedScreen === "Audiences" && (
            <Text style={styles.title}>Audiences Screen</Text>
          )}
          {selectedScreen === "GlobalReport" && (
            <Text style={styles.title}>Global Report Screen</Text>
          )}
          {selectedScreen === "Settings" && (
            <Text style={styles.title}>Settings Screen</Text>
          )}
        </View>
      </View>
    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  menuButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
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
});

export default AdminPage;
