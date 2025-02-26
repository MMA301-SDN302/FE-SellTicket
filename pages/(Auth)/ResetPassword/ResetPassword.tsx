import { Modal, View, Text } from "react-native";
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
import FormArea from "../../../components/Common/Form/FormArea";
import type { ResetPasswordValues } from "../SignIn/Types";
import useToast from "../../../hooks/useToast";

interface ResetPasswordProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({
  modalVisible,
  setModalVisible,
}) => {
  const { showToast } = useToast();

  const [formValues, setFormValues] = useState<ResetPasswordValues>({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const CheckPassword = (formdata: ResetPasswordValues) => {
    const formHasError = checkFormError([
      ValidatePassword(formdata.password),
      ValidatePassword(formdata.newPassword),
      ValidatePassword(formdata.confirmPassword),
    ]);
    const error = CheckConfirmPassword(
      formdata.newPassword,
      formdata.confirmPassword
    );
    showToast({
      type: "success",
      message: "Cập nhật mật khẩu thành công",
    });
    Reset(formdata);
  };

  const Reset = async (formdata: ResetPasswordValues) => {
    setFormValues(formdata);
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
                <Ionicons
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                  name="close"
                  size={20}
                />
              </View>
              <FormArea
                initialValues={formValues}
                onSubmit={CheckPassword}
                buttonTitle="Đặt lại mật khẩu"
                wrapStyle={{
                  gap: 20,
                }}
              >
                <TextInputCommon
                  type={"password"}
                  placeholder="Nhập mật khẩu cũ"
                  errorName="Password"
                  required={true}
                  textTitle="Mật khẩu cũ"
                  minLength={6}
                  value={formValues.password}
                  fieldName={"password"}
                />
                {/* Password */}
                <TextInputCommon
                  type={"password"}
                  value={formValues.newPassword}
                  errorName="Password"
                  placeholder="Mật khẩu mới"
                  required={true}
                  minLength={6}
                  textTitle="Mật khẩu mới"
                  fieldName={"newPassword"}
                />
                {/* Password */}
                <TextInputCommon
                  type={"password"}
                  value={formValues.confirmPassword}
                  errorName="Password"
                  required={true}
                  minLength={6}
                  textTitle="Nhập lại mật khẩu"
                  fieldName={"confirmPassword"}
                />
              </FormArea>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ResetPassword;
