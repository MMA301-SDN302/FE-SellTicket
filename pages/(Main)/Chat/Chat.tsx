import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { styles } from "./ChatStyle";
import type { StackNavigationProp } from "@react-navigation/stack";
import type {
  RootStackParamList,
  RootTabParamList,
} from "../../../types/NavigationTypes";
import { PreviewLayout } from "../../../components/PreviewLayout/PreviewLayout";

interface ChatScreenProps {
  id: string;
  name: string;
  mess: string;
  isYourMess?: boolean;
  time: Date;
  avatar: string;
}
type ProfileProp = StackNavigationProp<RootTabParamList, "Chat">;

type Props = {
  navigation: ProfileProp;
};
const chats: ChatScreenProps[] = [
  {
    id: "1",
    name: "Labubu",
    mess: "Haaaaaaaaaaaaaaaaa",
    isYourMess: true,
    time: new Date("2025-01-19T05:00"),
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoBUH1O99-G_i6GP5Ij4T4xca7w8pC-o3QWw&s",
  },
  {
    id: "2",
    name: "Anh",
    mess: "Hello, how are you?",
    isYourMess: false,
    time: new Date("2025-01-19T06:15"),
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3QOqpa4Po_LkiY7vW9IHIWWt0UV-bPUgXqg&s",
  },
  {
    id: "3",
    name: "Minh",
    mess: "Let's catch up later!",
    isYourMess: true,
    time: new Date("2025-01-18T23:30"),
    avatar: "https://nguoinoitieng.tv/images/nnt/105/0/biks.jpg",
  },
  {
    id: "4",
    name: "Linh",
    mess: "Don't forget the meeting tomorrow.",
    isYourMess: false,
    time: new Date("2025-01-19T08:00"),
    avatar:
      "https://png.pngtree.com/thumb_back/fh260/background/20210908/pngtree-mens-emoji-pack-crazy-emoticon-portraits-work-stressed-man-portrait-photography-image_821554.jpg",
  },
  {
    id: "5",
    name: "Phương",
    mess: "Can you send me the document?",
    isYourMess: true,
    time: new Date("2025-01-18T20:45"),
    avatar:
      "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/474053Auf/hinh-nguoi-that-dang-yeu_043419843.jpg",
  },
];

const Chat: React.FC<Props> = ({ navigation }: Props) => {
  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => navigation.navigate("ChatDetail", { chatId: item.id })}
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.chatInfo}>
        <Text style={styles.chatName}>{item.name}</Text>
        <Text style={styles.chatMessage} numberOfLines={1}>
          {item.isYourMess ? "Bạn:" : ""} {item.mess}
        </Text>
      </View>
      <Text style={styles.chatTime}>
        {item.time.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Text>
    </TouchableOpacity>
  );

  return (
    <PreviewLayout label="Chat">
      <View style={styles.container}>
        <FlatList
          data={chats}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.chatList}
          onEndReachedThreshold={0.5}
          ItemSeparatorComponent={() => (
            <View style={{ height: 1, backgroundColor: "gray" }} />
          )}
        />
      </View>
    </PreviewLayout>
  );
};

export default Chat;
