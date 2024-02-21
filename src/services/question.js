const models = require("../models/");
const { APIResponse } = require("../helper/");
const paginateOptions = {
  populate: {
    path: "options",
  },
};

const questionObj = {
  getById: async (req, res, model, msg) => {
    try {
      const question = await model.findById(req.params.id).populate("options");
      console.log("question", question);
      if (question) {
        return APIResponse(`${msg}`, question, res);
      }
      return APIResponse(`${msg} Not Found`, null, res, false, 404);
    } catch (error) {
      return APIResponse(
        "Something Went Wrong",
        error.message,
        res,
        false,
        500
      );
    }
  },
  getAll: async (req, res, model, msg) => {
    try {
      const questions = await model.paginate(
        {},
        {
          limit: req.query.limit ? req.query.limit : 10,
          page: req.query.page ? req.query.page : 1,
          ...paginateOptions,
        }
      );

      if (questions.docs.length > 0) {
        return APIResponse(`All ${msg}`, questions, res);
      }
      return APIResponse(`${msg} Not Found`, null, res, false, 404);
    } catch (error) {
      return APIResponse(
        "Something Went Wrong",
        error.message,
        res,
        false,
        500
      );
    }
  },
  deleteById: async (req, res, model, msg) => {
    try {
      const deletedQuestion = await model.findByIdAndDelete(req.params.id);
      if (deletedQuestion) {
        // if deletedQuestion has options
        // delete all options
        if (deletedQuestion.options.length > 0)
          await models.option.deleteMany({
            questionId: req.params.id,
          });
        return APIResponse(`${msg} Deleted`, null, res);
      }
      return APIResponse(`${msg} Not Found`, null, res, false, 404);
    } catch (error) {
      return APIResponse(
        "Something Went Wrong",
        error.message,
        res,
        false,
        500
      );
    }
  },
};

module.exports = questionObj;
