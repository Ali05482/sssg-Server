const router = require("express").Router();
const asnwerControl = require("../../controllers/questionnaire/answer");
const middlewares = require("../../../../middlewares");
const validations = require("../../../../common/validations");

router.post("/add",
  middlewares.authToken, 
  middlewares.authorization(['admin']),
  validations.questionnaireValidation.addAnswer,
  asnwerControl.add
); 
router.post("/addMany",
  middlewares.authToken, 
  middlewares.authorization(['admin']),
  validations.questionnaireValidation.addBulkAnswers,
  asnwerControl.addMany
); 
router.post("/collectAnswer/:appointment",
  middlewares.authToken, 
  middlewares.authorization(['admin', 'doctor','patient', 'compodar', 'schedulingTeam']),
  // upload.upload(),
  asnwerControl.collectAnswer
); 
router.post("/saveDoctorChanges/",
  middlewares.authToken, 
  middlewares.authorization(['admin', 'doctor','patient', 'compodar', 'schedulingTeam']),
  validations.questionnaireValidation.saveDoctorChanges,
  asnwerControl.saveDoctorChangeQuestionaire
); 
router.post("/linkedQuestion",
  middlewares.authToken, 
  middlewares.authorization(['admin']),
  asnwerControl.linkedQuestions
); 
router.post("/addBulk",
  middlewares.authToken, 
  middlewares.authorization(['admin']),
  validations.questionnaireValidation.addBulkAnswers,
  asnwerControl.addBulk
); 
router.put("/edit/:id",
  middlewares.authToken, 
  middlewares.authorization(['admin']),
  asnwerControl.edit
); 
router.get("/getById/:id",
  middlewares.authToken, 
  middlewares.authorization(['admin']),
  asnwerControl.getById
); 
router.get("/getVitalsByAppointmentId/:id",
  middlewares.authToken, 
  middlewares.authorization(['admin', 'doctor','patient', 'compodar', 'schedulingTeam']),
  asnwerControl.getVitalsByAppointmentId
); 
router.get("/getCollectedQuestioanire",
  middlewares.authToken, 
  middlewares.authorization(['admin', 'doctor','patient', 'compodar', 'schedulingTeam']),
  asnwerControl.getCollectedQuestioanire
); 
router.get("/getCollectedQuestioanireById/:id",
  middlewares.authToken, 
  middlewares.authorization(['admin', 'doctor','patient', 'compodar', 'schedulingTeam']),
  asnwerControl.getCollectedQuestioanireById
); 
router.get("/getAll/",
  middlewares.authToken, 
  middlewares.authorization(['admin']),
  asnwerControl.getAll
); 
router.get("/getAll/",
  middlewares.authToken, 
  middlewares.authorization(['admin']),
  asnwerControl.getAll
); 
router.get("/getAllByQuestionId/:id",
  middlewares.authToken, 
  middlewares.authorization(['admin']),
  asnwerControl.getAllBtQuestionId
); 
router.delete("/delete/:id",
  middlewares.authToken, 
  middlewares.authorization(['admin']),
  asnwerControl.deleteById
);
router.post("/addAnswerWithQuestionId",
  middlewares.authToken, 
  middlewares.authorization(['admin']),
  asnwerControl.addAnswerWithQuestionId
); 
router.put("/editAnswerWithQuestionId/:id",
  middlewares.authToken, 
  middlewares.authorization(['admin']),
  asnwerControl.editAnswerWithQuestionId
);
router.delete("/deleteAnswerById/:id",
  middlewares.authToken, 
  middlewares.authorization(['admin']),
  asnwerControl.deleteAnswerById
);



module.exports = router;
