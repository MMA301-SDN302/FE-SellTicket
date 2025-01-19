import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { styles } from "./ChatDetailStyle";

const ChatDetail = () => {
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Xin chào nhà xe XXX, giúp gì được cho bạn?",
      sender: "bus",
      time: "10:00",
    },
    {
      id: "2",
      text: "Tôi muốn đặt vé lúc 10h.",
      sender: "me",
      time: "10:01",
    },
    {
      id: "3",
      text: "Bạn muốn đặt vé cho ngày nào?",
      sender: "bus",
      time: "10:02",
    },
    {
      id: "4",
      text: "Ngày mai, 20/01/2025.",
      sender: "me",
      time: "10:03",
    },
    {
      id: "5",
      text: "Chuyến xe đi từ đâu đến đâu vậy bạn?",
      sender: "bus",
      time: "10:04",
    },
    {
      id: "6",
      text: "Từ Hà Nội đến Hải Phòng.",
      sender: "me",
      time: "10:05",
    },
    {
      id: "7",
      text: "Vâng, để mình kiểm tra. Bạn cần mấy vé?",
      sender: "bus",
      time: "10:06",
    },
    {
      id: "8",
      text: "Hai vé, vui lòng cho mình biết giá vé luôn nhé.",
      sender: "me",
      time: "10:07",
    },
    {
      id: "9",
      text: "Giá vé là 120.000đ/vé. Tổng cộng là 240.000đ.",
      sender: "bus",
      time: "10:08",
    },
    {
      id: "10",
      text: "Cảm ơn bạn, mình sẽ đặt luôn nhé.",
      sender: "me",
      time: "10:09",
    },
    {
      id: "11",
      text: "Vâng, đã đặt thành công. Chúc bạn một chuyến đi vui vẻ!",
      sender: "bus",
      time: "10:10",
    },
    {
      id: "12",
      text: "Cảm ơn, mình nhận vé bằng cách nào?",
      sender: "me",
      time: "10:11",
    },
    {
      id: "13",
      text: "Bạn có thể nhận vé tại văn phòng hoặc chúng tôi gửi qua email nhé.",
      sender: "bus",
      time: "10:12",
    },
    {
      id: "14",
      text: "Gửi qua email cho mình nhé. Email của mình là abc@gmail.com.",
      sender: "me",
      time: "10:13",
    },
    {
      id: "15",
      text: "Vâng, mình đã ghi nhận. Vé sẽ được gửi trong vòng 5 phút.",
      sender: "bus",
      time: "10:14",
    },
    {
      id: "16",
      text: "Cảm ơn nhiều, mình sẽ kiểm tra email.",
      sender: "me",
      time: "10:15",
    },
    {
      id: "17",
      text: "Ngoài ra, bạn có cần hỗ trợ gì thêm không?",
      sender: "bus",
      time: "10:16",
    },
    {
      id: "18",
      text: "Hiện tại không, cảm ơn nhé!",
      sender: "me",
      time: "10:17",
    },
    {
      id: "19",
      text: "Rất hân hạnh được phục vụ. Hẹn gặp lại!",
      sender: "bus",
      time: "10:18",
    },
  ]);

  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: Date.now().toString(),
          text: text.trim(),
          sender: "me",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      setText("");
    }
  };

  const renderMessage = ({ item }: any) => (
    <View
      style={[
        styles.messageBubble,
        item.sender === "me" ? styles.myMessage : styles.otherMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
      <Text style={styles.messageTime}>{item.time}</Text>
    </View>
  );
  const Person = require("../../assets/favicon.png");

  const refFlatList = useRef<FlatList>(null);
  useEffect(() => {
    refFlatList.current?.scrollToEnd();
  }, [messages]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={Person} style={styles.img} />
        <Text style={styles.headerText}>Nhà xe XXX</Text>
      </View>
      <FlatList
        ref={refFlatList}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatContainer}
        initialScrollIndex={messages.length - 1}
        getItemLayout={(data, index) => ({
          length: 100,
          offset: 100 * index,
          index,
        })}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Nhập tin nhắn..."
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Ionicons name="send" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatDetail;
