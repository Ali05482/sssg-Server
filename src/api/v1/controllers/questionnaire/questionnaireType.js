const models = require("../../../../models");
const { validationResult } = require("express-validator");
const services = require("../../../../services");
const questionnaireType = {
    add: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({status:false, msg:"Invalid Inputs, Please make sure you are filling every feild",  data: errors.array() });
        }
        const checkType = await models.questionTypes.findOne({name:req.body.name});
        if(checkType){
            return res.json({ status: false, msg:"Question type already exists", data:null })
        }
        await services.generator.add(
          req,
          res,
          models.questionTypes,
          "Question type"
        );
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
          models.questionTypes,
          "Question type"
        );
      },
      getAll: async (req, res) => {
        await services.generator.getAll(
          req,
          res,
          models.questionTypes,
          "Question type"
        );
      },
      getById: async (req, res) => {
        if (!req.params.id) {
          return res.status(400).json({
            errors: [{ msg: "ID is required to get Appointment", param: "id" }],
          });
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        await services.generator.getById(
          req,
          res,
          models.questionTypes,
          "Question type"
        );
      },
      deleteById: async (req, res) => {
        // Check if ID parameter is missing in the request
        if (!req.params.id) {
          return res.status(400).json({
            errors: [{ msg: "ID is required to delete", param: "id" }],
          });
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        await services.generator.deleteById(
          req,
          res,
          models.questionTypes,
          "Question type"
        );
      },
}
module.exports = questionnaireType;

