const { body } = require("express-validator");

const add = [
  body("user").notEmpty().withMessage("Name is required"),
  body("meeetingId").notEmpty().withMessage("Location is required"),
  body("appointment").notEmpty().withMessage("Type is required"),
  body("type").notEmpty().withMessage("Type is required"),
];

const update = [
  body("user").notEmpty().withMessage("Name is required"),
  body("meeetingId").notEmpty().withMessage("Location is required"),
  body("appointment").notEmpty().withMessage("Type Location is required"),
  body("type").notEmpty().withMessage("Type Location is required"),
];

module.exports = {
  add,update
};
