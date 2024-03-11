const { body } = require("express-validator");

const add = [
  body("firstName").notEmpty().withMessage("First Name is required"),
  body("lastName").notEmpty().withMessage("LastName is required"),
  body("dateOfBirth").notEmpty().withMessage("Date of birth is required"),
  body("phoneNumber").notEmpty().withMessage("Phone number is required"),
  body("date").notEmpty().withMessage("Date  is required"),
  body("gender").notEmpty().withMessage("Gender is required"),
  body("password").notEmpty().withMessage("Password is required"),
  body("clinic").notEmpty().withMessage("Clinic is required"),
  body("appiontmentType").notEmpty().withMessage("Appointemnt type is required"),
  body("isRecuring").notEmpty().withMessage("isRecuring is required"),
  body("appointmentMedium").notEmpty().withMessage("Appointmet Medium is required"),
];
const vitals = [
  body("appointment").notEmpty().withMessage("Appointment is required"),
  body("bodyTemperature").notEmpty().withMessage("Body Temperature is required"),
  body("heartRate").notEmpty().withMessage("Heart Rate is required"),
  body("respiratoryRate").notEmpty().withMessage("Respiratory Rate is required"),
  body("bloodPressure").notEmpty().withMessage("Blood Pressure is required"),
  body("oxygenSaturation").notEmpty().withMessage("Oxygen Saturation is required"),
  body("height").notEmpty().withMessage("Height is required"),
  body("patient").notEmpty().withMessage("Patient is required"),
  body("weight").notEmpty().withMessage("Weight is required"),
  body("bloodGlucose").notEmpty().withMessage("Blood Glucose is required"),
];


const singleAppontment = [
  body("clinic").notEmpty().withMessage("Clinic is required"),
  body("appiontmentType").notEmpty().withMessage("Appointments type is required"),
  body("date").notEmpty().withMessage("Date is required"),
  body("duration").notEmpty().withMessage("Duration is required"),
  body("isRecuring").notEmpty().withMessage("isRecuring is required"),
  body("appointmentMedium").notEmpty().withMessage("Appointment Medium is required"),
];
const updateAppointment = [
  body("doctorId").notEmpty().withMessage("Doctor ID is required"),
  body("time").notEmpty().withMessage("Start Time is required"),
  body("duration").notEmpty().withMessage("Duration is required"),
  body("appointmentId").notEmpty().withMessage("Appointment ID is required"),
];

const addAppointmentOnly = [
  body("user").notEmpty().withMessage("User is required"),
  body("clinic").notEmpty().withMessage("Clinic is required"),
  body("doctor").notEmpty().withMessage("Doctor is required"),
  body("appiontmentType").notEmpty().withMessage("Appointemnt type is required"),
  body("date").notEmpty().withMessage("Date is required"),
  body("time").notEmpty().withMessage("Time is required"),
  body("duration").notEmpty().withMessage("Duration is required"),
  body("isRecuring").notEmpty().withMessage("isRecuring is required"),
  body("appointmentMedium").notEmpty().withMessage("Appointmet Medium is required"),
]
const doctorNote = [
  body("user").notEmpty().withMessage("User is required"),
  body("appointmentId").notEmpty().withMessage("Appointment ID is required"),
  body("data").notEmpty().withMessage("Data is required"),
]

const editAppointment = [
  body("patient").notEmpty().withMessage("Patient is required"),
  body("doctor").notEmpty().withMessage("Doctor is required"),
  body("appiontmentType").notEmpty().withMessage("Appointment Type is required"),
  body("date").notEmpty().withMessage("Date is required"),
  body("time").notEmpty().withMessage("Time is required"),
  body("duration").notEmpty().withMessage("Duration is required"),
  body("meeetingId").notEmpty().withMessage("Details is required"),
];


module.exports = {
  add, singleAppontment, vitals, updateAppointment, addAppointmentOnly, doctorNote, editAppointment 
};
