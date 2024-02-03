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


module.exports = router;
