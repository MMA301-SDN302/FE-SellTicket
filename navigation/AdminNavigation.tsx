import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawerContent from "../pages/(Admin)/Dashboard/CustomDrawerContent";
import AdminPage from "../pages/(Admin)/Admin/AdminPage";
import ProductDashboard from "../pages/(Admin)/Dashboard/ProductDashboard";

const Drawer = createDrawerNavigator();

const AdminNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="AdminPage"
      drawerContent={(props) => <CustomDrawerContent navigation={props.navigation} />}
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="AdminPage" component={AdminPage} />
      <Drawer.Screen name="ProductDashboard" component={ProductDashboard} />
    </Drawer.Navigator>
  );
};

export default AdminNavigator;
