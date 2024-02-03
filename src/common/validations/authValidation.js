const { body } = require("express-validator");

const validationOfRegistration = [
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("dateOfBirth").notEmpty().withMessage("Date of birth is required"),
  body("phoneNumber").notEmpty().withMessage("Phone # is required"),
  body("gender").notEmpty().withMessage("Gender is required"),
  body("password").notEmpty().withMessage("Password is required"),
  body("role").notEmpty().withMessage("Role is required"),
  body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email"),
  body("password").notEmpty().withMessage("password is required"),
];

const validationOfLogin = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

const validationOfForgotEmail = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email"),
];

module.exports = {
  validationOfRegistration,
  validationOfLogin,
  validationOfForgotEmail,
};
