const { body } = require("express-validator");

const add = [
  body("firstName").notEmpty().withMessage("Speciality is required"),
  body("lastName").notEmpty().withMessage("Speciality is required"),
  body("dateOfBirth").notEmpty().withMessage("Speciality is required"),
  body("phoneNumber").notEmpty().withMessage("Speciality is required"),
  body("gender").notEmpty().withMessage("Speciality is required"),
  // body("role").notEmpty().withMessage("Speciality is required"),
];

const update = [
  body("name").notEmpty().withMessage("Speciality is required"),
  body("location").notEmpty().withMessage("Availability is required"),
  body("type").notEmpty().withMessage("Hospital Location is required"),
];

module.exports = {
  add,update
};
