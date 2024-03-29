const router = require("express").Router();
const apointment = require("../../controllers/apointment/mainController");


const middlewares = require("../../../../middlewares");
const validations = require("../../../../common/validations");

router.post(
  "/add",
  middlewares.authToken,
  middlewares.authorization(['admin', 'doctor', 'patient', 'compodar', 'schedulingTeam']),
  validations.appointmentModule.add,
  apointment.add
);

router.post(
  "/vitals/add",
  middlewares.authToken,
  middlewares.authorization(['admin', 'doctor', 'patient', 'compodar', 'schedulingTeam']),
  validations.appointmentModule.vitals,
  apointment.collectVitals
);
router.post(
  "/add/both",
  middlewares.authToken,
  middlewares.authorization(['admin', 'doctor', 'patient', 'compodar', 'schedulingTeam']),
  validations.appointmentModule.add,
  apointment.createAppointMentPlusUser
);

router.post(
  "/only/add",
  middlewares.authToken,
  middlewares.authorization(['admin', 'doctor', 'patient', 'compodar', 'schedulingTeam']),
  validations.appointmentModule.singleAppontment,
  apointment.createAppointment
);
router.post(
  "/only/appointment/add",
  middlewares.authToken,
  middlewares.authorization(['admin', 'doctor', 'patient', 'compodar', 'schedulingTeam']),
  validations.appointmentModule.singleAppontment,
  apointment.createAppointmentOnly
);
router.put(
  "/updateAppointment",
  middlewares.authToken,
  middlewares.authorization(['admin', 'doctor', 'patient', 'compodar', 'schedulingTeam']),
  validations.appointmentModule.updateAppointment,
  apointment.updateAppointment
);


router.get("/getAll",
  middlewares.authToken,
  middlewares.authorization(['admin', 'doctor', 'patient', 'compodar', 'schedulingTeam']),
  apointment.getAll);

router.get("/getAppointmentsForVitals",
  middlewares.authToken,
  middlewares.authorization(['admin', 'doctor', 'patient', 'compodar', 'schedulingTeam']),
  apointment.getAppointmentsForVitals);


router.get("/getAppointmentsForScheduling",
  middlewares.authToken,
  middlewares.authorization(['admin', 'doctor', 'patient', 'compodar', 'schedulingTeam']),
  apointment.getAppointmentsForScheduling);

router.get("/getTodaysAndNonQuestainredAppointment",
  middlewares.authToken,
  middlewares.authorization(['admin', 'doctor', 'patient', 'compodar', 'schedulingTeam']),
  apointment.getTodaysAndNonQuestainredAppointment);


router.get("/doctor/:dayName/:time/:clinic/:duration/:date",
  middlewares.authToken,
  middlewares.authorization(['admin', 'doctor', 'patient', 'compodar', 'schedulingTeam']),
  apointment.getDoctorsForApointments);

router.get("/getAppointmentsForCare",
  middlewares.authToken,
  middlewares.authorization(['admin', 'doctor', 'patient', 'compodar', 'schedulingTeam']),
  apointment.getAppointmentsForCare);

router.get("/getAppointmentsForMeeting",
  middlewares.authToken,
  middlewares.authorization(['admin', 'doctor', 'patient', 'compodar', 'schedulingTeam']),
  apointment.getAppointmentsForMeeting);


router.put("/updateAppointmentStatus/:id",
  middlewares.authToken,
  middlewares.authorization(['admin', 'doctor', 'patient', 'compodar', 'schedulingTeam']),
  apointment.updateAppointmentStatus);

router.post("/notifyDoctor",
  middlewares.authToken,
  middlewares.authorization(['admin', 'doctor', 'patient', 'compodar', 'schedulingTeam']),
  apointment.notifyDoctor);

router.post("/updateInConnectionForAppointment",
  middlewares.authToken,
  middlewares.authorization(['admin', 'doctor', 'patient', 'compodar', 'schedulingTeam']),
  apointment.updateInConnectionForAppointment);

router.get("/getDoctorsTodaysAppointments",
  middlewares.authToken,
  middlewares.authorization(['admin', 'doctor', 'patient', 'compodar', 'schedulingTeam']),
  apointment.getDoctorsTodaysAppointments);

router.post("/createAndUpdateDoctorNote",
  middlewares.authToken,
  middlewares.authorization(['admin', 'doctor', 'patient', 'compodar', 'schedulingTeam']),
  validations.appointmentModule.doctorNote,
  apointment.createAndUpdateDoctorNote);
router.get("/getDoctorNote/:id",
  // middlewares.authToken,
  // middlewares.authorization(['admin', 'doctor', 'patient', 'compodar', 'schedulingTeam']),
  apointment.getDoctorNote);

  router.get("/getNotesByDoctorId/:id",
  middlewares.authToken,
  middlewares.authorization(['admin', 'doctor', 'patient', 'compodar', 'schedulingTeam']),
  apointment.getNotesByDoctorId);

  router.get("/getAppointmentForManagement/:type/:keyword/:fromDate?/:toDate?/:skipDate?",
  middlewares.authToken,
  middlewares.authorization(['admin', 'doctor', 'patient', 'compodar', 'schedulingTeam']),
  apointment.getAppointmentForManagement);

  router.put("/editAppointment/:id",
  middlewares.authToken,
  middlewares.authorization(['admin', 'doctor', 'patient', 'compodar', 'schedulingTeam']),
  validations.appointmentModule.editAppointment,
  apointment.editAppointment);

  
  
  
  
module.exports = router;
