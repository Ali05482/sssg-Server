const { body } = require("express-validator");

const validationOfSingleActivities = [
  body("type").notEmpty().withMessage("type is required"),
  body("name").notEmpty().withMessage("name is required"),
];

const validationOfActivities = [
  body("name").notEmpty().withMessage("name is required"),
  body("day").notEmpty().withMessage("day is required"),
  body("mainType").notEmpty().withMessage("mainType is required"),
  body("action").notEmpty().withMessage("action is required"),
];

module.exports = { validationOfSingleActivities, validationOfActivities };
