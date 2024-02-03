const mongoose = require("mongoose");
const mongoPagination = require("mongoose-paginate-v2");

const doctorAvailability = mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
    },
    availability: {
      type: String,
      required: [true, "Availability is required"],
      enum: ["virtual", "clinic", "both"]
    },
    clinicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "clinic"
    },
    timezone: {
      type: String,
      default: "GMT+5"
    },
    day: {
      day: {
        type: String,
        required: [true, "Day is required"]
      },
      incrementalTime: {
        type: String,
        default: "1h"
      }
    },
    fromTime: {
      type: String,
      required: [true, "From time is required"]
    },
    toTime: {
      type: String,
      required: [true, "To time is required"]
    },
    reserved: {
      type: Array,
      default: []
    }
  }
);
doctorAvailability.plugin(mongoPagination);
module.exports = mongoose.model("doctorAvailability", doctorAvailability);