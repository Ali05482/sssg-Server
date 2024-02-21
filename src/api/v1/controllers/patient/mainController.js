
const models = require("../../../../models");
const bcrypt = require('bcrypt');
const { validationResult, check } = require("express-validator");
const services = require("../../../../services");
const patientControl = {
  add: async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).json({ status: false, msg: "Please verify all input feilds", data: errors.array() });
    }
    req.body.role = "patient"
    const createdUser = await services.generator.addWithReturnId(
      req,
      res,
      models.user,
      "Patient User"
    );
    if (createdUser.status) {
      req.body.userId = createdUser.data._id
      const createdPatient = await services.generator.addWithReturnId(
        req,
        res,
        models.patient,
        "Patient "
      );


      if (createdPatient.status) {
        await services.generator.add(
          req,
          res,
          models.appiontment,
          "Appointment "
        );
      }
    }
  },
  generatePaassword: async (password) => {
    const salth = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salth);
    return newPassword;
  },
  addPatientOnly: async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).json({ status: false, msg: "Please verify all input feilds", data: errors.array() });
    }
    const checker = await models.user.findOne({
      $or: [
        {
          email: req.body.email
        },
        {
          phoneNumber: req.body.phoneNumber
        }
      ]
    });
    if (checker) {
      return res.json({ status: false, alreadyExists: true, data: checker, msg: `The patient is already registered against ${checker.phoneNumber == req.body.phoneNumber ? "Phone: & " + req.body.phoneNumber : ''}${checker.email == req.body.email ? " Email:" + req.body.email : ''}`, data:null })
    }
    req.body.role = "patient"
    req.body.password = await patientControl.generatePaassword(req.body.password);
    const createdUser = await services.generator.addWithReturnId(
      req,
      res,
      models.user,
      "Patient User"
    );
    if (createdUser.status) {
      req.body.userId = createdUser.data._id
      await services.generator.add(
        req,
        res,
        models.patient,
        "Patient "
      );



    }
  },
  // edit: async (req, res) => {
  //   if (!req.params.id) {
  //     return res.status(400).json({
  //       errors: [{ msg: "ID is required to edit", param: "id" }],
  //     });
  //   }
  //   // Check for validation errors
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     return res.status(400).json({ errors: errors.array() });
  //   }
  //   await services.generator.edit(
  //     req,
  //     res,
  //     models.clinic,
  //     "Clinic"
  //   );
  // },
  getAll: async (req, res) => {
    await services.generator.getAllPopulate(
      req,
      res,
      models.patient,
      "Patient ",
      ['user']
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
    const checker = await models.user.findOne({
      $or: [
        {
          email: req.body.email
        },
        {
          phoneNumber: req.body.phoneNumber
        }
      ]
    });
    await services.generator.getByIdPopulate(
      req,
      res,
      models.patient,
      "Patient "
    );
  },
  searchPatient: async (req, res) => {
   try {
    const patient = await models.user.findOne({
      $or: [
        {
          email: req?.params?.id
        },
        {
          phoneNumber: req?.params?.id
        }
      ]
    });
    if(patient){
      return res.json({status:true, msg:"Patient", data:patient});
    }
    return res.json({status:false, msg:"Patient Not Found", data:null});
   } catch (error) {
    return res.status(500).json({status:false, msg:"Internal Server Error", data:null})
   }
    
  },
  // deleteById: async (req, res) => {
  //   // Check if ID parameter is missing in the request
  //   if (!req.params.id) {
  //     return res.status(400).json({
  //       errors: [{ msg: "ID is required to delete", param: "id" }],
  //     });
  //   }
  //   // Check for validation errors
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     return res.status(400).json({ errors: errors.array() });
  //   }
  //   await services.generator.deleteById(
  //     req,
  //     res,
  //     models.clinic,
  //     "Clinic"
  //   );
  // },
};

module.exports = patientControl;
