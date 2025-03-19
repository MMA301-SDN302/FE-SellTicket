import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { styles } from "./ChatStyle";
import type { StackNavigationProp } from "@react-navigation/stack";
import type {
  RootStackParamList,
} from "../../../types/NavigationTypes";
import { PreviewLayout } from "../../../components/PreviewLayout/PreviewLayout";
import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useSocketContext } from "../../../context/SocketContext";
import axios from "axios";

interface Conversation {
  _id: string;
  participants: Array<{
    _id: string;
    firstName: string;
    lastName: string;
    avatar: string;
    isOnline: boolean;
  }>;
  lastMessage: {
    _id: string;
    content: string;
    createdAt: string;
    read: boolean;
    senderId: string;
    receiverId: string;
  };
  updatedAt: string;
}

type ProfileProp = StackNavigationProp<RootStackParamList, "Chat">;

type Props = {
  navigation: ProfileProp;
};

const Chat: React.FC<Props> = ({ navigation }: Props) => {
  const { userInfo } = useAuth();
  const { socket, userOnline } = useSocketContext();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [filteredConversations, setFilteredConversations] = useState<Conversation[]>([]);

  // Fetch conversations from the backend
  useEffect(() => {
    const fetchConversations = async () => {
      if (!userInfo?.user?.userId) return;
      
      try {
        setLoading(true);
        // Use the correct API URL - make sure it matches your backend
        const response = await axios.get(
          `http://192.168.101.229:8080/v1/api/message/conversations/${userInfo.user.userId}`
        );
        
        if (response.data.metadata) {
          setConversations(response.data.metadata);
          setFilteredConversations(response.data.metadata);
        }
      } catch (error) {
        console.error("Error fetching conversations:", error);
        // Don't show alert for network errors in development
        // Alert.alert("Error", "Failed to load conversations");
        
        // Use empty array for conversations when there's an error
        setConversations([]);
        setFilteredConversations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
    
    // Listen for new messages to update conversation list
    if (socket) {
      socket.on("receiveMessage", (message) => {
        fetchConversations();
      });
      
      return () => {
        socket.off("receiveMessage");
      };
    }
  }, [userInfo, socket]);

  // Filter conversations based on search text
  useEffect(() => {
    if (searchText.trim() === "") {
      setFilteredConversations(conversations);
    } else {
      setFilteredConversations(
        conversations.filter((conv) => {
          // Find the other participant (not the current user)
          const otherParticipant = conv.participants.find(
            (p) => p._id !== userInfo?.user.userId
          );
          
          if (!otherParticipant) return false;
          
          const fullName = `${otherParticipant.firstName} ${otherParticipant.lastName}`.toLowerCase();
          return fullName.includes(searchText.toLowerCase());
        })
      );
    }
  }, [searchText, conversations, userInfo]);

  const renderItem = ({ item }: { item: Conversation }) => {
    // Find the other participant (not the current user)
    const otherParticipant = item.participants.find(
      (p) => p._id !== userInfo?.user.userId
    );
    
    if (!otherParticipant) return null;
    
    const isOnline = userOnline.includes(otherParticipant._id);
    const isMyLastMessage = item.lastMessage?.senderId === userInfo?.user.userId;
    
    return (
      <TouchableOpacity
        style={styles.chatItem}
        onPress={() => navigation.navigate("ChatDetail", { chatId: item._id })}
      >
        <View style={styles.avatarContainer}>
          <Image 
            source={{ 
              uri: otherParticipant.avatar || 
                "https://ui-avatars.com/api/?name=" + 
                encodeURIComponent(`${otherParticipant.firstName} ${otherParticipant.lastName}`)
            }} 
            style={styles.avatar} 
          />
          {isOnline && <View style={styles.onlineIndicator} />}
        </View>
        <View style={styles.chatInfo}>
          <Text style={styles.chatName}>
            {`${otherParticipant.firstName} ${otherParticipant.lastName}`}
          </Text>
          <Text style={styles.chatMessage} numberOfLines={1}>
            {isMyLastMessage ? "Bạn: " : ""}{item.lastMessage?.content || ""}
          </Text>
        </View>
        <Text style={styles.chatTime}>
          {item.lastMessage?.createdAt 
            ? new Date(item.lastMessage.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : ""}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <PreviewLayout
        label=""
        searchText={searchText}
        setSearchText={setSearchText}
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0c1440" />
          </View>
        ) : filteredConversations.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {searchText.trim() !== "" 
                ? "No conversations match your search" 
                : "No conversations yet"}
            </Text>
            {searchText.trim() === "" && (
              <TouchableOpacity 
                style={styles.startChatButton}
                onPress={() => navigation.navigate("ChatDetail", {})}
              >
                <Text style={styles.startChatButtonText}>Start a new chat</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <FlatList
            data={filteredConversations}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            contentContainerStyle={styles.chatList}
            onEndReachedThreshold={0.5}
            ItemSeparatorComponent={() => (
              <View style={{ height: 1, backgroundColor: "#eee" }} />
            )}
          />
        )}
      </PreviewLayout>
    </View>
  );
};

export default Chat;
