import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { Formik } from "formik";
import Toast from "react-native-toast-message";
import LottieView from "lottie-react-native";

import { userLoginSchema } from "../common/validation.schema";
import { BASE_URL } from "../common/contants";
import { setToLocalStorage, getFromLocalStorage } from "../common/functions";

const LoginScreen = ({ navigation }) => {
  const formikRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkIsUserLoggedIn();
  }, []);

  const checkIsUserLoggedIn = async () => {
    const data = await getFromLocalStorage();
    if (data.token) {
      navigation.navigate("HomeScreen");
    }
  };

  const onLoginSubmit = async (values) => {
    try {
      setIsLoading(true);
      const result = await axios.post(`${BASE_URL}/api/auth/login`, values);

      const response = await axios.post(`${BASE_URL}/api/auth/send-otp`, {
        email: values?.email,
      });

      setIsLoading(false);
      showSuccessToast();
      const user = result?.data?.data.user;
      const token = result?.data?.data.token;

      await setToLocalStorage(token, user);

      formikRef.current?.resetForm();
      navigation.navigate("OTPScreen", {
        otpId: response?.data?.data?.otpId,
      });
    } catch (err) {
      showErrorToast();
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

  const showErrorToast = () => {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "Invalid credentials",
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LottieView
        source={require("../assets/logo.json")}
        autoPlay
        loop
        style={styles.logo}
      />

      <Text style={styles.text}>Auth App</Text>
      <Formik
        initialValues={initialFormValues}
        validationSchema={userLoginSchema}
        onSubmit={(values) => {
          onLoginSubmit(values);
        }}
        innerRef={formikRef}
      >
        {({ errors, handleChange, touched, values, handleSubmit }) => (
          <>
            <View style={styles.inputContainer}>
              <View>
                <TextInput
                  placeholder="Email"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  style={[
                    styles.input,
                    touched.email && errors.email && styles.inputError,
                  ]}
                  keyboardType="email-address"
                />
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
              </View>
              <View>
                <TextInput
                  placeholder="Password"
                  value={values.password}
                  onChangeText={handleChange("password")}
                  style={[
                    styles.input,
                    touched.password && errors.password && styles.inputError,
                  ]}
                  secureTextEntry
                />
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.buttonOutline]}
                onPress={handleSubmit}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color="#0782F9" />
                ) : (
                  <Text style={styles.buttonOutlineText}>Login</Text>
                )}
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>

      <View style={styles.textPrivate}>
        <Text style={styles.color_textPrivate}>
          Don't have an acount? &nbsp;
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
          <Text style={[styles.color_textPrivate, { color: "#FF0000" }]}>
            Create Here
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const initialFormValues = {
  email: "",
  password: "",
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  inputError: { borderWidth: 1, borderColor: "red" },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
  logo: {
    paddingTop: 5,
    height: 200,
    width: 200,
  },
  text: {
    fontSize: 28,
    color: "#051d5f",
  },
  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    margin: 30,
    justifyContent: "center",
    paddingTop: 20,
  },
  color_textPrivate: {
    fontSize: 15,
    fontWeight: "400",
    color: "black",
  },
  errorText: {
    padding: 4,
    color: "red",
    fontSize: 12,
  },
});

export default LoginScreen;
