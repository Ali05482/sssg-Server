const { body } = require("express-validator");

const add = [
  body("firstName").notEmpty().withMessage("First Name is required"),
  body("lastName").notEmpty().withMessage("LastName is required"),
  body("dateOfBirth").notEmpty().withMessage("Date of birth is required"),
  body("phoneNumber").notEmpty().withMessage("Phone number is required"),
  body("gender").notEmpty().withMessage("Gender is required"),
  body("password").notEmpty().withMessage("Password is required"),
  body("speciality").notEmpty().withMessage("Speciality is required"),
  body("availability").notEmpty().withMessage("Availability is required"),
];


module.exports = {
   add
};
