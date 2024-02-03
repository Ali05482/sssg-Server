const models = require("../models/");
const { APIResponse } = require("../helper/");

const generatorObject = {
  add: async (req, res, model, msg) => {
    try {
      console.log(req.body);
      console.log("model", model);
      const newData = await model.create(req.body);
      if (newData) {
        return APIResponse(`New ${msg} Added`, newData, res);
      }
      return APIResponse(
        "Something Went Wrong, Try again",
        null,
        res,
        false,
        500
      );
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
  addMany: async (req, res, model, msg) => {
    try {
      if (!Array.isArray(req.body))
        return APIResponse(
          "Invalid Data, An arrary is required",
          null,
          res,
          false,
          400
        );
      const newData = await model.insertMany(req.body);
      if (newData) {
        return APIResponse(`New ${msg} Added`, newData, res);
      }
      return APIResponse(
        "Something Went Wrong, Try again",
        null,
        res,
        false,
        500
      );
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
  addWithReturnId: async (req, res, model, msg) => {
    try {
      const newData = await model.create(req.body);
      if (newData) {
        return {
          status: true,
          data: newData,
        };
      }

      return {
        status: false,
        data: null,
      };
    } catch (error) {
      return {
        status: false,
        data: error,
      };
    }
  },
  addReturn: async (req, res, model, msg) => {
    try {
      const newData = await model.create(req.body);

      if (model.modelName === "option") {
        console.log("option");
        // update the question with the new option
        const updateQuestion = await models.questions.updateOne(
          { _id: req.body.questionId },
          { $push: { options: newData._id } },
          { new: true }
        );
        console.log("updateQuestion", updateQuestion);
        if (updateQuestion.modifiedCount === 0) {
          // if no question is updated, delete the option
          await models.option.deleteOne({
            _id: newData._id,
          });
          return {
            status: false,
            message: "Something Went Wrong while updating question",
            data: null,
          };
        }
      }
      if (newData) {
        return {
          status: true,
          message: `New ${msg} Added`,
          data: newData,
        };
      }
      return {
        status: false,
        message: "Something Went Wrong, Try again",
        data: null,
      };
    } catch (error) {
      return {
        status: false,
        message: "Something Went Wrong",
        data: error.message,
      };
    }
  },
  edit: async (req, res, model, msg) => {
    try {
      const newData = await model.findById(req.params.id);
      if (newData) {
        const keys = Object.keys(req.body);
        keys.forEach((key) => (newData[key] = req.body[key]));
        const updatedData = await newData.save({ new: true });
        return APIResponse(`${msg} Updated`, updatedData, res);
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
  editReturn: async (req, res, model, msg) => {
    try {
      const newData = await model.findById(req.params.id);
      if (newData) {
        const keys = Object.keys(req.body);
        keys.forEach((key) => (newData[key] = req.body[key]));
        const updatedData = await newData.save({ new: true });
        return {
          status: true,
          message: `${msg} Updated`,
          data: updatedData,
        };
      }
      return {
        status: false,
        message: `${msg} Not Found`,
        data: null,
      };
    } catch (error) {
      return {
        status: false,
        message: "Something Went Wrong",
        data: error.message,
      };
    }
  },
  getAll: async (req, res, model, msg) => {
    try {
      const newData = await model.paginate(
        {},
        {
          limit: req.query.limit ? req.query.limit : 10,
          page: req.query.page ? req.query.page : 1,
        }
      );

      if (newData.docs.length > 0) {
        return APIResponse(`All ${msg}`, newData, res);
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
  getAllPopulate: async (req, res, model, msg , populateModels) => {
    try {
      console.log({
        limit: req.query.limit ? req.query.limit : 10,
        page: req.query.page ? req.query.page : 1,
        populate:populateModels.map((model)=>{return {path:model}})
      })
      const newData = await model.paginate(
        {},
        {
          limit: req.query.limit ? req.query.limit : 10,
          page: req.query.page ? req.query.page : 1,
          populate:populateModels.map((model)=>{return {path:model}})
        }
      );

      if (newData.docs.length > 0) {
        return APIResponse(`All ${msg}`, newData, res);
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
  getById: async (req, res, model, msg) => {
    try {
      console.log(req.params.id);
      const newData = await model.findById(req.params.id);
      if (newData) {
        return APIResponse(`${msg}`, newData, res);
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
  getByIdPopulate: async (req, res, model, msg, populateModels) => {
    try {
      console.log(req.params.id);
      const newData = await populateModels.reduce((query, modelName) => {
        return query.populate(modelName);
      }, model.findById(req.params.id));
      if (newData) {
        return APIResponse(`${msg}`, newData, res);
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
      const deletedUser = await model.findByIdAndDelete(req.params.id);
      if (deletedUser) {
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
module.exports = generatorObject;
