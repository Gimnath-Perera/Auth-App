import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import Toast from "react-native-toast-message";
import { OTP } from "react-native-otp-form";

import { BASE_URL } from "../common/contants";

const OTPScreen = ({ navigation, route }) => {
  const { otpId } = route?.params;

  const formikRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const onLoginSubmit = async (otp) => {
    console.log(">>===>> >>===>> otp", otp);
    if (!otp) return;
    try {
      setIsLoading(true);
      const respone = await axios.post(`${BASE_URL}/api/auth/verify-otp`, {
        otpId: otpId,
        otpCode: otp,
      });

      setIsLoading(false);
      if (respone?.data?.data?.success) {
        showSuccessToast();
        formikRef.current?.resetForm();
        navigation.navigate("HomeScreen");
      } else {
        showErrorOtpToast();
      }
    } catch (err) {
      showErrorOtpToast();
      setIsLoading(false);
    }
  };

  const showSuccessToast = () => {
    Toast.show({
      type: "success",
      text1: "Success",
      text2: "User credential vaidated successfully",
    });
  };

  const showErrorOtpToast = () => {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "Invalid OTP",
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.boxConatiner}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Please Enter your OTP</Text>
          </View>
          {isLoading ? (
            <ActivityIndicator size="large" color="#0782F9" />
          ) : (
            <OTP
              codeCount={6}
              containerStyle={{ marginTop: 50 }}
              otpStyles={[styles.otpInput, styles.focusInput]}
              onFinish={(val) => onLoginSubmit(val)}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  subContainer: {
    marginHorizontal: 25,
  },
  socialButtonConatiner: {
    paddingTop: 10,
    display: "flex",
    flexDirection: "row",
  },
  socialButton: {
    width: "10%",
    elevation: 8,
    backgroundColor: "#29b4cb",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 5,
  },
  boxConatiner: {
    padding: 15,
    borderRadius: 10,
  },
  buttonContainer: {
    paddingTop: 25,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    elevation: 8,
    backgroundColor: "#29b4cb",
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: "50%",
    marginBottom: 15,
    marginTop: 15,
  },
  buttonText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  headerContainer: {
    textAlign: "center",
  },
  header: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 26,
    color: "#051d5f",
  },
  avatar: {
    width: 64,
    alignSelf: "center",
    height: 64,
    marginTop: 15,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: "90%",
    borderColor: "#29b4cb",
    borderRadius: 10,
    backgroundColor: "#001220",
    color: "#fff",
  },
  loginText: {
    color: "#fff",
  },
  subHeaderText: {
    color: "#EBEDF0",
    fontSize: 12,
    alignSelf: "center",
  },
  registerText: {
    color: "#fff",
    alignSelf: "center",
    marginTop: 15,
  },
  linkText: {
    color: "#20B182",
  },
  linkContainer: {
    flexDirection: "row",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  logo: {
    width: "70%",
    alignSelf: "center",
    height: 150,
    marginTop: 15,
  },
  inputError: { borderWidth: 1, borderColor: "red" },
  errorText: {
    paddingLeft: 15,
    color: "red",
    fontSize: 12,
  },
  field: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
  },
  otpInput: {
    backgroundColor: "#fff",
    borderRadius: 12,
  },
  focusInput: {
    borderWidth: 1,
    borderColor: "#244BD7",
  },
});

export default OTPScreen;
