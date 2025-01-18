import { Modal, View, Text, Alert, Button } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./ResetPasswordStyle";
import { useState } from "react";
import TextInputCommon from "../../../components/TextInputCommon/TextInputCommon";
import { Ionicons } from "@expo/vector-icons";
import { CheckConfirmPassword, checkFormError } from "../../../utils";

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
  const [isError, setIsError] = useState(true);
  const [errorMessConfirm, setErrorMessConfirm] = useState("");

  const CheckPassword = () => {
    var formHasError = checkFormError(
      [password, newPassword, confirmPassword],
      isError
    );
    if (formHasError) {
      setShowError(true);
    } else {
      const error = CheckConfirmPassword(newPassword, confirmPassword);
      setErrorMessConfirm(error);
      if (error != "") {
        setShowError(true);
      } else {
        Alert.alert("Update success");
        Reset();
      }
    }
  };
  const Reset = () => {
    setIsError(true);
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
                <Text style={styles.modalText}>RESET PASSWORD</Text>
                <Ionicons onPress={Reset} name="close" size={20} />
              </View>
              <>
                {/* Password */}
                <TextInputCommon
                  type={"password"}
                  value={password}
                  setValue={setPassword}
                  showError={showError}
                  placeholder={"Input old password"}
                  textTitle="Old password"
                  setIsError={setIsError}
                />
                {/* Password */}
                <TextInputCommon
                  type={"password"}
                  value={newPassword}
                  setValue={setNewPassword}
                  showError={showError}
                  placeholder={"Input password"}
                  textTitle="New password"
                  setIsError={setIsError}
                />
                {/* Password */}
                <TextInputCommon
                  type={"password"}
                  value={confirmPassword}
                  setValue={setConfirmPassword}
                  showError={showError}
                  placeholder={"Input password"}
                  textTitle="Confirm new password"
                  setIsError={setIsError}
                  newError={errorMessConfirm}
                />
              </>
              <View style={styles.buttonContinue}>
                <Button
                  title="Reset password"
                  color="#4D5995"
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
