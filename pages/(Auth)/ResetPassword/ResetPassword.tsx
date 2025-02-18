import { Modal, View, Text, Alert, Button } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { styles } from "./ResetPasswordStyle";
import { useState } from "react";
import TextInputCommon from "../../../components/Common/TextInput/TextInputCommon";
import {
  CheckConfirmPassword,
  checkFormError,
  ValidatePassword,
} from "../../../utils";
import ButtonCommon from "../../../components/Common/Button/ButtonCommon";

interface ResetPasswordProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({
  modalVisible,
  setModalVisible,
}) => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showError, setShowError] = useState(false);
  const [errorMessConfirm, setErrorMessConfirm] = useState("");

  const CheckPassword = () => {
    const formHasError = checkFormError([
      ValidatePassword(password),
      ValidatePassword(newPassword),
      ValidatePassword(confirmPassword),
    ]);
    const error = CheckConfirmPassword(newPassword, confirmPassword);
    setErrorMessConfirm(error);
    if (formHasError || error !== "") {
      setShowError(true);
      return;
    }
    Alert.alert("Update success");
    Reset();
  };
  const Reset = () => {
    setShowError(false);
    setPassword("");
    setNewPassword("");
    setErrorMessConfirm("");
    setConfirmPassword("");
    setModalVisible(!modalVisible);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.header}>
                <Text style={styles.modalText}>ĐẶT LẠI MẬT KHẨU</Text>
                <Ionicons onPress={Reset} name="close" size={20} />
              </View>
              <>
                {/* Password */}
                <TextInputCommon
                  type={"password"}
                  placeholder="Nhập mật khẩu cũ"
                  errorName="Password"
                  required={true}
                  textTitle="Mật khẩu cũ"
                  minLength={6}
                  value={password}
                  onChangeText={setPassword}
                  fieldName={"password"}
                />
                {/* Password */}
                <TextInputCommon
                  type={"password"}
                  value={newPassword}
                  errorName="Password"
                  placeholder="Mật khẩu mới"
                  required={true}
                  minLength={6}
                  textTitle="Mật khẩu mới"
                  onChangeText={setNewPassword}
                  fieldName={""}
                />
                {/* Password */}
                <TextInputCommon
                  type={"password"}
                  value={confirmPassword}
                  errorName="Password"
                  required={true}
                  minLength={6}
                  textTitle="Nhập lại mật khẩu"
                  onChangeText={setConfirmPassword}
                  fieldName={""}
                />
              </>
              <View style={styles.buttonContinue}>
                <ButtonCommon
                  title="Đặt lại mật khẩu"
                  onPress={CheckPassword}
                />
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ResetPassword;
