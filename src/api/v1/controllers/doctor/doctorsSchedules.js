const models = require('../../../../models/')
const DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
const createOrUpdate = async (req, res) => {
  try {
    if(!req?.user?.id?.toString()===req?.body?.data[0]?.doctorId?.toString()){
      return res.json({ status: false, msg: "You are not authorized to update this doctor availability", data: null })
    }
    if (!Array.isArray(req.body?.data)) {
      return res.json({ status: false, msg: "Something Went Wrong, Check inputs", data: null })
    }
    const checkDays = checkCommingDays(req.body)
    if (!checkDays.status) {
      return res.json(checkDays)
    }
    const checkCurrentOverLapping = currentTimeOverlap(req.body);
    if (!checkCurrentOverLapping.status) {
      return res.json({ status: false, msg: "Time is overlapping, Please Check", data: checkCurrentOverLapping })
    }
    const duplication = checkDuplicate(req.body);
    if (!duplication.status) {
      return res.json(duplication)
    }
    const doctor = await models.user.findById(req.body?.data[0]?.doctorId);
    if (!doctor) {
      return res.json({ status: false, msg: "Doctor not found", data: null })
    }
    const previousRecord = await models.doctorAvailability.find({ $and: [{ "day.day": req.body?.data[0]?.day?.day }, { doctorId: req.body?.data[0]?.doctorId }] });
    const createRecord = await models.doctorAvailability.insertMany(req.body?.data);
    if (!createRecord.length > 0) {
      return res.json({ status: false, msg: "Something Went Wrong, Try again.....", data: null });
    }
    if (previousRecord?.length > 0) {
      const idsToDelete = previousRecord?.map(x => x._id?.toString());
      console.log(idsToDelete)
      await models.doctorAvailability.deleteMany({ _id: { $in: idsToDelete } })
    }
    return res.json({ status: true, msg: "Your data is update successfully", data: createRecord });
  } catch (error) {
    return res.status(500).json({ status: false, msg: "Something Went Wrong", data: error.message })
  }
}
const checkDuplicate = (myData) => {
  const data = myData?.data
  const result = { status: true, data: null }
  let objectId = "";
  let day = "";
  for (let i = 0; i < data?.length; i++) {
    if (objectId) {
      if (data[i]?.doctorId?.toString() !== objectId) {
        result.status = false;
        result.msg = "Multiple Doctors Not Allowed";
        result.data = data[i];
        break;
      } else if (data[i]?.day?.day?.toString() !== day) {
        result.status = false;
        result.msg = "Multiple Days Not Allowed";
        result.data = data[i];
        break;
      }
    } else {
      objectId = data[i]?.doctorId?.toString()
      day = data[i]?.day?.day;
    }
  }
  return result;
}

const currentTimeOverlap = (myData) => {
  const data = myData?.data
  let result = { status: true };
  let previous = {};
  for (let i = 0; i < data?.length; i++) {
    if (Object.keys(previous).length !== 0) {
      if (convertTimeToMinutes(previous?.toTime) > convertTimeToMinutes(data[i]?.fromTime)) {
        result.msg = "previousOverLaped";
        result.data = { fromTime: data[i]?.fromTime, toTime: previous?.toTime }
        result.status = false;
        break;
      } else if (convertTimeToMinutes(data[i]?.fromTime) >= convertTimeToMinutes(data[i]?.toTime)) {
        result.msg = "neighbourOverLaped";
        result.data = { fromTime: data[i]?.fromTime, toTime: data[i]?.toTime }
        result.status = false;
        break
      } else {
        previous = data[i];
      }
    } else {
      if (convertTimeToMinutes(data[i]?.fromTime) >= convertTimeToMinutes(data[i]?.toTime)) {
        result.msg = "veryFirsteighbourOverLaped";
        result.data = { fromTime: data[i]?.fromTime, toTime: data[i]?.toTime }
        result.status = false;
        break
      } else {
        previous = data[i];
      }
    }
  }
  return result;
}
const checkCommingDays = (myData) => {
  const data = myData?.data
  let result = { status: true, data: null };

  for (let i = 0; i < data?.length; i++) {
    if (!(DAYS.includes(data[i]?.day?.day))) {
      result.status = false;
      result.msg = "Invalid Day Name";
      result.data = data[i];
      break;
    }
  }
  return result
}
const convertTimeToMinutes = (timeString) => {
  const [hours, minutes] = timeString.split(":");
  return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
}

const getDoctorAvailability = async (req, res) => {
  try {
    const { doctorId, day } = req.params;
    const getAvailability = await models.doctorAvailability.find({ $and: [{ "day.day": day }, { doctorId: doctorId }] });
    return res.json({ status: true, msg: "Data Fetched Successfully", data: getAvailability })
  } catch (error) {
    return res.status(500).json({ status: false, msg: "Something Went Wrong", data: error.message })
  }
}
const getOverAllDoctorAvailability = async (req, res) => {
  try {
    const { doctorId } = req.params;
    if(!req?.user?.id?.toString()===doctorId?.toString()){
      return res.json({ status: false, msg: "You are not authorized to get data for this doctor ", data: null })
    }
    const getAvailability = await models.doctorAvailability.find({ doctorId: doctorId });
    return res.json({ status: true, msg: "Data Fetched Successfully", data: getAvailability })
  } catch (error) {
    return res.status(500).json({ status: false, msg: "Something Went Wrong", data: error.message })
  }
}
const getDoctorsForScheduling = async (req, res) => {
  try {
    const getDoctorsForScheduling = await models.doctor.find({}).populate("user");
    return res.json({ status: true, msg: "Data Fetched Successfully", data: getDoctorsForScheduling })
  } catch (error) {
    return res.status(500).json({ status: false, msg: "Something Went Wrong", data: error.message })
  }
}
const getDoctorReservedAppointments = async (req, res) => {
  try {
    const currentDate = new Date().toISOString().split('T')[0];
    const getDoctorReservedAppointments = await models.appiontment.find({
      doctor: req?.params?.id,
      date: currentDate,
    }).populate("patient").populate("doctor").populate("clinic");
    
  return res.json({ status: true, msg: "Data Fetched Successfully", data: getDoctorReservedAppointments })
  } catch (error) {
    return res.status(500).json({ status: false, msg: "Something Went Wrong", data: error.message })
  }
}



module.exports = {
  createOrUpdate,
  getDoctorAvailability,
  convertTimeToMinutes,
  getOverAllDoctorAvailability,
  getDoctorsForScheduling,
  getDoctorReservedAppointments,
}