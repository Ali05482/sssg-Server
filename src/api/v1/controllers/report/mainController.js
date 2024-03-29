const { validationResult } = require("express-validator");
const models = require("../../../../models");
const _ = require("lodash");


const reportControll = {}

reportControll.addAndUpdateSickNote = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: false, msg: "Please make sure all inputs", data: errors.array() });
    }
    if (req.body?.id) {
      const findReport = await models.sickNote.findByIdAndUpdate(req.body?.id, req.body);
      if (findReport) {
        await models.appiontment.findByIdAndUpdate(req?.body?.appointmentId, { sickNote: findReport._id });
        return res.json({ status: true, msg: "SickNote Update", data: findReport })
      }
      return res.json({ status: true, msg: "Something Went Wrong While Updating Sick Note", data: createSickNote });
    }
    const createSickNote = await models.sickNote.create(req.body);
    if (createSickNote) {
      await models.appiontment.findByIdAndUpdate(req?.body?.appointmentId, { sickNote: createSickNote._id });
      return res.json({ status: true, msg: "SickNote Created", data: createSickNote });
    }
    return res.json({ status: false, msg: "Something Went Wrong, Try again......", data: null });
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ status: false, msg: "Something Went Wrong, Contact Admin", data: null });
  }
}

reportControll.getSickNoteByAppointmentId = async (req, res) => {
  try {
    const sickNote = await models.sickNote.findOne({ appointmentId: req.params?.id });
    return res.json({ status: true, msg: "Sick Note", data: sickNote });
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ status: false, msg: "Something Went Wrong, Contact Admin", data: null });
  }
}

reportControll.addAndUpdatePrescription = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: false, msg: "Please make sure all inputs", data: errors.array() });
    }
    req.body.userId = req?.user?.id;
    if (req.body?.id) {
      const prescription = await models.prescription.findByIdAndUpdate(req.body?.id, req.body);
      if (prescription) {
        await models.appiontment.findByIdAndUpdate(req?.body?.appointmentId, { prescription: prescription?._id });
        return res.json({ status: true, msg: "Prescription Updated", data: prescription });
      }
      return res.json({ status: false, msg: "Something Went Wrong", data: null });
    }
    else {
      const addPrescriptions = await models.prescription.create(req.body);
      if (addPrescriptions) {
        await models.appiontment.findByIdAndUpdate(req?.body?.appointmentId, { prescription: addPrescriptions?._id });
        return res.json({ status: true, msg: "Prescription Created", data: addPrescriptions });
      }
      return res.json({ status: false, msg: "Something Went Wrong", data: null });
    }
  } catch (error) {
    console.log("error.message", error.message)
    return res.status(500).json({ status: false, msg: "Something Went Wrong, Contact Admin", data: null });
  }
}
reportControll.addAndUpdateReferral = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: false, msg: "Please make sure all inputs", data: errors.array() });
    }
    req.body.userId = req?.user?.id;
    const findReferralDoctor = await models.user.findById(req?.body?.referralDoctorId).lean();
    if (!_?.isEmpty(findReferralDoctor)) {
      if (req.body?.id) {
        const referral = await models.referral.findByIdAndUpdate(req.body?.id, req.body);
        if (referral) {
          console.log("findReferralDoctor?.meetingId",findReferralDoctor?.meetingId)
          await models.appiontment.findByIdAndUpdate(req?.body?.appointmentId, { referral: referral?._id, meeetingId: findReferralDoctor?.meetingId, isRefered: true });
          return res.json({ status: true, msg: "Referral Updated", data: referral });
        }
        return res.json({ status: false, msg: "Something Went Wrong", data: null });
      }
      else {
        const addReferral = await models.referral.create(req.body);
        if (addReferral) {
          await models.appiontment.findByIdAndUpdate(req?.body?.appointmentId, { referral: addReferral?._id, meeetingId: findReferralDoctor?.meetingId, isRefered: true});
          return res.json({ status: true, msg: "Referral Created", data: addReferral });
        }
        return res.json({ status: false, msg: "Something Went Wrong", data: null });
      }
    } else {
      return res.json({ status: false, msg: "Referral Doctor Not Found", data: null });
    }
  } catch (error) {
    console.log("error.message", error.message)
    return res.status(500).json({ status: false, msg: "Something Went Wrong, Contact Admin", data: null });
  }
}
reportControll.addAndUpdateRequisition = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: false, msg: "Please make sure all inputs", data: errors.array() });
    }
    req.body.userId = req?.user?.id;
    if (req.body?.id) {
      const requisition = await models.requisition.findByIdAndUpdate(req.body?.id, req.body);
      if (requisition) {
        await models.appiontment.findByIdAndUpdate(req?.body?.appointmentId, { requisition: requisition?._id });
        return res.json({ status: true, msg: "Requisition Updated", data: requisition });
      }
      return res.json({ status: false, msg: "Something Went Wrong", data: null });
    }
    else {
      const addRequisition = await models.requisition.create(req.body);
      if (addRequisition) {
        await models.appiontment.findByIdAndUpdate(req?.body?.appointmentId, { requisition: addRequisition?._id });
        return res.json({ status: true, msg: "Requisition Created", data: addRequisition });
      }
      return res.json({ status: false, msg: "Something Went Wrong", data: null });
    }
  } catch (error) {
    return res.status(500).json({ status: false, msg: "Something Went Wrong, Contact Admin", data: null });
  }
}

reportControll.getRequisitionByAppointmentId = async (req, res) => {
  try {
    const requisition = await models.requisition.findOne({ appointmentId: req.params?.id });
    return res.json({ status: true, msg: "Requisition ", data: requisition });
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ status: false, msg: "Something Went Wrong, Contact Admin", data: null });
  }
}

reportControll.getPrescriptionByAppointmentId = async (req, res) => {
  try {
    const prescription = await models.prescription.findOne({ appointmentId: req.params?.id });
    return res.json({ status: true, msg: "Prescription ", data: prescription });
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ status: false, msg: "Something Went Wrong, Contact Admin", data: null });
  }
}

reportControll.getReferralByAppointmentId = async (req, res) => {
  try {
    const referral = await models.referral.findOne({ appointmentId: req.params?.id });
    return res.json({ status: true, msg: "Referral ", data: referral });
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ status: false, msg: "Something Went Wrong, Contact Admin", data: null });
  }
}
reportControll.getReferralByReferDoctorId = async (req, res) => {
  try {
    const referrals = await models.referral.find({ referralDoctorId: req?.user?.id }).populate("previousDoctorId").populate("referralDoctorId").populate("patientId").populate().populate("appointmentId").lean();
    return res.json({ status: true, msg: "Referrals ", data: referrals });
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ status: false, msg: "Something Went Wrong, Contact Admin", data: null });
  }
}
reportControll.getReport = async (req, res) => {
  try {
    const fetchReport = await models.appiontment.findById(req?.params?.id).populate("sickNote").populate("prescription").populate("referral").populate("requisition").populate("vitals").populate('doctorNote').lean();
    const appointments = await models.appiontment.find({ _id: { $ne: fetchReport._id } })
      .sort({ createdAt: -1 })
      .limit(2);

    const secondLastAppointment = appointments[1];
    let lastVisit = "First Visit";
    if (secondLastAppointment) {
      const currentDate = new Date();
      const lastVisitDate = new Date(secondLastAppointment.createdAt);
      const monthsDifference = currentDate.getMonth() - lastVisitDate.getMonth() +
        (12 * (currentDate.getFullYear() - lastVisitDate.getFullYear()));
      monthsDifference != 0 ? lastVisit = `Last Visit ${monthsDifference} months ago` : lastVisit = `Last Visit ${currentDate.getDate() - lastVisitDate.getDate()} days ago`;
    }
    return res.json({ status: true, msg: "Report", data: fetchReport, lastVisit });
  } catch (error) {
    return res.status(500).json({ status: false, msg: "Something Went Wrong, Contact Admin", data: null });
  }
}

module.exports = reportControll