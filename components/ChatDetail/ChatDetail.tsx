import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSocketContext } from "../../context/SocketContext";
import { useAuth } from "../../hooks/useAuth";
import { styles } from "./ChatDetailStyle";

// Define message interface to match backend structure
interface Message {
  _id?: string;
  senderId: string | {
    _id: string;
    firstName: string;
    lastName: string;
    avatar: string;
    isOnline: boolean;
  };
  receiverId: string | {
    _id: string;
    firstName: string;
    lastName: string;
    avatar: string;
    isOnline: boolean;
  };
  content: string;
  read?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

const ChatDetail = ({ route }: any) => {
  const { socket, userOnline, connecting } = useSocketContext();
  const { userInfo } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [adminId, setAdminId] = useState(""); // Will store the actual admin ID
  const [isInitialized, setIsInitialized] = useState(false);
  const [initializing, setInitializing] = useState(false);
  
  const refFlatList = useRef<FlatList>(null);

  // Helper function to get ID from sender/receiver object or string
  const getId = (entity: any): string => {
    if (!entity) return "";
    if (typeof entity === "string") return entity;
    return entity._id || "";
  };

  // Helper function to get name from sender/receiver object
  const getName = (entity: any): string => {
    if (!entity) return "Unknown";
    if (typeof entity === "string") return "Unknown";
    return `${entity.firstName || ""} ${entity.lastName || ""}`.trim() || "Unknown";
  };

  // Helper function to get avatar from sender/receiver object
  const getAvatar = (entity: any): string => {
    if (!entity) return "";
    if (typeof entity === "string") return "";
    if (entity.avatar) return entity.avatar;
    
    // Generate avatar from name if no avatar is available
    const name = `${entity.firstName || ""} ${entity.lastName || ""}`.trim();
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;
  };

  // Initialize conversation and load messages
  useEffect(() => {
    if (!socket || !userInfo?.user?.userId || isInitialized || initializing) return;

    const initializeChat = async () => {
      try {
        setInitializing(true);
        
        // Initialize conversation
        socket.emit("initConversation", { 
          userId: userInfo.user.userId,
        });
        
        // Request message history
        socket.emit("loadMessages", { 
          senderId: userInfo.user.userId,
          receiverId: adminId || "admin" // Use a default if we don't have an admin ID yet
        });
        
        setIsInitialized(true);
      } catch (error) {
        console.error("Error initializing chat:", error);
      } finally {
        setInitializing(false);
      }
    };

    initializeChat();
  }, [socket, userInfo, adminId, isInitialized, initializing]);

  // Set up socket event listeners
  useEffect(() => {
    if (!socket) return;

    // Listen for incoming messages
    const handleReceiveMessage = (newMessage: Message) => {
      console.log("Received message:", newMessage);
      
      // If this is the first message from an admin, save their ID
      const senderId = getId(newMessage.senderId);
      if (senderId !== userInfo?.user?.userId && !adminId) {
        setAdminId(senderId);
      }
      
      // Mark message as read if we received it
      if (senderId !== userInfo?.user?.userId && newMessage._id && !newMessage.read) {
        socket.emit("markMessageAsRead", { messageId: newMessage._id });
      }
      
      setMessages((prevMessages) => {
        // More robust duplicate detection - check by ID and also by content/time if needed
        const isDuplicate = prevMessages.some(msg => 
          // Check if the ID matches (for server-generated messages)
          (msg._id && msg._id === newMessage._id) ||
          // Or check content and approximate timestamp for messages without matching IDs
          (msg.content === newMessage.content && 
           senderId === getId(msg.senderId) && 
           // If timestamps exist, check if they're within 2 seconds of each other
           (msg.createdAt && newMessage.createdAt && 
            Math.abs(new Date(msg.createdAt).getTime() - new Date(newMessage.createdAt).getTime()) < 2000))
        );
        
        if (isDuplicate) {
          console.log("Detected duplicate message, ignoring");
          return prevMessages;
        }
        
        return [...prevMessages, newMessage];
      });
    };
    
    // Handle message history loading
    const handleLoadMessages = (oldMessages: Message[]) => {
      console.log("Loaded messages:", oldMessages);
      
      // If we have messages and don't have an admin ID yet, try to get it
      if (oldMessages.length > 0 && !adminId) {
        const adminMessage = oldMessages.find(msg => getId(msg.senderId) !== userInfo?.user?.userId);
        if (adminMessage) {
          setAdminId(getId(adminMessage.senderId));
        }
      }
      
      setMessages(oldMessages);
    };
    
    // Handle message read status updates
    const handleMessageRead = ({ messageId }: { messageId: string }) => {
      setMessages(prevMessages => 
        prevMessages.map(msg => 
          msg._id === messageId ? { ...msg, read: true } : msg
        )
      );
    };
    
    // Handle errors
    const handleMessageError = (error: any) => {
      console.error("Socket error:", error);
      Alert.alert("Error", error.error || "An error occurred");
    };

    socket.on("receiveMessage", handleReceiveMessage);
    socket.on("loadMessages", handleLoadMessages);
    socket.on("messageRead", handleMessageRead);
    socket.on("messageError", handleMessageError);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
      socket.off("loadMessages", handleLoadMessages);
      socket.off("messageRead", handleMessageRead);
      socket.off("messageError", handleMessageError);
    };
  }, [socket, adminId, userInfo]);

  const handleSend = () => {
    if (!text.trim() || !socket || !userInfo?.user?.userId) return;
    
    setLoading(true);
    
    const newMessage: Message = {
      senderId: userInfo.user.userId,
      receiverId: adminId || "admin", 
      content: text.trim(),
    };

    // Send message to server
    socket.emit("sendMessage", newMessage);
    
    // Add optimistic message to UI
    const clientMessage = {
      ...newMessage,
      _id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      read: false
    };
    
    setMessages((prevMessages) => [...prevMessages, clientMessage]);
    setText("");
    
    // Clear loading state after a short delay
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isMine = getId(item.senderId) === userInfo?.user?.userId;
    
    return (
      <View
        style={[
          styles.messageBubble,
          isMine ? styles.myMessage : styles.otherMessage,
        ]}
      >
        <Text style={[
          styles.messageText,
          !isMine && styles.otherMessageText
        ]}>
          {item.content}
        </Text>
        <Text style={[
          styles.messageTime,
          !isMine && styles.otherMessageTime
        ]}>
          {item.createdAt 
            ? new Date(item.createdAt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
              }) 
            : new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
              })}
        </Text>
        {isMine && (
          <Text style={styles.readStatus}>
            {item.read ? "Read" : "Sent"}
          </Text>
        )}
      </View>
    );
  };

  useEffect(() => {
    // Scroll to bottom when messages change
    if (messages.length > 0) {
      setTimeout(() => {
        refFlatList.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  // Get admin info if available
  const getAdminInfo = () => {
    const adminMessage = messages.find(msg => getId(msg.senderId) !== userInfo?.user?.userId);
    if (adminMessage && typeof adminMessage.senderId !== 'string') {
      return {
        name: getName(adminMessage.senderId),
        avatar: getAvatar(adminMessage.senderId)
      };
    }
    return {
      name: "Nhà xe FastTicket",
      avatar: ""
    };
  };

  const adminInfo = getAdminInfo();
  const isAdminOnline = adminId ? userOnline.includes(adminId) : false;
  const defaultAvatar = require("../../assets/favicon.png");

  if (connecting || initializing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0c1440" />
        <Text style={{ marginTop: 10 }}>
          {connecting ? "Connecting to chat server..." : "Loading chat..."}
        </Text>
      </View>
    );
  }

  if (!socket) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ marginBottom: 15, textAlign: 'center' }}>
          Could not connect to chat server. Please check your connection.
        </Text>
        <TouchableOpacity 
          style={styles.startChatButton}
          onPress={() => setIsInitialized(false)}
        >
          <Text style={styles.startChatButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image 
            source={adminInfo.avatar ? { uri: adminInfo.avatar } : defaultAvatar} 
            style={styles.img} 
          />
          <View>
            <Text style={styles.headerText}>{adminInfo.name}</Text>
            <Text style={[
              styles.statusText, 
              { color: isAdminOnline ? "green" : "#999" }
            ]}>
              {isAdminOnline ? "Online" : "Offline"}
            </Text>
          </View>
        </View>
      </View>

      {messages.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            No messages yet. Start a conversation!
          </Text>
        </View>
      ) : (
        <FlatList
          ref={refFlatList}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item._id || Date.now().toString()}
          contentContainerStyle={styles.chatContainer}
          removeClippedSubviews={false}
        />
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Nhập tin nhắn..."
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity 
          style={[
            styles.sendButton,
            (!text.trim() || loading) && { opacity: 0.7 }
          ]} 
          onPress={handleSend}
          disabled={loading || !text.trim()}
        >
          {loading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Ionicons name="send" size={20} color="#fff" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatDetail;
