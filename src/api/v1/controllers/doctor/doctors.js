const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const models = require("../../../../models");
const services = require("../../../../services");
const doctors = {
  add: async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    await services.generator.add(req, res, models.doctor, "Doctor ");
  },
  edit: async (req, res) => {
    // Check for validation errors
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
    await services.generator.edit(req, res, models.doctor, "Doctor ");
  },
  getAll: async (req, res) => {
    await services.generator.getAll(req, res, models.doctor, "Doctors ");
  },
  getById: async (req, res) => {
    if (!req.params.id) {
      return res.status(400).json({
        errors: [{ msg: "ID is required to get group", param: "id" }],
      });
    }
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await services.generator.getById(req, res, models.doctor, "Doctor ");
  },
  deleteById: async (req, res) => {
    // Check if ID parameter is missing in the request
    if (!req.params.id) {
      return res.status(400).json({
        errors: [{ msg: "ID is required to delete Doctor", param: "id" }],
      });
    }
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await services.generator.deleteById(req, res, models.doctor, "Doctor ");
  },
};

module.exports = doctors;
