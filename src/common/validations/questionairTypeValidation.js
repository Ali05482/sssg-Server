const { body } = require("express-validator");

const questionairType = [
  body("name").notEmpty().withMessage("type is required"),
];



module.exports = { questionairType };
