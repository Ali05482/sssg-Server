
const models = require("../../../../models");

const { validationResult } = require("express-validator");
const services = require("../../../../services");
const { APIResponse } = require("../../../../helper");
const _ = require("lodash");
const { ObjectId } = require("mongodb");
const { inviteDoctor } = require("../../../../services/email");
const doctorControl = {
  add: async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      req.body.role = "doctor"
      const createdUser = await services.generator.addWithReturnId(
        req,
        res,
        models.user,
        "Doctor User"
      );
      if (createdUser.status) {
        req.body.user = createdUser.data._id
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
      let doctors = await models.user.find({ role: { $in: ["doctor"] } }).populate('clinicId').lean();
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
  addAndEditDoctor: async (req, res) => {
    try {
      req.body.role = "doctor"
      if (!_?.isEmpty(req?.body?._id)) {
        delete req.body.retypePassword;
        delete req.body.password
        const doctor = await models.user.findByIdAndUpdate(req?.body?._id, req?.body);
        if (doctor) {
          const updatedDoctorInfo = {
            specialty: req?.body?.specialty,
            availability: req?.body?.availability,
            biography: req?.body?.biography,
            licenseNumber: req?.body?.licenseNumber,
            faxNumber: req?.body?.faxNumber
          }
          const updateDoctorInfo = await models.doctor.findByIdAndUpdate(req?.body?.doctor?._id, updatedDoctorInfo);
          return res.json({ status: true, msg: "Doctor Updated", data: doctor })
        }

      } else {
        delete req.body._id
        const findDoctor = await models.user.findOne({
          $or: [
            { email: req?.body?.email },
            { faxNumber: req?.body?.faxNumber },
            { phoneNumber: req?.body?.phoneNumber },
            { licenseNumber: req?.body?.licenseNumber },
            { providerNumber: req?.body?.providerNumber },
          ]
        }).lean();
        if (findDoctor) {
          const show = [
            findDoctor?.email,
            findDoctor?.faxNumber,
            findDoctor?.phoneNumber,
            findDoctor?.licenseNumber,
            findDoctor?.providerNumber
          ];
          return res.json({ status: false, msg: "Doctor Already Exist with " + show?.map(x => x ?? ""), data: null })
        }
        const newDoctor = await models.user.create(req?.body);
        if (newDoctor) {
          const doctorInfo = {
            user: newDoctor._id,
            specialty: req?.body?.specialty,
            availability: req?.body?.availability,
            biography: req?.body?.biography,
            licenseNumber: req?.body?.licenseNumber,
            faxNumber: req?.body?.faxNumber
          }
          await models.doctor.create(doctorInfo);
          return res.json({ status: true, msg: "Doctor Added", data: newDoctor })
        }
        return res.json({ status: false, msg: "Doctor Added Successfully", data: null })
      }

    } catch (error) {
      console.log("error?.message", error?.message)
      return res?.status(500).json({ status: false, msg: "Something went wrong", data: null })
    }
  },
  getAllDoctorsForDoctors: async (req, res) => {
    try {
      const doctors = await models.user.find({ role: "doctor" }).populate('clinicId').lean();
      const doctorsInfo = await models.doctor.find({ user: { $in: doctors.map(item => item._id) } }).lean();
      const editedDoctors = []
      doctors?.forEach((item, index) => {
        item.doctor = Object
        let doctorInfo = {}
        let editedDoctor = {
          ...item,
          specialty: doctorsInfo?.find(doctor => doctor?.user?.toString() === item?._id?.toString())?.specialty || "",
          availability: doctorsInfo?.find(doctor => doctor?.user?.toString() === item?._id?.toString())?.availability || "",
          biography: doctorsInfo?.find(doctor => doctor?.user?.toString() === item?._id?.toString())?.biography || "",
          doctor: {}
        }
        for (let i = 0; i < doctorsInfo.length; i++) {
          if (doctorsInfo[i]?.user?.toString() === item?._id?.toString()) {
            doctorsInfo[i].user = item
            doctorInfo = doctorsInfo[i]
            break;
          }
        }
        editedDoctor.doctor = doctorInfo;
        editedDoctors.push(editedDoctor)
      })

      return res.json({ status: true, msg: "All Doctors", data: editedDoctors })
    } catch (error) {
      console.log("error?.message", error?.message)
      return res?.json({ status: false, msg: "Something went wrong", data: null })
    }
  },
  inviteDoctor: async (req, res) => {
    try {
      const inviter = await models.user.findOne({ email: req?.body?.email });
      if (_?.isEmpty(inviter)) {
        const doctor = await models.doctor.findOne({ user: req?.user?.id });
        const invite = await inviteDoctor(req?.body?.email, "Invitation to Fitwell Hub", `You have been invited to join Fitwell Hub by Dr. ${req?.user?.firstName} ${req?.user?.lastName} (${doctor?.specialty}). Please click the link below to join. <a href="https://fitwellhub.com">Fitwell Hub</a>`);
        console.log("invite", invite)
        if (invite?.status) {
          return res?.json({ status: true, msg: "Doctor Invited", data: null });
        } else {
          return res?.json({ status: false, msg: "Invitation Failed, Reason: " + inviteDoctor?.msg, data: null });
        }
      } else {
        return res?.json({ status: false, msg: "This user is already our member", data: null })
      }
    } catch (error) {
      console.log("error?.message", error?.message)
      return res?.json({ status: false, msg: "Something went wrong", data: null })
    }
  }
};

module.exports = doctorControl;
