const { check } = require("express-validator");

exports.authenticate = [
  check("email", "email is required").not().isEmpty(),
  check("password", "password is required").not().isEmpty(),
];

exports.register = [
  check("fullName", "fullName is required").not().isEmpty(),
  check("email", "email is required").not().isEmpty(),
  check("password", "password is required").not().isEmpty(),
  check("confirmPassword", "confirmPassword is required")
    .not()
    .isEmpty()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords should be match");
      } else {
        return value;
      }
    }),
];
exports.sendOTP = [check("email", "email is required").not().isEmpty()];
exports.verifyOTP = [
  check("otpId", "otpId is required").not().isEmpty(),
  check("otpCode", "otpCode is required").not().isEmpty(),
];
