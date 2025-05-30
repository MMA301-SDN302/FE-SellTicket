import { useEffect, useRef, useState } from "react";
import { View, Text, Alert, Keyboard, Image, SafeAreaView } from "react-native";
import RNAndroidOtpVerify from "react-native-otp-verify";
import { OtpInput, OtpInputRef } from "react-native-otp-entry";
import { styles } from "./Styles";
import { Props, ResendOtpResponse, VerifyOtpResponse } from "./Type";
import useApi from "../../../hooks/useApi";
import { ApiConstant } from "../../../data/ApiConstant";
import Button from "../../../components/Common/Button/Button";
import { useAuth } from "../../../hooks/useAuth";
import useToast from "../../../hooks/useToast";
const SignUpImg = require("../../../assets/Auth.png");

const VerifyOtp = ({ navigation, route }: Props) => {
  const [otp, setOtp] = useState("");
  const [hash, setHash] = useState("");
  const [messageCount, setMessageCount] = useState("Gửi lại OTP : 90s");
  const [androidDisabled, setAndroidDisabled] = useState(true);
  const androidRef = useRef<OtpInputRef>(null);
  const { mobilePhone, sendType } = route.params;
  const { saveUser } = useAuth();
  const { showToast } = useToast();
  const { fetchData } = useApi<VerifyOtpResponse>({
    method: "POST",
    url: ApiConstant.VerifyOTP,
  });
  const { fetchData: resendOtp } = useApi<ResendOtpResponse>({
    method: "POST",
    url: ApiConstant.ResendOTP,
  });

  const countDown = () => {
    let count = 90;
    const interval = setInterval(() => {
      count--;
      setMessageCount(`Gửi lại OTP : ${count}s`);
      if (count === 0) {
        setMessageCount("Gửi lại OTP");
        setAndroidDisabled(false);
        clearInterval(interval);
      }
    }, 1000);
  };

  // Hàm khởi tạo OTP listener
  useEffect(() => {
    RNAndroidOtpVerify.getHash().then((hash) => {
      console.log(hash);

      setHash(hash[0]); // Lưu hash key
    });

    RNAndroidOtpVerify.getOtp().then((p) =>
      RNAndroidOtpVerify.addListener(otpHandler)
    );

    countDown();
    return () => {
      RNAndroidOtpVerify.removeListener();
    };
  }, []);

  const otpHandler = (message: any) => {
    const match = /(\d{6})/g.exec(message);
    const code = match ? match[1] : "";
    setOtp(code);
    androidRef.current?.setValue(code);
    Keyboard.dismiss();
  };

  // Hàm xử lý khi nhấn nút xác nhận OTP
  const handleVerifyOtp = async () => {
    await fetchData({ otpNumber: otp, mobilePhone, sendType })
      .then((res) => {
        if (sendType === "SIGNUP") {
          saveUser(res);
          navigation.reset({
            index: 0,
            routes: [{ name: "HomeStack" }],
          });
        } else {
          navigation.navigate("ResetPassword", {
            mobilePhone: res.mobilePhone,
            userId: res.userId,
          });
        }
      })
      .catch((err) => {
        showToast({
          type: "error",
          message: "Xác Thực Thất bại",
          description: "Mã OTP không chính xác",
        });
      });
  };

  const handleResendOtp = () => {
    resendOtp({ mobilePhone, sendType })
      .then(() => {
        setAndroidDisabled(true);
        countDown();
      })
      .catch(() => {
        showToast({
          type: "error",
          message: "Gửi lại OTP thất bại",
          description: "Vui lòng thử lại sau",
        });
      });
  };

  return (
    <SafeAreaView
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Image style={styles.imageSignUp} source={SignUpImg} />
      <View style={styles.signUpContainer}>
        <View style={styles.titleWelcome}>
          <Text
            style={{
              color: "#000000",
              fontWeight: 500,
              fontSize: 32,
              marginTop: 20,
            }}
          >
            Nhập mã OTP
          </Text>
        </View>
        <OtpInput
          numberOfDigits={6}
          onTextChange={setOtp}
          type="numeric"
          ref={androidRef}
          textInputProps={{
            accessibilityLabel: "One-Time Password",
          }}
          theme={{ containerStyle: { marginTop: 50 } }}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Button
            buttonTitle={messageCount}
            onPress={handleResendOtp}
            buttonStyle={{
              marginTop: 60,
            }}
            disabled={androidDisabled}
          />
          <Button
            buttonTitle="Xác nhận OTP"
            onPress={handleVerifyOtp}
            buttonStyle={{
              marginTop: 60,
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default VerifyOtp;
