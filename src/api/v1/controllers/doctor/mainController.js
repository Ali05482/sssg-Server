
const models = require("../../../../models");

const { validationResult } = require("express-validator");
const services = require("../../../../services");
const { APIResponse } = require("../../../../helper");
const doctorControl = {
  add: async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      console.log("checking......")
      req.body.role = "doctor"
      const createdUser = await services.generator.addWithReturnId(
        req,
        res,
        models.user,
        "Doctor User"
      );
      console.log(createdUser.status)
      if (createdUser.status) {
        req.body.user = createdUser.data._id
        console.log("hello")
        await services.generator.add(
          req,
          res,
          models.doctor,
          "Appointment "
        );

      } else {
        return APIResponse(
          `Something Went Wrong, Try again, ${createdUser.data}`,
          null,
          res,
          false,
          500
        );
      }
    } catch (error) {
      return APIResponse(
        `Something Went Wrong, Try again, ${error.message}`,
        null,
        res,
        false,
        500
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
    try {
      let doctors = await models.user.find({ role: { $in: ["doctor"] } }).lean();
      const editedDoctors = []
      const doctorInformation = await models.doctor.find({ user: { $in: doctors.map(item => item._id) } });
      doctors?.forEach((item, index) => {
        item.doctor = Object
        let doctorInfo = {}
        let editedDoctor = {
          ...item,
          doctor: {}
        }
        for (let i = 0; i < doctorInformation.length; i++) {
          if (doctorInformation[i]?.user?.toString() === item?._id?.toString()) {
            doctorInformation[i].user = item
            doctorInfo = doctorInformation[i]
            break;
          }
        }
        editedDoctor.doctor = doctorInfo;
        editedDoctors.push(editedDoctor)
      })
      const patientLastAccessed = await models.appiontment.find({ patient: req?.params?.patientId })
        .sort({ timestamp: -1 })  // Assuming timestamp is the field you want to use for sorting
        .skip(1)  // Skip the latest record
        .limit(1);
        console.log("patientLastAccessed===>", editedDoctors)
      return res.json({ status: true, msg: "All Doctors", data: editedDoctors, lastAccessed: patientLastAccessed })
    } catch (error) {
      console.log("error?.message", error?.message)
      return res?.json({ status: false, msg: "Something went wrong", data: null })
    }
  },
  getDoctorsForScheduling: async (req, res) => {
    try {
      const doctors = await models.doctor.find({}).populate("user");
      return res.json({ status: true, msg: "All Doctors", data: doctors })
    } catch (error) {
      return res?.json({ status: false, msg: "Something went wrong", data: null })
    }
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
    await services.generator.getByIdPopulate(
      req,
      res,
      models.doctor,
      "Doctor "
    );
  },
};

module.exports = doctorControl;
