const router = require("express").Router();
const questionGroupsControl = require("../../controllers/questionnaire/questionGroups");
const middlewares = require("../../../../middlewares");
const validations = require("../../../../common/validations");


router.post("/add",
validations.questionnaireValidation.addQuestionGroup,
  middlewares.authToken, 
  middlewares.authorization(['admin']),
  questionGroupsControl.add
); 
router.put("/edit/:id",
  middlewares.authToken, 
  middlewares.authorization(['admin']),
  questionGroupsControl.edit
); 
router.get("/getById/:id",
  middlewares.authToken, 
  middlewares.authorization(['admin', 'doctor','patient', 'compodar', 'schedulingTeam']),
  questionGroupsControl.getById
); 
router.get("/getByfolderId/:id",
  middlewares.authToken, 
  middlewares.authorization(['admin', 'doctor','patient', 'compodar', 'schedulingTeam']),
  questionGroupsControl.getAllByFolderId
); 
router.get("/getAllQuestionAnswer/:id",
  // middlewares.authToken, 
  // middlewares.authorization(['admin', 'doctor','patient', 'compodar', 'schedulingTeam']),
  questionGroupsControl.getQuestionsAndAnswersByGroupId
); 
router.get("/getAll/",
  middlewares.authToken, 
  middlewares.authorization(['admin', 'doctor','patient', 'compodar', 'schedulingTeam']),
  questionGroupsControl.getAll
); 
router.delete("/delete/:id",
  middlewares.authToken, 
  middlewares.authorization(['admin', 'doctor','patient', 'compodar', 'schedulingTeam']),
  questionGroupsControl.deleteById
); 
router.get("/getQuestionGroupById/:id",
  middlewares.authToken, 
  middlewares.authorization(['admin', 'doctor','patient', 'compodar', 'schedulingTeam']),
  questionGroupsControl.getQuestionGroupById
);


module.exports = router;
