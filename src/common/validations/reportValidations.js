const { body } = require("express-validator");
const addAndUpdateSickNote = [
    body("appointmentId").notEmpty().withMessage("Appointment id is required"),
    body("data").notEmpty().withMessage("Html is required"),
    body("startDate").notEmpty().withMessage("Start Date is required"),
    body("endDate").notEmpty().withMessage("End Date is required"),
];
const addAndUpdatePrescription = [
    body("appointmentId").notEmpty().withMessage("Appointment id is required"),
];
const addAndUpdateReferral = [
    body("appointmentId").notEmpty().withMessage("Appointment id is required"),
    body("previousDoctorId").notEmpty().withMessage("Previous Doctor is required"),
    body("referralDoctorId").notEmpty().withMessage("Referral Doctor is required"),
    body("patientId").notEmpty().withMessage("Patient is required"),
];
const addAndUpdateRequisition = [
    body("appointmentId").notEmpty().withMessage("Appointment id is required"),
];

  module.exports = {addAndUpdateSickNote, addAndUpdatePrescription, addAndUpdateReferral, addAndUpdateRequisition}
