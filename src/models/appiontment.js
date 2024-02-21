const mongoose = require("mongoose");
const mongoPagination = require("mongoose-paginate-v2");
const _ = require('lodash');
const { v4: uuidv4, v4 } = require('uuid');
function generateRandomString(length) {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const randomCharacter = () => _.sample(characters);
  const randomString = _.times(length, randomCharacter).join('');
  return randomString;
}
const appiontment = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    vitals: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vitals",
    },
    appointmentUniqueId: {
      type: String,
      default: v4()
    },
    clinic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "clinic",
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    doctorNote: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "doctorNote",
    },
    questionaire: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "questionaire",
    },
    sickNote: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "sickNote",
    },
    prescription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "prescription",
    },
    referral: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "referral",
    },
    requisition: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "requisition",
    },
    appiontmentType: {
      type: String,
      required: [true, "Appointment type are required"],
    },
    secreteCode: {
      type: String,
      default: _.uniqueId("appointment-")
    },
    healthCard: {
      type: String,
    },
    date: {
      type: String,
    },
    time: {
      type: String,
    },
    duration: {
      type: String,
      required: [true, "Duration is required type are required"],
    },
    isRecuring: {
      type: String,
      required: [true, "Recuring is required"],
      default: false,
      enum: [true, false]
    },
    repeat: {
      type: String,
    },
    frequency: {
      type: String,
    },
    numberOfOccurences: {
      type: String,
    },
    appointmentMedium: {
      type: String,
      required: [true, "Appointment medium is required"],
      enum: ["video", "phone", "inClinic"]
    },
    forWho: {
      type: String,
      default: "myself"
    },
    status: {
      type: String,
      default: "pending"
    },
    isLive: {
      type: Boolean,
      default: false
    },
    inConnection: {
      type: Boolean,
      default: false
    },
    details: {
      type: String,
    },
    meeetingId: {
      type: String,
      default: "https://meet.google.com/zjq-yzsj-jyy"
    },
  },
  {
    timestamps: true,
  }
);
appiontment.plugin(mongoPagination);
module.exports = mongoose.model("appiontment", appiontment);
