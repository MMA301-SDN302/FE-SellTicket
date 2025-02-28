import { View, Image, TouchableOpacity, Text } from "react-native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

import type { RootTabParamList } from "../../../types/NavigationTypes";
import { styles } from "./ProfileStyle";
import TextInputCommon from "../../../components/Common/TextInput/TextInputCommon";
import FormArea from "../../../components/Common/Form/FormArea";
import type { UserResponse } from "../../(Auth)/SignIn/Types";
import useToast from "../../../hooks/useToast";
import { useAuth } from "../../../hooks/useAuth";
import ChangePassword from "../ChangePassword/ChangePassword";

type ProfileProp = StackNavigationProp<RootTabParamList, "Trang cá nhân">;

type Props = {
  navigation: ProfileProp;
};

const Profile: React.FC<Props> = ({ navigation }) => {
  const { userInfo, setUserInfo } = useAuth();

  const [modalVisible, setModalVisible] = useState(false);
  const { showToast } = useToast();

  const Update = async (formdata: UserResponse) => {
    if (!formdata) {
      console.error("Dữ liệu cập nhật không hợp lệ");
      return;
    }

    setUserInfo((prevUserInfo: any) => ({
      ...prevUserInfo,
      ...formdata,
      userId: prevUserInfo?.userId || "",
    }));
    showToast({
      type: "success",
      message: "Cập nhật thành công",
    });
  };

  return (
    userInfo && (
      <View style={{ width: "100%" }}>
        <ChangePassword
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
        <View style={styles.profileContainer}>
          <FormArea
            onSubmit={Update}
            buttonTitle="Cập nhật"
            initialValues={{
              userId: userInfo?.user.userId,
              dateOfBirth: userInfo?.user.dateOfBirth,
              displayName: userInfo?.user.displayName,
              email: userInfo?.user.email,
              phoneNumber: userInfo?.user.phoneNumber,
              gender: userInfo?.user.gender,
              avatar: userInfo?.user.avatar,
            }}
          >
            <TouchableOpacity onPress={() => {}}>
              {userInfo.user.avatar ? (
                typeof userInfo.user.avatar === "string" ? (
                  <Image
                    source={{ uri: userInfo.user.avatar }}
                    style={styles.avatarStyle}
                  />
                ) : (
                  <Image
                    source={userInfo.user.avatar}
                    style={styles.avatarStyle}
                  />
                )
              ) : (
                <Ionicons name="person-circle" size={150} color={"gray"} />
              )}
            </TouchableOpacity>

            {/* UserName */}
            <TextInputCommon
              type="text"
              textTitle="Tên người dùng"
              fieldName="displayName"
              errorName="tên người dùng"
              value={userInfo?.user.displayName}
              required
            />
            {/* Phone */}
            <TextInputCommon
              type="phone"
              textTitle="Số điện thoại"
              fieldName="phoneNumber"
              value={userInfo?.user.phoneNumber}
              errorName="số điện thoại"
            />
            {/* Email */}
            <TextInputCommon
              type="email"
              textTitle="Email"
              fieldName="email"
              value={userInfo.user.email}
              errorName="email"
            />
            {/* Date of Birth */}
            <TextInputCommon
              type="date"
              textTitle="Ngày tháng năm sinh"
              value={
                userInfo.user.dateOfBirth
                  ? new Date(userInfo.user.dateOfBirth)
                      .toISOString()
                      .split("T")[0]
                  : ""
              }
              fieldName="dateOfBirth"
              errorName="ngày tháng năm sinh"
            />

            {/* Gender */}
            <TextInputCommon
              type={"checkbox"}
              fieldName="gender"
              checkBoxOptions={{
                type: "single",
                labels: [
                  {
                    title: "Nam",
                    value: "Male",
                  },
                  {
                    title: "Nữ",
                    value: "Female",
                  },
                  {
                    title: "Khác",
                    value: "Other",
                  },
                ],
                defaultValue: [userInfo?.user.gender],
              }}
            />
            {/* Update */}
          </FormArea>

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
