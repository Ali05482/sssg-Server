const router = require("express").Router();
const questionsControl = require("../../controllers/questionnaire/questions");
const middlewares = require("../../../../middlewares");
const validations = require("../../../../common/validations");


router.post("/add",
  middlewares.authToken, 
  middlewares.authorization(['admin']),
  validations.questionnaireValidation.addQuestion,
  questionsControl.add
); 
router.post("/addMany",
  middlewares.authToken, 
  middlewares.authorization(['admin']),
  validations.questionnaireValidation.addBulkQuestion,
  questionsControl.addMany
); 
router.put("/edit/:id",
  middlewares.authToken, 
  middlewares.authorization(['admin']),
  questionsControl.edit
); 
router.get("/getById/:id",
  middlewares.authToken, 
  middlewares.authorization(['admin']),
  questionsControl.getById
); 
router.get("/getAll/",
  middlewares.authToken, 
  middlewares.authorization(['admin']),
  questionsControl.getAll
); 
router.get("/getAllQuestionsAndAnswers/",
  middlewares.authToken, 
  // middlewares.authorization(['admin']),
  questionsControl.getAllQuestionsAndAnwers
); 
router.get("/getLinkedQuestions/",
  middlewares.authToken, 
  questionsControl.getLinkedQuestions
); 
router.delete("/delete/:id",
  middlewares.authToken, 
  middlewares.authorization(['admin']),
  questionsControl.deleteById
); 
router.get("/getQuestionsByGroupId/:id",
  middlewares.authToken, 
  middlewares.authorization(['admin']),
  questionsControl.getQuestionsByGroupId
);
router.get("/searchQuestion/:search/:type/:id",
  middlewares.authToken, 
  middlewares.authorization(['admin']),
  questionsControl.searchQuestion 
);
router.delete("/deleteQuestionById/:id",
  middlewares.authToken, 
  middlewares.authorization(['admin']),
  questionsControl.deleteQuestionById
);
router.post("/addQuestionWIthGroupId",
  middlewares.authToken, 
  middlewares.authorization(['admin']),
  questionsControl.addQuestionWIthGroupId
);
router.get("/getQuestionsOfAnswer/:id",
  middlewares.authToken, 
  middlewares.authorization(['admin']),
  questionsControl.getQuestionsOfAnswer
);
router.put("/unLinkQuestionsFromAnswers/:id",
  middlewares.authToken, 
  middlewares.authorization(['admin']),
  questionsControl.unLinkQuestionsFromAnswers
);

module.exports = router;
