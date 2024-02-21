const router = require("express").Router();
const questionairTypesControl = require("../../controllers/questionnaire/questionnaireType");
const middlewares = require("../../../../middlewares");
const validations = require("../../../../common/validations");


router.post("/add",
  validations.questionairTypeValidation.questionairType,
  middlewares.authToken, 
  middlewares.authorization(['admin']),
  questionairTypesControl.add
); 
router.put("/edit/:id",
 validations.questionairTypeValidation.questionairType,
  middlewares.authToken, 
  middlewares.authorization(['admin']),
  questionairTypesControl.edit
); 
router.get("/getById/:id",
  middlewares.authToken, 
  middlewares.authorization(['admin']),
  questionairTypesControl.getById
); 
router.get("/getAll/",
  middlewares.authToken, 
  middlewares.authorization(['admin']),
  questionairTypesControl.getAll
); 
router.delete("/delete/:id",
  middlewares.authToken, 
  middlewares.authorization(['admin']),
  questionairTypesControl.deleteById
); 


module.exports = router;
