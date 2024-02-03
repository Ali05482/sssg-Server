const models = require("../../../../models");
const { validationResult } = require("express-validator");
const services = require("../../../../services");
const questionFolder = {
    add: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({status:false, msg:"Invalid Inputs, Please make sure you are filling every feild",  data: errors.array() });
        }
        const checkType = await models.questionTypes.findOne({name:req.body.name});
        if(checkType){
            return res.json({ status: false, msg:"Question type already exists", data:null })
        }
        req.body.user=req.user.id
        await services.generator.add(
          req,
          res,
          models.questionFolder,
          "Question folder"
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
          models.questionFolder,
          "Question folder"
        );
      },
      getAll: async (req, res) => {
        try {
          const folders = await models.questionFolder.find();
          return res.json({status:true, msg:"All Question Folder", data:folders})
        } catch (error) {
          return res.status(500).json({status:true, msg:"Something Went Wrong", data:null})
        }
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
          models.questionFolder,
          "Question folder"
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
          models.questionFolder,
          "Question folder"
        );
      },
}
module.exports = questionFolder;

