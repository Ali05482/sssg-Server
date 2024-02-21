
const models = require("../../../../models");

const { validationResult } = require("express-validator");
const services = require("../../../../services");
const { APIResponse } = require("../../../../helper");

const meetingControl = {
  add: async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    await services.generator.add(
      req,
      res,
      models.userMeetings,
      "Meeting "
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
      models.userMeetings,
      "Meeting "
    );
  },
  getAll: async (req, res) => {
    await services.generator.getAll(
      req,
      res,
      models.userMeetings,
      "Meeting "
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
      models.userMeetings,
      "Meeting "
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
      models.userMeetings,
      "Meeting "
    );
  },
  validateMeeting: async (req, res) => {
     try {
      const validate = await models.userMeetings.findOne({
        user:req.user._id,
        meeetingId:req.params.id
      });
      if(validate){
        return APIResponse(`Available`, null, res);
      } 
       return APIResponse(
        "Un-Authorized",
        null,
        res,
        false,
        401
      );
     } catch (error) {
      return APIResponse(
        "Un-Authorized",
        error.message,
        res,
        false,
        401
      );
     }
  },
};

module.exports = meetingControl;
