const { body } = require("express-validator");

const addGroup = [
    body("groupName").notEmpty().withMessage("Group Name is required"),
    body("groupType").notEmpty().withMessage("Group Type is required"),
    body("mainType") .notEmpty().withMessage('Group Type is required').isIn(['body', 'mind', 'sleep']).withMessage('Group Type must be one of: body, mind, sleep'),
  ];
  module.exports =  addGroup ;