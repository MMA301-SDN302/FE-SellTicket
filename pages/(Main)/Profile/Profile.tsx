import {
  View,
  Image,
  TouchableOpacity,
  Button,
  Text,
  Alert,
} from "react-native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type PhoneInput from "react-native-phone-number-input";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";

import type { RootTabParamList } from "../../../types/NavigationTypes";
import { styles } from "./ProfileStyle";
import TextInputCommon from "../../../components/Common/TextInput/TextInputCommon";
import {
  checkFormError,
  ValidateEmail,
  ValidateUserName,
} from "../../../utils";
import ResetPassword from "../../(Auth)/ResetPassword/ResetPassword";
import { useAuth } from "../../../context/AuthContext";
import ButtonCommon from "../../../components/Common/Button/ButtonCommon";

type ProfileProp = StackNavigationProp<RootTabParamList, "Trang cá nhân">;

type Props = {
  navigation: ProfileProp;
};

const Profile: React.FC<Props> = ({ navigation }) => {
  const { userInfo } = useAuth();

  const [email, setEmail] = useState(userInfo?.email || "");
  const [phone, setPhone] = useState(userInfo?.phoneNumber || "");
  const [gender, setGender] = useState(userInfo?.gender || "Male");
  const [userName, setUserName] = useState(userInfo?.displayName || "");
  const [date, setDate] = useState(new Date());

  const phoneCurrent = useRef<PhoneInput>(null);
  const [showError, setShowError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // Cập nhật state khi `userInfo` thay đổi
  useEffect(() => {
    if (userInfo) {
      setEmail(userInfo.email || "");
      setPhone(userInfo.phoneNumber || "");
      setGender(userInfo.gender || "Male");
      setUserName(userInfo.displayName || "");
    }
  }, [userInfo]);

  const Update = async () => {
    const formHasError = checkFormError([
      ValidateEmail(email),
      ValidateUserName(userName),
      phoneCurrent.current?.isValidNumber(phone) ? "" : "error",
    ]);

    if (formHasError) {
      setShowError(true);
    } else {
      Alert.alert("Update success");
      navigation.navigate("Trang chủ");
    }
  };

  return (
    userInfo && (
      <View style={{ width: "100%" }}>
        <ResetPassword
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
        <View style={styles.profileContainer}>
          <TouchableOpacity onPress={() => {}}>
            {userInfo.avatar ? (
              <Image
                source={{ uri: userInfo.avatar }}
                style={styles.avatarStyle}
              />
            ) : (
              <Ionicons name="person-circle" size={150} color={"gray"} />
            )}
          </TouchableOpacity>

          {/* UserName */}
          <TextInputCommon
            type="text"
            textTitle="Tên người dùng"
            value={userName}
            onChangeText={setUserName}
            fieldName=""
            errorName="text"
          />
          {/* Phone */}
          <TextInputCommon
            type="phone"
            textTitle="Số điện thoại"
            value={phone}
            onChangeText={setPhone}
            fieldName=""
            errorName="Phone number"
          />
          {/* Email */}
          <TextInputCommon
            type="email"
            textTitle="Email"
            value={email}
            onChangeText={setEmail}
            fieldName=""
            errorName=""
          />
          {/* Date of Birth */}
          <TextInputCommon
            type="date"
            textTitle="Ngày tháng năm sinh"
            value={date.toISOString().split("T")[0]}
            onChangeText={(text) => setDate(new Date(text))}
            fieldName=""
            errorName=""
          />
          {/* Gender */}
          <View style={{ width: "100%" }}>
            <Text style={{ color: "gray" }}>Giới tính</Text>
            <View style={styles.genderButton}>
              {["Nam", "Nữ", "Khác"].map((g) => (
                <TouchableOpacity
                  key={g}
                  style={[
                    styles.buttonGender,
                    gender === g && styles.buttonActive,
                  ]}
                  onPress={() => setGender(g)}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      gender === g && { color: "#fff" },
                    ]}
                  >
                    {g}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          {/* Update */}
          <View style={styles.buttonConfirm}>
            <ButtonCommon title="Cập nhật" onPress={Update} />
          </View>
          <TouchableOpacity
            style={{ marginTop: 10 }}
            onPress={() => setModalVisible(true)}
          >
            <Text>Đặt lại mật khẩu</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  );
};

export default Profile;
