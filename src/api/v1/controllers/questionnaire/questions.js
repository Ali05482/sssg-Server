const models = require("../../../../models");
const { validationResult } = require("express-validator");
const services = require("../../../../services");
const _ = require("lodash");
const mongoose = require('mongoose')
const questions = {
  add: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ status: false, msg: "Invalid Inputs, Please make sure you are filling every feild", data: errors.array() });
      }
      const checkGroup = await models.questionGroup.findById(req.body.questionGroupId);
      if (!checkGroup) {
        return res.json({ status: false, msg: "Sorry this question group does not exists, please create one first", data: null });
      }
      const addQuestion = await models.question.create(req.body);
      if (!addQuestion) {
        return res.json({ status: false, msg: "Something Went Wrong, Try again......", data: null });
      }
      await models.questionGroup.findByIdAndUpdate(checkGroup._id, { $push: { questionId: addQuestion._id } })
      return res.json({ status: true, msg: "Question created successfully", data: addQuestion });
    } catch (error) {
      console.log(error.message)
      return res.json({ status: false, msg: "Something Went Wrong", data: null })
    }
  },
  checkObjectIdsExist: async (objectIds) => {
    try {
      // Find all documents that match the array of object IDs
      const foundDocuments = await models.questionGroup.find({
        _id: { $in: objectIds.map(id => new mongoose.Types.ObjectId(id)) },
      });
      const foundObjectIds = new Set(foundDocuments.map(doc => doc._id.toString()));

      // Find missing object IDs
      const missingObjectIds = objectIds.filter(id => !foundObjectIds.has(id));

      if (missingObjectIds.length === 0) {
        return { status: true, data: foundDocuments };
      } else {
        return { status: false, data: missingObjectIds };
      }
    } catch (error) {
      return { status: false, data: error.message };
    }
  },

  addMany: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: false, msg: "Invalid Inputs, Please make sure you are filling every feild", data: errors.array() });
    }
    const checkGroup = await questions.checkObjectIdsExist(req.body.data.map(x => x.questionGroupId));
    if (!checkGroup.status) {
      return res.json({ status: false, msg: "Sorry some question groups does not exists, please create one first", data: checkGroup });
    }
    const addQuestions = [];
    for (let i = 0; i < req.body.data.length; i++) {
      const addQuestion = await models.question.create(req.body.data[i]);
      if (addQuestion) {
        addQuestions.push(addQuestion)
        for (let j = 0; j < checkGroup.data.length; j++) {
          console.log("checkGroup[j]._id.toString()==addQuestion.questionGroupId.toString()", checkGroup.data[j]._id.toString() == addQuestion.questionGroupId.toString())
          if (checkGroup.data[j]._id.toString() == addQuestion.questionGroupId.toString()) {
            await models.questionGroup.findByIdAndUpdate(checkGroup.data[j]._id, { $push: { questionId: addQuestion._id } })
          }
        }
      }
    }
    return res.json({ status: true, msg: "Questions created successfully", data: addQuestions });
  },
  edit: async (req, res) => {
    if (!req.params.id) {
      return res.status(400).json({
        errors: [{ msg: "ID is required to edit", param: "id" }],
      });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await services.generator.edit(
      req,
      res,
      models.question,
      "Question "
    );
  },
  getAllQuestionsAndAnwers: async (req, res) => {
    try {
      const questionsAndAnswers = await models.question.find().populate("answers")
      return res.json({ status: true, msg: "Question fetched successfully", data: questionsAndAnswers });
    } catch (error) {
      return res.status(400).json({ status: false, msg: "Something Went Wrong, while fetching data ", data: null });
    }
  },
  getLinkedQuestions: async (req, res) => {
    try {
      const questionFolder = await models?.questionFolder?.findById(process?.env?.LINKED_ONLY_FOLDER_ID).populate("questionGroupId");
      if (questionFolder) {
        const questionIds = questionFolder.questionGroupId.flatMap(x => x.questionId.map(y => y))
        console.log(JSON.stringify(questionIds))
        if (questionIds?.length > 0) {
          const questionAndAnswers = await models.question.find({ _id: { $in: questionIds } }).populate("answers")
          return res?.json({ status: true, msg: "Questions Fetched", data: questionAndAnswers });
        }
        return res.json({ status: false, msg: "Question not found", data: null });
      }
      return res.json({ status: false, msg: "Question not found", data: null });
    } catch (error) {
      return res.status(400).json({ status: false, msg: "Something Went Wrong, while fetching data ", data: error.message });
    }
  },
  getAll: async (req, res) => {
    await services.generator.getAll(
      req,
      res,
      models.question,
      "Question "
    );
  },
  getById: async (req, res) => {
    await services.generator.getById(
      req,
      res,
      models.question,
      "Question "
    );
  },
  deleteById: async (req, res) => {
    await services.generator.deleteById(
      req,
      res,
      models.question,
      "Question "
    );
  },
  getQuestionsByGroupId: async (req, res) => {
    try {
      const questions = await models.question.find({ questionGroupId: req?.params?.id });
      return res.json({ status: true, msg: "Questions fetched successfully", data: questions });
    } catch (error) {
      return res.json({ status: false, msg: "Something Went Wrong", data: null });
    }
  },
  searchQuestion: async (req, res) => {
    try {
      let query = {};
      if (req?.params?.type === "all") {
        query = { name: { $regex: req?.params?.search, $options: "i" } }
      } else if (req?.params?.type === "byId") {
        query = { questionGroupId: req?.params?.id, name: { $regex: req?.params?.search, $options: "i" } }
      } else if (req?.params?.type === "onlyId") {
        query = { questionGroupId: req?.params?.id }
      }
      console.log("query", query)
      const questions = await models.question.find(query).populate("answers").populate("questionGroupId");
      console.log(questions)
      return res.json({ status: true, msg: "Questions fetched successfully", data: questions });
    } catch (error) {
      return res.json({ status: false, msg: "Something Went Wrong", data: null });
    }
  },
  deleteQuestionById: async (req, res) => {
    try {
      const deleteQuestion = await models.question.findByIdAndDelete(req?.params?.id);
      if (deleteQuestion) {
        return res.json({ status: true, msg: "Question deleted successfully", data: deleteQuestion });
      }
      return res.json({ status: false, msg: "Question not found", data: null });
    } catch (error) {
      return res.json({ status: false, msg: "Something Went Wrong", data: null });
    }
  },
  addQuestionWIthGroupId: async (req, res) => {
    try {
      if (!_?.isEmpty(req?.body?.name) && !_?.isEmpty(req?.body?.questionGroupId)) {
        const checkGroup = await models.question.create(req?.body);
        if (!checkGroup) {
          return res.json({ status: false, msg: "Question not created", data: null });
        }
        return res.json({ status: true, msg: "Question created successfully", data: checkGroup });
      } else {
        return res.json({ status: false, msg: "Please fill all the fields", data: null });
      }
    } catch (error) {
      console.log("error.message", error?.message)
      return res.json({ status: false, msg: "Something Went Wrong", data: null });
    }
  },
  getQuestionsOfAnswer: async (req, res) => {
    try {
      const questions = await models.answer.findById(req?.params?.id).populate("linkedQuestion.questionId");
      return res.json({ status: true, msg: "Questions fetched successfully", data: questions });
    } catch (error) {
      console.log("error.message", error?.message)
      return res.json({ status: false, msg: "Something Went Wrong", data: null });
    }
  },
  unLinkQuestionsFromAnswers: async (req, res) => {
    try {
      const answer = await models.answer.findById(req?.params?.id);
      if (answer) {
        const unlinkQuestion = await models.answer.findByIdAndUpdate(req?.params?.id, { $pull: { linkedQuestion: { questionId: req?.body?.questionId } } });
        if (unlinkQuestion) {
          return res.json({ status: true, msg: "Question unlinked successfully", data: unlinkQuestion });
        }
        return res.json({ status: false, msg: "Question not found", data: null });
      }
    } catch (error) {
      return res.json({ status: false, msg: "Something Went Wrong", data: null });
    }
  }

}
module.exports = questions;

