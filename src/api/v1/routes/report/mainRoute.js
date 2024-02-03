const router = require("express").Router();
const reportControl = require("../../controllers/report/mainController");
const middlewares = require("../../../../middlewares");
const validations = require("../../../../common/validations");


router.post("/addAndUpdateSickNote",
middlewares.authToken, 
middlewares.authorization(['admin', 'doctor','patient', 'compodar', 'schedulingTeam']),
validations.reportValidations.addAndUpdateSickNote, 
  reportControl.addAndUpdateSickNote
);

router.get("/getSickNoteByAppointmentId/:id",
middlewares.authToken, 
middlewares.authorization(['admin', 'doctor','patient', 'compodar', 'schedulingTeam']),
  reportControl.getSickNoteByAppointmentId
);


// For Prescriptions
router.post("/addAndUpdatePrescription",
middlewares.authToken, 
middlewares.authorization(['admin', 'doctor','patient', 'compodar', 'schedulingTeam']),
validations.reportValidations.addAndUpdatePrescription, 
reportControl.addAndUpdatePrescription
);



// For Referral
router.post("/addAndUpdateReferral",
middlewares.authToken, 
middlewares.authorization(['admin', 'doctor','patient', 'compodar', 'schedulingTeam']),
validations.reportValidations.addAndUpdateReferral, 
  reportControl.addAndUpdateReferral
);


router.get("/getPrescriptionByAppointmentId/:id",
middlewares.authToken, 
middlewares.authorization(['admin', 'doctor','patient', 'compodar', 'schedulingTeam']),
  reportControl.getPrescriptionByAppointmentId
);

// For Requisition
router.post("/addAndUpdateRequisition",
middlewares.authToken, 
middlewares.authorization(['admin', 'doctor','patient', 'compodar', 'schedulingTeam']),
validations.reportValidations.addAndUpdateRequisition, 
  reportControl.addAndUpdateRequisition
);


router.get("/getRequisitionByAppointmentId/:id",
middlewares.authToken, 
middlewares.authorization(['admin', 'doctor','patient', 'compodar', 'schedulingTeam']),
  reportControl.getRequisitionByAppointmentId
);



router.get("/getReferralByAppointmentId/:id",
middlewares.authToken, 
middlewares.authorization(['admin', 'doctor','patient', 'compodar', 'schedulingTeam']),
  reportControl.getReferralByAppointmentId
);
router.get("/getReferralByReferDoctorId",
middlewares.authToken, 
middlewares.authorization(['admin', 'doctor','patient', 'compodar', 'schedulingTeam']),
  reportControl.getReferralByReferDoctorId
);


module.exports = router