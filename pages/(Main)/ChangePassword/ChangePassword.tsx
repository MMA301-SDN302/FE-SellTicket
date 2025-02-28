import React from "react";

import { Modal, View, Text, Alert, Button } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { styles } from "./ChangePasswordStyle";
import { useState } from "react";
import TextInputCommon from "../../../components/Common/TextInput/TextInputCommon";
import {
  CheckConfirmPassword,
  checkFormError,
  ValidatePassword,
} from "../../../utils";
import ButtonCommon from "../../../components/Common/Button/ButtonCommon";
import FormArea from "../../../components/Common/Form/FormArea";
import useToast from "../../../hooks/useToast";
import useApi from "../../../hooks/useApi";
import { ApiConstant } from "../../../data/ApiConstant";

interface ChangePasswordProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({
  modalVisible,
  setModalVisible,
}) => {
  const handleResetPassword = (value: any) => {
    Alert.alert("Update success");
    Reset();
  };

  const Reset = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.header}>
                <Text style={styles.modalText}>THAY ĐỔI MẬT KHẨU</Text>
                <Ionicons onPress={Reset} name="close" size={32} />
              </View>
              <FormArea
                initialValues={{
                  password: "",
                  newPassword: "",
                  confirmPassword: "",
                }}
                onSubmit={handleResetPassword}
                buttonTitle="Thay đổi mật khẩu"
              >
                {/* Password */}
                <TextInputCommon
                  type={"password"}
                  placeholder="Nhập mật khẩu cũ"
                  errorName="Mật khẩu cũ"
                  required={true}
                  minLength={8}
                  fieldName={"password"}
                />
                {/* Password */}
                <TextInputCommon
                  type={"password"}
                  placeholder="Nhập mật khẩu mới"
                  errorName="Mật khẩu mới"
                  required={true}
                  minLength={8}
                  fieldName={"newPassword"}
                />
                {/* Password */}
                <TextInputCommon
                  type={"password"}
                  placeholder="Nhập lại mật khẩu"
                  errorName="Mật khẩu"
                  required={true}
                  minLength={8}
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

export default ChangePassword;
