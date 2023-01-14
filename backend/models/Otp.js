const db = require("../configurations/db");

const Otp = {
  createOtp: (otpCode) => {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO otp (otpCode) VALUES (?)";
      db.query(query, [otpCode], (err, results) => {
        if (err) {
          return reject(err);
        }

        return resolve(results);
      });
    });
  },
  getOtpById: (id) => {
    return new Promise((resolve, reject) => {
      const query = "SELECT otpCode FROM otp WHERE id = ?";
      db.query(query, [id], (err, results) => {
        if (err) {
          return reject(err);
        }

        return resolve(results[0]);
      });
    });
  },
};

module.exports = Otp;
