import * as Yup from "yup";

export const userLoginSchema = Yup.object({
  email: Yup.string()
    .email("Must be a valid email*")
    .max(255)
    .required("Email is required*"),
  password: Yup.string().required("Password is required*"),
});

export const otpSchema = Yup.object({
  otp: Yup.string().max(6).required("OTP is required*"),
});

export const userRegisterationSchema = Yup.object({
  fullName: Yup.string().max(255).required("Full Name is required*"),
  email: Yup.string()
    .email("Must be a valid email*")
    .max(255)
    .required("Email is required*"),
  password: Yup.string()
    .min(8, "Must Contain 8 Characters*")
    .required("Password is required*")
    .matches(/^(?=.*[a-z])/, " Must Contain One Lowercase Character*")
    .matches(/^(?=.*[A-Z])/, "  Must Contain One Uppercase Character*")
    .matches(/^(?=.*[0-9])/, "  Must Contain One Number Character*")
    .matches(
      /^(?=.*[!@#\$%\^&\*])/,
      "  Must Contain  One Special Case Character*"
    ),
  confirmPassword: Yup.string()
    .max(255)
    .required("ConfirmPassword is required*")
    .oneOf([Yup.ref("password"), null], "Passwords must match*"),
});
