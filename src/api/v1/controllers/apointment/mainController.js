
const models = require("../../../../models");
const gmailSender = require('../../../../services/email')
const { validationResult } = require("express-validator");
const services = require("../../../../services");
const { APIResponse } = require("../../../../helper");
const bcrypt = require("bcrypt");
const _ = require('lodash');
const { v4: uuidv4, v4 } = require('uuid');
const { convertTimeToMinutes } = require("../doctor/doctorsSchedules");
const apointmentControl = {
  generatePaassword: async (password) => {
    const salth = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salth);
    return newPassword;
  },
  add: async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    req.body.role = "patient"
    const createdUser = await services.generator.addWithReturnId(
      req,
      res,
      models.user,
      "Patient User"
    );
    if (createdUser.status) {
      req.body.user = createdUser.data._id
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
    } else {
      return APIResponse(
        `Something Went Wrong, Try again, ${createdUser.data}`,
        null,
        res,
        false,
        500
      );
    }
  },
  validateDateTime: (dateInput, timeInput) => {
    const dateTimeString = dateInput + 'T' + timeInput;
    const selectedDateTime = new Date(dateTimeString);
    const currentDateTime = new Date();

    if (selectedDateTime < currentDateTime) {
      return true
    } else {
      return false
    }
  },
  createMeetingLink: async (data) => {
    try {
      const meeting = await models.userMeetings.create(data);
      if (meeting) {
        const meetingLink = `http://localhost:3000/ui/video/patient/chat/${meeting.meeetingId}`;
        return meetingLink
      }
    } catch (error) {
      return '';
    }
  },
  createAppointment: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).json({ status: false, msg: "Something Went Wrong, Try Again", data: null })
    }
    req.body.role = "patient";
    const newAppintment = await models.appiontment.create(req.body);
    if (!newAppintment) {
      return res.status(200).json({ status: false, msg: "Something Went Wrong, Try Again", data: null })
    }
    const sendEmail = await gmailSender.gmailSender(
      req.body.email,
      `Appointment Confirmation - ${req.body.date} ${req.body.time}`,
      `${req.body.firstName} ${req.body.lastName}`,
      `${req.body.doctorName}`,
      req.body.appointmentMedium,
      req.body.date,
      req.body.time,
      "https://alitechstorm.com/",
      "https://alitechstorm.com/",
      req
    );
    if (!sendEmail) {
      return res.json({ status: true, data: { user, newPatent }, msg: "Appointment is registered successfully, But failed to send email, Please go to failed email section and try from their" })
    }
    return res.json({ status: false, alreadyExists: true, data: { user, newPatent }, msg: "Appointment is registered successfully" });
  },
  createAppointMentPlusUser: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: false, msg: "Invalid Inputs, Please make sure you are filling every feild", data: errors.array() });
    }
    try {
      req.body.role = "patient";
      let query = {};
      if(!_?.isEmpty(req?.body?.email)){
        {
          query = {
            $or: [
              {
                email: req.body.email,
              },
              {
                phoneNumber: req.body.phoneNumber
              }
            ]
          }
        }
      } else {
        query = {
          phoneNumber: req.body.phoneNumber
        }
        req.body.email = null;
      }
      console.log(query, "=====>")
      const user = await models.user.findOne(query);
      if (user) {
        return res.json({ status: false, msg: `Patient already exists with  ${user?.phoneNumber ?? 'Phone: ' + user?.phoneNumber}   ${user?.email ?? "Email: " + user?.email}, Please search with mobile number or email, and create appointments`, data: null })
      }
      else {
        req.body.password = await apointmentControl.generatePaassword(req.body.password);
        const newPatent = await models.user.create(req.body);

        if (newPatent) {
          req.body.user = req?.body?.user?.id;
          req.body.patient = newPatent?._id;
          const newAppintment = await models.appiontment.create(req.body);
          if (!newAppintment) {
            await models.user.findByIdAndDelete(newPatent._id);
            return res.status(400).json({ status: false, msg: "Something Went Wrong, Try Again", data: null })
          }
          const historyLink = "https://sss-g-client.vercel.app/ui/questionaires/display/654942246601e15b38572359?appointment=" + newAppintment?._id;
          const sendEmail = await gmailSender.gmailSender(
            req.body.email,
            `Appointment Confirmation - ${req.body.date} ${req.body.time}`,
            `${req.body.firstName} ${req.body.lastName}`,
            `${req.body.doctorName}`,
            req.body.appointmentMedium,
            req.body.date,
            req.body.time,
            "https://alitechstorm.com/",
            historyLink,
            req,
            req?.body?.phoneNumber,
            "12345678"
          );
          return res.json({ status: true, alreadyExists: true, data: { user, newPatent }, msg: `Appointment is started successfully, AppointmentId:  ${newAppintment?.appointmentUniqueId}` });
        } else {
          return res.status(400).json({ status: false, msg: "Something Went Wrong", data: null })
        }
      }
    } catch (error) {
      console.log("error.message", error.message)
      return res.status(500).json({ status: false, msg: "Something Went Wrong", data: error.message })
    }
  },
  getAll: async (req, res) => {
    let query = {}
    if (req?.user?.role === "doctor") {
      query = {
        doctor: req?.user?.id,
      }
    } else if (req?.user?.role === "patient") {
      query = {
        patient: req?.user?.id,
      }
    }
    let allAppointments = await models.appiontment.find(query).populate("clinic").populate("doctor").populate("user").populate("patient").populate('questionaire');
    return res.json({ status: true, data: { docs: allAppointments }, msg: "All Appointments" });

  },
  getAppointmentsForVitals: async (req, res) => {
    try {
      const getAppointmentsForVitals = await models.appiontment.find({
        clinic: req?.user?.clinicId,
        vitals: { $exists: false },
        appointmentMedium: { $ne: "phone" }
      }).populate("patient").populate("questionaire");
      return res.json({ status: true, msg: "Appointments Fetched Successfully", data: getAppointmentsForVitals })
    } catch (error) {
      return res.status(500).json({ status: false, msg: "Something Went Wrong", data: error.message })
    }
  },
  getAppointmentsForScheduling: async (req, res) => {
    try {
      const getAppointmentsForScheduling = await models.appiontment.find({
        doctor: { $exists: false },
        $or: [
          { questionaire: { $exists: true } },
          { questionaire: { $ne: null } },
        ]


      }).populate("patient").populate("questionaire").populate("clinic");
      return res.json({ status: true, msg: "Appointments Fetched Successfully", data: getAppointmentsForScheduling })
    } catch (error) {
      return res.status(500).json({ status: false, msg: "Something Went Wrong", data: error.message })
    }
  },
  getIncrimentedTime: (fromTime, incriment) => {
    const timeString = fromTime;
    const [hours, minutes] = timeString?.split(':');
    const date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    date.setMinutes(date.getMinutes() + Number(incriment));
    const updatedHours = date.getHours();
    const updatedMinutes = date.getMinutes();
    const updatedTimeString = `${String(updatedHours).padStart(2, '0')}:${String(updatedMinutes).padStart(2, '0')}`;
    return updatedTimeString
  },
  createFilter: (data, clinic, date, time) => {
    return data?.map(x => {
      return {
        doctor: x?.doctorId?._id,
        clinic: clinic,
        date: date,
      };
    });
  },
  getDoctorsForApointments: async (req, res) => {
    try {
      const { dayName, time, clinic, duration, date } = req.params;
      const fromTime = time;
      const toTime = apointmentControl.getIncrimentedTime(fromTime, duration); let checkAvlaibility;
      checkAvlaibility = await models.doctorAvailability.find({ $and: [{ "day.day": dayName }, { clinicId: clinic }] }).populate("doctorId");

      if (!checkAvlaibility?.length > 0) {
        return res.json({ status: false, msg: "Doctors not availble in current filter", data: null });
      }
      const actualAvailable = [];
      for (let i = 0; i < checkAvlaibility?.length; i++) {
        if ((convertTimeToMinutes(fromTime) >= convertTimeToMinutes(checkAvlaibility[i]?.fromTime) && convertTimeToMinutes(toTime) <= convertTimeToMinutes(checkAvlaibility[i]?.toTime))) {
          actualAvailable.push(checkAvlaibility[i]);
        }
      }
      let checkifAlreadyExists = [];
      const filter = apointmentControl.createFilter(actualAvailable, clinic, date, time);
      if (filter?.length > 0) {
        checkifAlreadyExists = await models.appiontment.find({ $or: filter });
      }
      if (!checkifAlreadyExists.length > 0) {
        return res.json({ status: true, msg: "Available doctors", data: actualAvailable });
      }
      for (let i = 0; i < checkifAlreadyExists?.length; i++) {
        for (let j = 0; j < actualAvailable?.length; j++) {
          if (checkifAlreadyExists[i].doctor?.toString() === actualAvailable[j]?.doctorId?._id?.toString()) {
            actualAvailable[j].reserved.push({ reserved: `${checkifAlreadyExists[i]?.time} To ${apointmentControl.getIncrimentedTime(checkifAlreadyExists[i]?.time, checkifAlreadyExists[i]?.duration)}` })
          }
        }
      }
      return res.status(200).json({ status: true, msg: "Available doctors", data: actualAvailable });
    } catch (error) {
      return res.status(500).json({ status: false, msg: "Something Went Wrong", data: error.message });
    }
  },
  getById: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    await services.generator.getByIdPopulate(
      req,
      res,
      models.appiontment,
      "Apointments "
    );
  },
  validateAppointment: async (data, comming) => {
    let result = true;
    for (let i = 0; i < data?.length; i++) {
      if (convertTimeToMinutes(data[i].time) === convertTimeToMinutes(comming?.fromTime) || convertTimeToMinutes(apointmentControl.getIncrimentedTime(data[i].time, comming?.toTime)) === convertTimeToMinutes(comming?.toTime)) {
        result = false;
        break;
      }
      else if ((convertTimeToMinutes(data[i].time)) < convertTimeToMinutes(comming?.toTime) || convertTimeToMinutes(apointmentControl.getIncrimentedTime(data[i].time, comming?.toTime)) > convertTimeToMinutes(comming?.fromTime)) {
        result = false;
      }
    }
    return result
  },
  createAppointmentOnly: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ status: false, msg: "Invalid Inputs, Please make sure you are filling every feild", data: errors.array() });
      }
      const { clinic, date, patient } = req.body;
      const appointments = await models.appiontment.findOne({
        clinic, date, patient
      });
      req.body.user = req?.user?.id;
      if (appointments) {
        return res.json({ status: false, msg: "Appointment already exists against the date", data: null })
      }

      const addAppointmentOnly = await models.appiontment.create(req.body);
      const user = await models.user.findById(req?.patient);
      const historyLink = "https://sss-g-client.vercel.app/ui/questionaires/display/654942246601e15b38572359?appointment=" + addAppointmentOnly?._id;
      await gmailSender.gmailSender(
        user?.email,
        `Appointment Confirmation - ${addAppointmentOnly?.date}`,
        `${user?.firstName} ${user?.lastName}`,
        `${req.body.doctorName}`,
        addAppointmentOnly?.appointmentMedium,
        addAppointmentOnly?.date,
        addAppointmentOnly?.time,
        "https://alitechstorm.com/",
        historyLink,
        req,
        user?.phoneNumber,
        "12345678"
      );
      return res.json({ status: true, msg: `Appointment is started successfully, AppointmentId:  ${addAppointmentOnly?.appointmentUniqueId}` });
    } catch (error) {
      console.log(error.message)
      return res.status(500).json({ status: false, msg: "Something Went Wrong", data: null })
    }
  },
  updateAppointment: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ status: false, msg: "Invalid Inputs, Please make sure you are filling every feild", data: errors.array() });
      }
      const { doctorId, time, duration, appointmentId } = req.body;
      const findDoctor = await models.user.findById(doctorId);
      if (!findDoctor) {
        return res.json({ status: false, msg: "Doctor is unavailable, or not found", data: null })
      }
      const updateAppointment = await models.appiontment.findByIdAndUpdate(appointmentId, { doctor: doctorId, time, duration, meeetingId: findDoctor?.meetingId, status: "pending" });
      if (!updateAppointment) {
        return res.json({ status: false, msg: "Appointment not found", data: null })
      }
      return res.json({ status: true, msg: `Appointment Assigned OR Updated Successfully` });
    } catch (error) {
      console.log(error.message)
      return res.status(500).json({ status: false, msg: "Something Went Wrong", data: null })
    }
  },
  collectVitals: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const checkIfAlreadyExists = await models.vitals.findOne({ appointment: req.body?.appointment });
      if (checkIfAlreadyExists) {
        return res.json({ status: false, msg: "Vitals already collected against this appointment", data: checkIfAlreadyExists })
      }
      const vitals = await models.vitals.create(req.body);
      if (!vitals) {
        return res.json({ status: false, msg: "Something Went Wrong, Try gain please......", data: null })
      }
      await models.appiontment.findByIdAndUpdate(req.body?.appointment, { vitals: vitals?._id });
      return res.json({ status: true, msg: "Vitals Collected Successfully", data: vitals })
    } catch (error) {
      return res.status(500).json({ status: false, msg: "Something Went Wrong", data: null })
    }
  },
  editVitals: async (req, res) => {
    try {
      const checkIfAlreadyExists = await models.vitals.findOne({ appointment: req.body?.appointment });
      if (!checkIfAlreadyExists) {
        return res.json({ status: false, msg: "Vital Not Exists Anymore, Please add it", data: null })
      }
      const keys = Object.keys(req.body);
      keys?.forEach(x => (checkIfAlreadyExists[x] = req.body[x]));
      const updatedVitals = await checkIfAlreadyExists?.save({ new: true });
      if (!updatedVitals) {
        return res.json({ status: false, msg: "Something Went Wrong, Try gain please......", data: null })
      }
      return res.json({ status: true, msg: "Vitals are updated successfully", data: updatedVitals });
    } catch (error) {
      return res.status(500).json({ status: false, msg: "Something Went Wrong", data: null })
    }
  },
  getVitalsByAppointmentId: async (req, res) => {
    try {
      const allVitals = await models.vitals.find({ appointment: req.params?.id }).populate("appointment").populate("patient");
      return res.json({ status: true, msg: "All Vitals", data: allVitals });
    } catch (error) {
      return res.status(500).json({ status: false, msg: "Something Went Wrong", data: null })
    }

  },
  getTodaysAndNonQuestainredAppointment: async (req, res) => {
    try {
      const today = new Date();
      const threeDaysAgo = new Date(today);
      threeDaysAgo.setDate(today.getDate() - 3);
      const getAppoint = await models.appiontment.find({
        clinic: req?.user?.clinicId,
        $or: [
          { questionaire: { $exists: false } },
          { questionaire: null },
        ]
      }).populate("patient").populate("questionaire");
      return res.json({ status: true, msg: "Appoints Fetched Successfully", data: getAppoint })
    } catch (error) {
      console.log(error?.message)
      return res.status(500).json({ status: false, msg: "Something Went Wrong", data: null })
    }
  },
  getAppointmentsForCare: async (req, res) => {
    try {

      const getAppoint = await models.appiontment.find({
        clinic: req?.user?.clinicId,
        status: { $ne: "careApproved" },
        $or: [
          {
            $or: [
              { sickNote: { $exists: true } },
              { sickNote: { $ne: null } },
            ],
          },
          {
            $or: [
              { prescription: { $exists: true } },
              { prescription: { $ne: null } },
            ],
          },
          {
            $or: [
              { requisition: { $exists: true } },
              { requisition: { $ne: null } },
            ],
          },
        ],

      }).populate("patient").populate("questionaire");
      return res.json({ status: true, msg: "Appoints Fetched Successfully", data: getAppoint })
    } catch (error) {
      console.log(error?.message)
      return res.status(500).json({ status: false, msg: "Something Went Wrong", data: null })
    }
  },
  getAppointmentsForMeeting: async (req, res) => {
    try {
      const getAppoint = await models.appiontment.find({
        clinic: req?.user?.clinicId,
        $or: [
          { doctor: { $exists: true } },
          { doctor: { $ne: null } },
        ],
        status: "pending",
      }).populate("patient").populate("questionaire").populate("doctor").sort({ createdAt: -1 });
      return res.json({ status: true, msg: "Appoints Fetched Successfully", data: getAppoint })
    } catch (error) {
      return res.status(500).json({ status: false, msg: "Something Went Wrong", data: null })
    }
  },
  updateAppointmentStatus: async (req, res) => {
    try {
      const updateAppointment = await models.appiontment.findByIdAndUpdate(req?.params?.id, {
        status: req?.body?.status,
        isLive: false,
        inConnection: false

      });
      if (!updateAppointment) {
        return res.json({ status: false, msg: "Appointment not found", data: null })
      }
      return res.json({ status: true, msg: "Appointment Status Updated Successfully", data: updateAppointment })
    } catch (error) {
      console.log(error?.message)
      return res.json({ status: false, msg: "Something Went Wrong", data: null })
    }
  },
  notifyDoctor: async (req, res) => {
    try {
      if (_?.isEmpty(req?.body?.appointmentId)) {
        return res.json({ status: false, msg: "AppointmentId is required", data: null })
      }
      const appointment = await models.appiontment.findByIdAndUpdate(req?.body?.appointmentId, { isLive: true });
      if (!appointment) {
        return res.status(500).json({ status: false, msg: "Appointment not found", data: null })
      }
      return res.json({ status: true, msg: "Appointment Status Updated Successfully", data: appointment })
    } catch (error) {
      console.log(error?.message)
      return res.json({ status: false, msg: "Something Went Wrong", data: null })
    }
  },
  getDoctorsTodaysAppointments: async (req, res) => {
    try {
      let query = {};
      if (req?.user?.role === "doctor") {
        query = {
          doctor: req?.user?.id,
          date: new Date()?.toISOString()?.split('T')[0],
          status: "pending"
        }
      } else if (req?.user?.role === "patient") {
        query = {
          patient: req?.user?.id,
          date: new Date()?.toISOString()?.split('T')[0],
          status: "pending"
        }
      } else if (req?.user?.role === "admin" || req?.user?.role === "supperAdmin") {
        query = {
          date: new Date()?.toISOString()?.split('T')[0],
          status: "pending"
        }
      } else {
        return res?.status(401)?.json({ status: false, msg: "Unauthorized", data: null })
      }
      const getAllAppointments = await models.appiontment.find(query).populate("patient").populate("questionaire").populate("doctor").sort({ createdAt: -1 });
      return res.json({ status: true, msg: "Appointments Fetched Successfully", data: getAllAppointments })
    } catch (error) {
      return res.status(500).json({ status: false, msg: "Something Went Wrong", data: null })
    }
  },
  updateInConnectionForAppointment: async (req, res) => {
    try {
      if (_?.isEmpty(req?.body?.type) || _?.isEmpty(req?.body?.appointmentId)) {
        return res.json({ status: false, msg: "Type and Id are required", data: null })
      }
      let query = {};
      if (req?.body?.type === "inConnection") {
        query = { inConnection: true }
      } else {
        query = { inConnection: false }
      }
      const updateAppointment = await models.appiontment.findByIdAndUpdate(req?.params?.appointmentId, query);
      if (!updateAppointment) {
        return res.json({ status: false, msg: "Appointment not found", data: null })
      }
      return res.json({ status: true, msg: "Appointment Status Updated Successfully", data: updateAppointment })
    } catch (error) {
      return res.status(500).json({ status: false, msg: "Something Went Wrong", data: null })
    }
  },
  createAndUpdateDoctorNote: async (req, res) => {
    try {
      const doctorNote = await models.doctorNote.findOne({ appointmentId: req?.body?.appointmentId });
      if (doctorNote) {
        const updatedDoctorNote = await models.doctorNote.findByIdAndUpdate(doctorNote?._id, req?.body);
        if (!updatedDoctorNote) {
          return res.json({ status: false, msg: "Doctor Note not found", data: null })
        }
        return res.json({ status: true, msg: "Doctor Note Updated Successfully", data: updatedDoctorNote })
      } else {
        const doctorNote = await models.doctorNote.create(req?.body);
        if (!doctorNote) {
          return res.json({ status: false, msg: "Doctor Note not found", data: null })
        }
        await models.appiontment.findByIdAndUpdate(req?.body?.appointmentId, { doctorNote: doctorNote?._id })
        return res.json({ status: true, msg: "Doctor Note Created Successfully", data: doctorNote })
      }
    } catch (error) {
      return res.status(500).json({ status: false, msg: "Something Went Wrong", data: null })
    }
  },
  getDoctorNote: async (req, res) => {
    try {
      const doctorNote = await models.doctorNote.findOne({ appointmentId: req?.params?.id });
      if (!doctorNote) {
        return res.json({ status: false, msg: "Doctor Note not found", data: null })
      }
      return res.json({ status: true, msg: "Doctor Note", data: doctorNote })
    } catch (error) {
      return res.status(500).json({ status: false, msg: "Something Went Wrong", data: null })
    }
  }

};



module.exports = apointmentControl;
