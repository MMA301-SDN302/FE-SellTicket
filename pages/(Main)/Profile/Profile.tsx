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

import type { RootStackParamList } from "../../../types/NavigationTypes";
import { styles } from "./ProfileStyle";
import { useRef, useState } from "react";
import TextInputCommon from "../../../components/Common/TextInput/TextInputCommon";
import {
  checkFormError,
  ValidateEmail,
  ValidateUserName,
} from "../../../utils";
import ResetPassword from "../../(Auth)/ResetPassword/ResetPassword";
const Person = require("../../../assets/favicon.png");

type ProfileProp = StackNavigationProp<RootStackParamList, "Profile">;

type Props = {
  navigation: ProfileProp;
};
const Profile: React.FC<Props> = ({ navigation }: Props) => {
  const [isPerson, setIsPerson] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("Male");
  const [userName, setUserName] = useState("Thanh Thủy");

  const phoneCurrent = useRef<PhoneInput>(null);

  const [showError, setShowError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [date, setDate] = useState(new Date(1598051730000));

  const Update = async () => {
    var formHasError = checkFormError([
      ValidateEmail(email),
      ValidateUserName(userName),
      phoneCurrent.current?.isValidNumber(phone) ? "" : "error",
    ]);

    if (formHasError) {
      setShowError(true);
    } else {
      Alert.alert("Update success");
      navigation.navigate("Home");
    }
  };
  return (
    <View style={{ width: "100%" }}>
      <ResetPassword
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={() => {}}>
          {isPerson ? (
            <Image source={Person} style={styles.avatarStyle} />
          ) : (
            <Ionicons name="person-circle" size={150} color={"gray"} />
          )}
        </TouchableOpacity>
        {/* UserName */}

        <TextInputCommon
          type={"name"}
          textTitle="Full name"
          value={userName}
          showError={showError}
          setValue={setUserName}
        />
        {/* Phone */}
        <TextInputCommon
          type={"phone"}
          textTitle="Phone number"
          value={phone}
          showError={showError}
          setValue={setPhone}
          phoneCurrent={phoneCurrent}
        />
        {/* Email */}
        <TextInputCommon
          type={"email"}
          textTitle="Email"
          value={email}
          setValue={setEmail}
          showError={showError}
        />
        <TextInputCommon
          type={"date"}
          textTitle="Day of birth"
          valueDate={date}
          setValueDate={setDate}
          showError={showError}
        />
        {/* Gender */}
        <View style={{ width: "100%" }}>
          <Text
            style={{
              color: "gray",
            }}
          >
            Gender
          </Text>
          <View style={styles.genderButton}>
            <TouchableOpacity
              style={[
                styles.buttonGender,
                gender === "Male" && styles.buttonActive,
              ]}
              onPress={() => setGender("Male")}
            >
              <Text
                style={
                  (styles.buttonText, gender === "Male" && { color: "#fff" })
                }
              >
                Male
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.buttonGender,
                gender === "Female" && styles.buttonActive,
              ]}
              onPress={() => setGender("Female")}
            >
              <Text
                style={
                  (styles.buttonText, gender === "Female" && { color: "#fff" })
                }
              >
                Female
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.buttonGender,
                gender === "Other" && styles.buttonActive,
              ]}
              onPress={() => setGender("Other")}
            >
              <Text
                style={
                  (styles.buttonText, gender === "Other" && { color: "#fff" })
                }
              >
                Other
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Update */}
        <View style={styles.buttonConfirm}>
          <Button title="Update" color="#4D5995" onPress={Update} />
        </View>
        <TouchableOpacity
          style={{ marginTop: 10 }}
          onPress={() => setModalVisible(true)}
        >
          <Text>Reset Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;
