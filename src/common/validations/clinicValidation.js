const { body } = require("express-validator");

const add = [
  body("name").notEmpty().withMessage("Name is required"),
  body("location").notEmpty().withMessage("Location is required"),
  body("type").notEmpty().withMessage("Type is required"),
  body("city").notEmpty().withMessage("City is required"),
];

const update = [
  body("name").notEmpty().withMessage("Name is required"),
  body("location").notEmpty().withMessage("Location is required"),
  body("type").notEmpty().withMessage("Type Location is required"),
];

module.exports = {
  add,update
};
