const router = require("express").Router();
const questionFolder = require("../../controllers/questionnaire/questionFolder");
const middlewares = require("../../../../middlewares");
const validations = require("../../../../common/validations");


router.post("/add",
  validations.questionnaireValidation.addQuestionFolder,
  middlewares.authToken, 
  middlewares.authorization(['admin']),
  questionFolder.add
); 
router.put("/edit/:id",
  middlewares.authToken, 
  middlewares.authorization(['admin']),
  questionFolder.edit
); 
router.get("/getById/:id",
  middlewares.authToken, 
  middlewares.authorization(['admin']),
  questionFolder.getById
); 
router.get("/getAll/",
  middlewares.authToken, 
  middlewares.authorization(['admin']),
  questionFolder.getAll
); 
router.delete("/delete/:id",
  middlewares.authToken, 
  middlewares.authorization(['admin']),
  questionFolder.deleteById
); 


module.exports = router;
