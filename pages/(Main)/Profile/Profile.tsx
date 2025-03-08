import { View, Image, TouchableOpacity, Text, Alert } from "react-native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";

import type { RootTabParamList } from "../../../types/NavigationTypes";
import { styles } from "./ProfileStyle";
import TextInputCommon from "../../../components/Common/TextInput/TextInputCommon";
import FormArea from "../../../components/Common/Form/FormArea";
import type { UserResponse } from "../../(Auth)/SignIn/Types";
import useToast from "../../../hooks/useToast";
import { useAuth } from "../../../hooks/useAuth";
import ChangePassword from "../ChangePassword/ChangePassword";
import useApi from "../../../hooks/useApi";
import { ApiConstant } from "../../../data/ApiConstant";
import ERROR_CODES from "../../../data/ErrorCode";
import type { ErrorResponse } from "../../../types/ApiTypes";
import * as ImagePicker from "expo-image-picker";
type ProfileProp = StackNavigationProp<RootTabParamList, "Trang cá nhân">;

type Props = {
  navigation: ProfileProp;
};

const Profile: React.FC<Props> = ({ navigation }) => {
  const { userInfo, setUserInfo } = useAuth();

  const [formValues, setFormValues] = useState<UserResponse>({
    userId: userInfo?.user.userId || "",
    phoneNumber: userInfo?.user.phoneNumber || "",
    displayName: userInfo?.user.displayName || "",
    gender: userInfo?.user.gender || null || "",
    dateOfBirth: userInfo?.user.dateOfBirth || null || "",
    avatar: userInfo?.user.avatar || null || "",
    email: userInfo?.user.email || null || "",
  });
  const [image, setImage] = useState<string | undefined | null>(
    formValues.avatar
  );

  const [modalVisible, setModalVisible] = useState(false);
  const { showToast } = useToast();
  const { fetchData } = useApi<UserResponse>({
    method: "PUT",
    url: `${ApiConstant.Profile}/${userInfo?.user.userId}`,
  });
  const Update = async (formdata: UserResponse) => {
    if (!formdata) {
      console.error("Dữ liệu cập nhật không hợp lệ");
      return;
    }

    if (image != undefined) {
      formdata.avatar = image;
    }
    let firstName = "";
    let lastName = "";

    const nameParts = formdata.displayName.trim().split(" ");

    if (nameParts.length > 1) {
      firstName = nameParts[0];
      lastName = nameParts[nameParts.length - 1];
    } else {
      firstName = nameParts[0];
    }

    await fetchData({
      firstName: firstName,
      lastName: lastName,
      email: formdata.email,
      sex: formdata.gender,
      dateOfBirth: formdata.dateOfBirth,
      phoneNumber: formdata.phoneNumber,
      avatar: formdata.avatar,
    })
      .then((res) => {
        showToast({
          type: "success",
          message: "Cập nhật thành công",
        });
        setFormValues(res);

        setUserInfo({
          user: res,
          token: userInfo?.token || { accessToken: "", refreshToken: "" },
        });
      })
      .catch((err: ErrorResponse) => {
        if (err.error_code === ERROR_CODES.MISSING_FIELD) {
          showToast({
            type: "error",
            message: "Thất bại",
            description: "Vui lòng nhập đầy đủ thông tin",
          });
        }
      });
  };
  const selectImageSource: any = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      showToast({
        type: "error",
        message: "Không thể truy cập máy ảnh",
        description: "Vui lòng cấp quyền sử dụng máy ảnh trong cài đặt.",
      });
      return;
    }
    Alert.alert("Chọn ảnh", "Bạn muốn chọn ảnh từ đâu?", [
      { text: "Thư viện", onPress: pickImageFromLibrary },
      { text: "Máy ảnh", onPress: pickImageFromCamera },
      { text: "Hủy", style: "cancel" },
    ]);
  };
  const pickImageFromLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const pickImageFromCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
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
            initialValues={formValues}
            disableChange={image === formValues.avatar}
          >
            <TouchableOpacity onPress={selectImageSource}>
              {image != "" && image != undefined ? (
                typeof userInfo.user.avatar === "string" ? (
                  <Image source={{ uri: image }} style={styles.avatarStyle} />
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
              required
            />
            {/* Phone */}
            <TextInputCommon
              type="phone"
              textTitle="Số điện thoại"
              fieldName="phoneNumber"
              errorName="số điện thoại"
              disable
            />
            {/* Email */}
            <TextInputCommon
              type="email"
              textTitle="Email"
              fieldName="email"
              errorName="email"
            />
            {/* Date of Birth */}
            <TextInputCommon
              type="date"
              textTitle="Ngày tháng năm sinh"
              value={userInfo.user.dateOfBirth}
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
                defaultValue: [userInfo.user.gender],
              }}
            />
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
