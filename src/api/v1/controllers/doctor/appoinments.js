const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const models = require("../../../../models");
const services = require("../../../../services");
const doctorsAppointments = {
  add: async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    await services.generator.add(
      req,
      res,
      models.doctorAppointment,
      "Doctor Appoinments "
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
      models.doctorAppointment,
      "Doctor "
    );
  },
  getAll: async (req, res) => {
    await services.generator.getAll(
      req,
      res,
      models.doctorAppointment,
      "Doctor Appoinments "
    );
  },
  getById: async (req, res) => {
    if (!req.params.id) {
      return res.status(400).json({
        errors: [{ msg: "ID is required to get Appointment", param: "id" }],
      });
    }
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await services.generator.getById(
      req,
      res,
      models.doctorAppointment,
      "Doctor Appoinments "
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
      models.doctorAppointment,
      "Doctor Appoinments "
    );
  },
};

module.exports = doctorsAppointments;
