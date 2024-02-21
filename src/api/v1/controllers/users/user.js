const users = {};
const { APIResponse } = require("../../../../helper");
const models = require("../../../../models/");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const services = require("../../../../services");
const _ = require('lodash');
users.fetchAllUsersPaginate = async (req, res) => {
  try {
    const condition = req.params.type == "all" ? {} : {
      role: req.params.type == "all" ? '' : req.params.type
    }
    const newData = await models.user.paginate(
      condition,
      {
        limit: req.query.limit ? req.query.limit : 10,
        page: req.query.page ? req.query.page : 1,
      }
    );
    return APIResponse(`All ${req.params.type}`, newData, res);
  } catch (error) {
    return APIResponse(
      "Something Went Wrong",
      error.message,
      res,
      false,
      500
    );
  }
}
users.fetchAllUsers = async (req, res) => {
  try {
    const condition = req.params.type == "all" ? {} : { role: req.params.type }
    const newData = await models.user.find(condition)
    return APIResponse(`All ${req.params.type}`, { docs: newData }, res);
  } catch (error) {
    return APIResponse(
      "Something Went Wrong",
      error.message,
      res,
      false,
      500
    );
  }
}
users.generatePaassword = async (password) => {
  const salth = await bcrypt.genSalt(10);
  const newPassword = await bcrypt.hash(password, salth);
  return newPassword;
};
users.add = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: false, msg: "Invalid Inputs, Please make sure you are filling every felid", data: errors.array() });
    }
    if (req.body.role === "doctor") {
      if ((_?.isNull(req.body.other.specialty) || _.isEmpty(req.body.other.specialty) || _.isUndefined(req.body.other.specialty))
        || (_?.isNull(req.body.other.availability) || _.isEmpty(req.body.other.availability) || _.isUndefined(req.body.other.availability))
      ) {
        return res
          .status(400)
          .json({ status: false, msg: "Un-able to add doctor, Please fill all input felids", data: null });
      }
    }
    const checkSer = await models.user.findOne({
      $or: [
        {
          email: req.body.email
        },
        {
          phoneNumber: req.body.phoneNumber
        }
      ]
    });
    if (checkSer) {
      return res.json({ status: false, alreadyExists: true, data: checkSer, msg: `This ${req.body.role} already registered against ${checkSer.phoneNumber == req.body.phoneNumber ? "Phone:" + req.body.phoneNumber : ''}${checkSer.email == req.body.email ? " && Email:" + req.body.email : ''}` })
    }
    req.body.password = await users.generatePaassword(req.body.password);
    const User = await models.user.create(req.body);
    if (User) {
      await models.settings.create({ user: User._id });
      if (req.body.role === "doctor") {
        req.body.other.user = User._id
        const newDoctor = await models.doctor.create(req.body.other);
        if (!newDoctor) {
          await models.user.findByIdAndDelete(User?._id)
          return res
            .status(400)
            .json({ status: false, msg: "Un-able to add doctor, try again", data: User });
        }
        User.typeId = newDoctor._id;
        const updateUser = await User.save({ new: true });
        return res
          .status(200)
          .json({ status: true, msg: "User Created Successfully", data: { doctor: updateUser, info: newDoctor } });

      } else if (req.body.role === "patient") {
        req.body.other.user = User?._id
        const newPatient = await models.patient.create(req.body.other);
        if (!newPatient) {
          await models.user.findByIdAndDelete(User._id)
          return res
            .status(400)
            .json({ status: false, msg: "Un-able to add patient", data: null });

        }
        User.typeId = newPatient._id;
        const updateUser = await User.save({ new: true });
        return res
          .status(200)
          .json({ status: false, msg: "User Created Successfully", data: { patient: updateUser, info: newPatient } });
      } else if (req.body.role === "admin" || req.body.role === "user" || req.body.role==="compodar" || req.body.role==="schedulingTeam") {
        return res
          .status(200)
          .json({ status: true, msg: "User Created Successfully", data: { User: User } });
      }
    }
  } catch (error) {
    return res
      .status(400)
      .json({ status: false, msg: error.message, data: null });
  }
};

users.edit = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  if (req.body.password) {
    req.body.password = await users.generatePaassword(req.body.password);
  }
  try {
    await services.generator.edit(
      req,
      res,
      models.user,
      "User "
    );
  } catch (error) {
    return res.json({ status: true, msg: "Something Went Wrong", data: null })
  }
},
  users.getById = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ status: false, msg: "Invalid Inputs, Please make sure you are filling every felid", data: errors.array() });
      }
      const User = await models.user.findById(req.params.id);
      if (User) {
        if ((!req.user.id === User._id)) {
          return res.status(401).json({ status: false, msg: "Un-Authenticated", data: null })
        }
        let other;
        if (User.role === "admin" || User.role === "user") {
          return res.json({ status: true, data: User, msg: "User Fetched Successfully" })
        } else if (User.role === "doctor") {
          other = await models.doctor.findOne({ user: User._id });
        } else if (User.role === "patient") {
          other = await models.patient.findOne({ user: User._id });
        }
        return res.status(200).json({ status: true, msg: "User Fetched", data: { user: User, other } });
      }
      return res.status(200).json({ status: false, msg: "User not found", data: null });
    } catch (error) {
      return res.status(500).json({ status: false, msg: "Something Went Wrong", data: null })
    }

  }



users.getByIdUnique = async (req, res) => {
  try {
    const User = await models.user.findById(req.params.id).populate("platformId");

    if (User?.role === "doctor") {
      const doctor = await models.doctor.findOne({ user: User._id });
      User.doctor = {}
      User.doctor = doctor
    } else if (User?.role === "patient") {
      const patient = await models.patient.findOne({ user: User._id });
      User.patient = {}
      User.patient = patient
    }
    if ((!req?.user?.id === User?._id)) {
      return res.status(401).json({ status: false, msg: "Un-Authenticated", data: null })
    }
    return res.status(200).json({ status: true, msg: "User Fetched", data: User });
  } catch (error) {
    return res
      .status(500)
      .json({ status: true, msg: "Something Went Wrong", data: null });
  }
}

users.addAttendants = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: false, msg: "Invalid Inputs, Please make sure you are filling every felid", data: errors.array() });
    }
    const addAttendants = await models.user.findOne({ $or: [{ email: req?.body?.email }, { phoneNumber: req?.body?.phoneNumber }] });
    if (addAttendants) {
      return res.status(400).json({ status: false, msg: `This Attendant already exists with ${addAttendants?.email} OR ${addAttendants?.phoneNumber}`, data: null });
    }
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt?.hash(req?.body?.password, salt);
    req.body.password = newPassword;
    req.body.role = "compodar";
    const newUser = await models.user.create(req?.body);
    return res.status(200).json({ status: true, msg: "Attendant Added Successfully", data: newUser });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, msg: "Something Went Wrong", data: null });
  }
}

users.editAttendants = async (req, res) => {
  try {
    const newUser = await models.user.findByIdAndUpdate(req?.params?.id, req?.body, { new: true });
    return res.status(200).json({ status: true, msg: "Attendant Updated Successfully", data: newUser });
  } catch (error) {
    return res
      .status(500)
      .json({ status: true, msg: "Something Went Wrong", data: null });
  }
}
users.getAllAttendants = async (req, res) => {
  try {
    const getAllAttendants = await models.user.find({ role: "compodar" }).populate("clinicId");
    return res.status(200).json({ status: true, msg: "Attendants Fetched Successfully", data: getAllAttendants });
  } catch (error) {
    return res
      .status(500)
      .json({ status: true, msg: "Something Went Wrong", data: null });
  }
}



module.exports = users;