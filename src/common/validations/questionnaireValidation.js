const validAnswerTypes = [
  "radio",
  "checkbox",
  "boolean",
  "calendar",
  "text",
  "longText",
  "number",
  "images",
  "video",
  "table",
  "range",
  "signature",
  "select"
];
const { body } = require("express-validator");
const validateArray = (value) => {
  if (!Array.isArray(value)) {
    throw new Error('Invalid input');
  }

  for (const item of value) {
    if (!item.answer || !item.questionGroupId) {
      throw new Error('All objects in the array must have non-empty "name" and "Question Group" fields');
    }
  }

  return true;
};
const BulkAnswers = (value) => {
  if (!Array.isArray(value)) {
    throw new Error('Invalid input');
  }

  for (const item of value) {
    if (!item.answer || !item.questionId) {
      if(!(validAnswerTypes.includes(item.answerType))){
        throw new Error('Invalid Answer type');
      }
       else {
        throw new Error('All objects in the array must have non-empty "answer" and "question" fields');
       }
     
    }
  }

  return true;
};
const addQuestionFolder = [
  body("name").notEmpty().withMessage("Name is required"),
];
const addQuestionGroup = [
  body("name").notEmpty().withMessage("Name is required"),
  body("questionFolderId").notEmpty().withMessage("Question folder is required"),
];
const addQuestion = [
  body("name").notEmpty().withMessage("Question name is required"),
  body("questionGroupId").notEmpty().withMessage("Question group is required"),
  body("page").notEmpty().withMessage("Page number group is required"),
];

const addBulkQuestion = body('data').custom(validateArray);
const addBulkAnswers = body('data').custom(BulkAnswers);
const addAnswer = [
  body("questionId").notEmpty().withMessage("Question is required"),
  body("answer").notEmpty().withMessage("Answer is required"),
  body("answerType").notEmpty().withMessage("Answer type is required")
  .isIn(validAnswerTypes).withMessage(`Invalid answer type, The supported types are: ${validAnswerTypes}`),
];

const saveDoctorChanges = [
  body("questionaireId").notEmpty().withMessage("Questionaire id is required"),
  body("data").notEmpty().withMessage("Html is required"),
]
module.exports = {saveDoctorChanges, addQuestionFolder, addQuestionGroup , addQuestion, addBulkQuestion, addAnswer , addBulkAnswers };
