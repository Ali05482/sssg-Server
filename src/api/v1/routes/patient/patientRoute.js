const router = require("express").Router();
const patientControl = require("../../controllers/patient/mainController");
const middlewares = require("../../../../middlewares");
const validations = require("../../../../common/validations");


router.post("/add",
  validations.patientValidation.add, 
  // middlewares.authToken, 
  // middlewares.authorization(['admin', 'patient', 'doctor']),
  patientControl.add
); 
router.post("/addPatientOnly",
  validations.patientValidation.add, 
  // middlewares.authToken, 
  // middlewares.authorization(['admin', 'patient', 'doctor']),
  patientControl.addPatientOnly
); 
 
router.get("/view/:id",
  middlewares.authToken, 
  middlewares.authorization(['admin', 'doctor','patient', 'compodar', 'schedulingTeam']),
  patientControl.getById
); 
router.get("/search/:id",
  middlewares.authToken, 
  middlewares.authorization(['admin', 'doctor','patient', 'compodar', 'schedulingTeam']),
  patientControl.searchPatient
); 
router.post("/view/",
  middlewares.authToken, 
  middlewares.authorization(['admin', 'doctor','patient', 'compodar', 'schedulingTeam']),
  patientControl.getAll
); 
router.get("/fetchPatients",
  middlewares.authToken, 
  middlewares.authorization(['admin', 'doctor','patient', 'compodar', 'schedulingTeam']),
  patientControl.fetchPatients
); 

module.exports = router;
