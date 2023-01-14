const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");
const response = require("../configurations/response");
const { JWT, EMAIL_CONFIG } = require("../common/constant");
const User = require("../models/User");
const Otp = require("../models/Otp");
require("dotenv").config();

const transport = nodemailer.createTransport(EMAIL_CONFIG.smtp);

const AuthRoutes = {
  authenticate: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return response.fail(req, res, response.messages.invalid_params, {
          errors: errors.array(),
        });
      }

      const { email, password } = req.body;

      const isUserAvailable = await User.getUserByEmail(email);

      if (!isUserAvailable) {
        return response.fail(
          req,
          res,
          response.messages.server_error,
          "Invalid credentials"
        );
      }

      const isMatch = await bcrypt.compare(password, isUserAvailable?.password);

      if (!isMatch) {
        return response.fail(
          req,
          res,
          response.messages.server_error,
          "Invalid credentials"
        );
      }
      const payload = {
        user: {
          id: isUserAvailable.id,
          email: isUserAvailable.email,
        },
      };
      const _user = _.omit(isUserAvailable, ["password"]);

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: JWT.EXPIRE_TIME },
        (err, token) => {
          if (err) throw err;

          return response.success(
            req,
            res,
            { user: _user, token },
            "Authenticated"
          );
        }
      );
    } catch (err) {
      return response.fail(
        req,
        res,
        response.messages.server_error,
        err.message
      );
    }
  },
  register: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return response.fail(req, res, response.messages.invalid_params, {
          errors: errors.array(),
        });
      }

      const { fullName, email, password } = req.body;

      const salt = await bcrypt.genSalt(10);
      let encryptedPassword = await bcrypt.hash(password, salt);

      const _user = {
        fullName,
        email,
        password: encryptedPassword,
      };

      const isRegistered = await User.createUser(_user);

      if (isRegistered?.insertId) {
        const newUser = await User.getUserById(isRegistered.insertId);
        const payload = {
          user: {
            id: newUser.id,
            email: newUser.email,
          },
        };

        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: JWT.EXPIRE_TIME },
          (err, token) => {
            if (err) throw err;
            return response.success(
              req,
              res,
              { user: newUser, token },
              "User created"
            );
          }
        );
      } else {
        return response.fail(
          req,
          res,
          response.messages.server_error,
          "User registration failed"
        );
      }
    } catch (err) {
      console.log(">>===>> >>===>> err", err);
      return response.fail(
        req,
        res,
        response.messages.server_error,
        err.message
      );
    }
  },
  sendOTP: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return response.fail(req, res, response.messages.invalid_params, {
          errors: errors.array(),
        });
      }
      const { email } = req.body;
      const otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
      });

      const msg = {
        from: EMAIL_CONFIG.from,
        to: email,
        subject: "OTP Code",
        text: `Hello, Your OTP for login verification is ${otp}. This OTP is valid for 15 minutes. Please keep this OTP confidential and do not share it with anyone.`,
      };

      await transport.sendMail(msg);
      const { insertId } = await Otp.createOtp(otp);

      return response.success(
        req,
        res,
        {
          otpId: insertId,
          expiry: 202218645,
        },
        "OTP sent successfully"
      );
    } catch (err) {
      return response.fail(
        req,
        res,
        response.messages.server_error,
        err.message
      );
    }
  },
  verifyOTP: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return response.fail(req, res, response.messages.invalid_params, {
          errors: errors.array(),
        });
      }
      const { otpId, otpCode } = req.body;
      const result = await Otp.getOtpById(otpId);
      if (result?.otpCode == otpCode) {
        return response.success(
          req,
          res,
          { success: true },
          "OTP verified successfully"
        );
      } else {
        return response.success(
          req,
          res,
          { success: false },
          "OTP verified failed"
        );
      }
    } catch (err) {
      return response.fail(
        req,
        res,
        response.messages.server_error,
        "OTP verified failed"
      );
    }
  },
};
module.exports = AuthRoutes;
