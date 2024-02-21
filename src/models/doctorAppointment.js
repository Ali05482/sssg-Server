const mongoose = require("mongoose");
const mongoPagination = require("mongoose-paginate-v2");
const doctorAppointment = mongoose.Schema(
  {
    scheduleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "doctorSchedules",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    details: {
      type: String,
      required: [true, "Details are required"],
    },
    time: {
      type: Array,
      required: [true, "Available time is required"],
    },
  },
  {
    timestamps: true,
  }
);
doctorAppointment.plugin(mongoPagination);
module.exports = mongoose.model("doctorAppointment", doctorAppointment);
