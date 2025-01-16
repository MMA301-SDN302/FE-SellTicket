import type { StackNavigationProp } from "@react-navigation/stack";
import { View, Text } from "react-native";

import type { RootStackParamList } from "../../../types/NavigationTypes";
import { styles } from "./HomeStyle";
type HomeProp = StackNavigationProp<RootStackParamList, "Home">;

type Props = {
  navigation: HomeProp;
};

export const Home = ({ navigation }: Props) => {
  return (
    <View style={styles.homeContainer}>
      <Text>Home</Text>
    </View>
  );
};

export default Home;
