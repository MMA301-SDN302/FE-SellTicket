import { View, Button } from "react-native";
import type { StackNavigationProp } from "@react-navigation/stack";

import type { RootStackParamList } from "../../../types/NavigationTypes";
import { styles } from "./ProfileStyle";
type HomeProp = StackNavigationProp<RootStackParamList, "Profile">;

type Props = {
  navigation: HomeProp;
};
export const Profile = ({ navigation }: Props) => {
  const Logout = () => {
    {
      navigation.navigate("SignIn");
    }
  };

  return (
    <View style={styles.profileContainer}>
      <Button title="Log out" color="green" onPress={Logout} />
    </View>
  );
};

export default Profile;
