const router = require("express").Router();
const { body, param } = require("express-validator");
const doctors = require("../../controllers/doctor/mainController");
const doctorSchedules = require("../../controllers/doctor/doctorsSchedules");


const middlewares = require("../../../../middlewares");
const validations = require("../../../../common/validations");


router.post(
  "/add",
  middlewares.authToken,
  middlewares.authorization(['admin', 'doctor','patient', 'compodar', 'schedulingTeam']),
  validations.doctorModule.add,
  doctors.add
); //Adding New Group
router.post(
  "/schedule/createAndUpdate",
  middlewares.authToken,
  middlewares.authorization(['admin', 'doctor','patient', 'compodar', 'schedulingTeam']),
  validations.doctorModule.add,
  doctorSchedules.createOrUpdate
); //Adding New Group


router.get("/getAll/:patientId", 
middlewares.authToken,
middlewares.authorization(['admin', 'doctor','patient', 'compodar', 'schedulingTeam']),
doctors.getAll); 

router.get("/schedule/:doctorId/:day", 
middlewares.authToken,
middlewares.authorization(['admin', 'doctor','patient', 'compodar', 'schedulingTeam']),
doctorSchedules.getDoctorAvailability); 

router.get("/getOverAllDoctorAvailability/:doctorId", 
middlewares.authToken,
middlewares.authorization(['admin', 'doctor','patient', 'compodar', 'schedulingTeam']),
doctorSchedules.getOverAllDoctorAvailability); 

router.get("/getDoctorsForScheduling", 
middlewares.authToken,
middlewares.authorization(['admin', 'doctor','patient', 'compodar', 'schedulingTeam']),
doctorSchedules.getDoctorsForScheduling); 

router.get("/getDoctorReservedAppointments/:id", 
middlewares.authToken,
middlewares.authorization(['admin', 'doctor','patient', 'compodar', 'schedulingTeam']),
doctorSchedules.getDoctorReservedAppointments); 




module.exports = router;
