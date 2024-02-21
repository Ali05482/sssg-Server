const { body } = require("express-validator");

const add = [
  body("firstName").notEmpty().withMessage("First Name is required"),
  body("lastName").notEmpty().withMessage("LastName is required"),
  body("dateOfBirth").notEmpty().withMessage("Date of birth is required"),
  body("phoneNumber").notEmpty().withMessage("Phone number is required"),
  body("gender").notEmpty().withMessage("Gender is required"),
  body("email").notEmpty().withMessage("Gender is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

const appintmentplyspatient = [
  body("firstName").notEmpty().withMessage("First Name is required"),
  body("lastName").notEmpty().withMessage("LastName is required"),
  body("dateOfBirth").notEmpty().withMessage("Date of birth is required"),
  body("phoneNumber").notEmpty().withMessage("Phone number is required"),
  body("gender").notEmpty().withMessage("Gender is required"),
  body("user").notEmpty().withMessage("User is required"),
  body("clinic").notEmpty().withMessage("Clinic is required"),
  body("email").notEmpty().withMessage("Clinic is required"),
  body("doctor").notEmpty().withMessage("Doctor is required"),
  body("appiontmentType").notEmpty().withMessage("Appointemnt type is required"),
  body("date").notEmpty().withMessage("Date is required"),
  body("time").notEmpty().withMessage("Time is required"),
  body("duration").notEmpty().withMessage("Duration is required"),
  body("isRecuring").notEmpty().withMessage("isRecuring is required"),
  body("appointmentMedium").notEmpty().withMessage("Appointmet Medium is required"),
]

const edit = [
  body('firstName').if((value, { req }) => req.body.email !== undefined).notEmpty().withMessage('First Name cannot be empty'),
  body('lastName').if((value, { req }) => req.body.email !== undefined).notEmpty().withMessage('Last Name cannot be empty'),
  body('dateOfBirth').if((value, { req }) => req.body.email !== undefined).notEmpty().withMessage('Date of Birth cannot be empty'),
  body('phoneNumber').if((value, { req }) => req.body.email !== undefined).notEmpty().withMessage('Phone number cannot be empty'),
  body('gender').if((value, { req }) => req.body.email !== undefined).notEmpty().withMessage('Gender cannot be empty'),
  body('password').if((value, { req }) => req.body.email !== undefined).notEmpty().withMessage('Password cannot be empty'),
]

module.exports = {
   add,
   appintmentplyspatient,
   edit
};
