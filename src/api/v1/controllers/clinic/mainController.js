
const models = require("../../../../models");

const { validationResult } = require("express-validator");
const services = require("../../../../services");
const clinicControl = {
  add: async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({status:false, msg:"Invalid Inputs, Please make sure you are filling every feild",  data: errors.array() });
    }

    await services.generator.add(
      req,
      res,
      models.clinic,
      "Clinic"
    );
  },
  edit: async (req, res) => {
    if (!req.params.id) {
      return res.status(400).json({
        errors: [{ msg: "ID is required to edit", param: "id" }],
      });
    }
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await services.generator.edit(
      req,
      res,
      models.clinic,
      "Clinic "
    );
  },
  getAll: async (req, res) => {
    await services.generator.getAll(
      req,
      res,
      models.clinic,
      "Clinic"
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
      models.clinic,
      "Clinic"
    );
  },
  deleteById: async (req, res) => {
    // Check if ID parameter is missing in the request
    if (!req.params.id) {
      return res.status(400).json({
        errors: [{ msg: "ID is required to delete", param: "id" }],
      });
    }
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await services.generator.deleteById(
      req,
      res,
      models.clinic,
      "Clinic"
    );
  },
};

module.exports = clinicControl;
