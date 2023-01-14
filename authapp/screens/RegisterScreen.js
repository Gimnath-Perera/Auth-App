import React, { useState, useRef } from "react";

import {
  StyleSheet,
  TouchableOpacity,
  View,
  SafeAreaView,
  Text,
  TextInput,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { Formik } from "formik";
import Toast from "react-native-toast-message";
import _ from "lodash";

import { userRegisterationSchema } from "../common/validation.schema";
import { BASE_URL } from "../common/contants";

const RegisterScreen = ({ navigation }) => {
  const formikRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const onRegisterSubmit = async ({
    fullName,
    email,
    password,
    confirmPassword,
  }) => {
    try {
      setIsLoading(true);
      await axios.post(`${BASE_URL}/api/auth/register`, {
        fullName,
        email,
        password,
        confirmPassword,
      });

      setIsLoading(false);
      showSuccessToast();
      formikRef.current?.resetForm();
      navigation.navigate("LoginScreen");
    } catch (err) {
      showErrorToast();
      setIsLoading(false);
    }
  };

  const showSuccessToast = () => {
    Toast.show({
      type: "success",
      text1: "Success",
      text2: "User registration successful",
    });
  };

  const showErrorToast = () => {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "User registration failed",
    });
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <Text style={styles.text}>Create an account</Text>
        <Formik
          initialValues={initialFormValues}
          validationSchema={userRegisterationSchema}
          onSubmit={(values) => {
            onRegisterSubmit(values);
          }}
          innerRef={formikRef}
        >
          {({ errors, handleChange, touched, values, handleSubmit }) => (
            <>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Full Name"
                  value={values.fullName}
                  onChangeText={handleChange("fullName")}
                  name="fullName"
                  style={[
                    styles.input,
                    touched.fullName && errors.fullName && styles.inputError,
                  ]}
                />
                {touched.fullName && errors.fullName && (
                  <Text style={styles.errorText}>{errors.fullName}</Text>
                )}
                <TextInput
                  placeholder="Email"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  style={[
                    styles.input,
                    touched.email && errors.email && styles.inputError,
                  ]}
                  name="email"
                  keyboardType="email-address"
                />
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}

                <TextInput
                  placeholder="Password"
                  value={values.password}
                  onChangeText={handleChange("password")}
                  style={[
                    styles.input,
                    touched.password && errors.password && styles.inputError,
                  ]}
                  secureTextEntry
                  name="password"
                />
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
                <TextInput
                  placeholder="Confirm Password"
                  value={values.confirmPassword}
                  onChangeText={handleChange("confirmPassword")}
                  style={[
                    styles.input,
                    touched.confirmPassword &&
                      errors.confirmPassword &&
                      styles.inputError,
                  ]}
                  secureTextEntry
                  name="confirmPassword"
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                )}
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonOutline]}
                  onPress={handleSubmit}
                >
                  {isLoading ? (
                    <ActivityIndicator size="small" color="#0782F9" />
                  ) : (
                    <Text style={styles.buttonOutlineText}>Register</Text>
                  )}
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>

        <View style={styles.textPrivate}>
          <Text style={styles.color_textPrivate}>
            By registering, you confirm that you accept our
          </Text>
          <TouchableOpacity onPress={() => alert("Terms Clicked!")}>
            <Text style={[styles.color_textPrivate, { color: "#e88832" }]}>
              Terms of service
            </Text>
          </TouchableOpacity>
          <Text style={styles.color_textPrivate}> and </Text>
          <Text style={[styles.color_textPrivate, { color: "#e88832" }]}>
            Privacy Policy
          </Text>
        </View>

        <View style={styles.textPrivate}>
          <Text style={styles.text_SignIn}>Have an account? &nbsp;</Text>
          <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
            <Text style={styles.text_ColorSignIn}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
const initialFormValues = {
  email: "",
  fullName: "",
  password: "",
  confirmPassword: "",
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 15,
  },
  inputError: { borderWidth: 1, borderColor: "red" },

  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
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
  text: {
    fontSize: 28,
    color: "#051d5f",
  },
  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    margin: 25,
    justifyContent: "center",
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: "400",
    color: "grey",
  },
  text_SignIn: {
    fontSize: 15,
    fontWeight: "400",
    color: "black",
  },
  text_ColorSignIn: {
    fontSize: 15,
    fontWeight: "400",
    color: "red",
  },
  errorText: {
    padding: 4,
    color: "red",
    fontSize: 12,
  },
});

export default RegisterScreen;
