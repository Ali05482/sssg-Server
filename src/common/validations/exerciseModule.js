const { body } = require("express-validator");

const weeksOfExercise = [
  body("groupId").notEmpty().withMessage("groupId is required"),
  body("dayName").notEmpty().withMessage("Day name is required"),
  body("day")
    .notEmpty()
    .withMessage("Day is required")
    .isNumeric()
    .withMessage("Day must be numeric"),
  body("typeOfExercise").notEmpty().withMessage("Type of Exercise is required"),
  body("mainType")
    .notEmpty()
    .withMessage("Group Type is required")
    .isIn(["body", "mind", "sleep"])
    .withMessage("Group Type must be one of: body, mind, sleep"),
  body("totalTime").notEmpty().withMessage("Amount of time Spent is required"),
  body("instructions").notEmpty().withMessage("Instruction is required"),
  body("output.fromCals").notEmpty().withMessage("From Cals is required"),
  body("output.toCals").notEmpty().withMessage("To Cals is required"),
];

const excercises = [
  body("description").notEmpty().withMessage("description is required"),
  body("time").notEmpty().withMessage("time is required"),
  body("exerciseType").notEmpty().withMessage("exerciseType is required"),
  body("isGroupExercise").notEmpty().withMessage("isGroupExercise is required"),
  body("output.fromCals").notEmpty().withMessage("From Cals is required"),
  body("output.toCals").notEmpty().withMessage("To Cals is required"),
];

const userData = [
  body("userId").notEmpty().withMessage("User Id is required"),
  body("groupId").notEmpty().withMessage("Group Id is required"),
  body("weekId").notEmpty().withMessage("Week Id is required"),
  body("exerciseId").notEmpty().withMessage("Exercise Id is required"),
  body("minits").notEmpty().withMessage("Minits is required"),
];
module.exports = { weeksOfExercise, userData, excercises };
