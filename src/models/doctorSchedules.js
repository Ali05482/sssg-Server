const mongoose = require("mongoose");
const mongoPagination = require("mongoose-paginate-v2");
const doctorSchedules = mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    fromDay: {
      type: String,
      enum: [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ],
      required: [true, "From Day is required"],
    },
    toDay: {
      type: String,
      enum: [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ],
      required: [true, "ToDay is required"],
    },
    time: [
      {
        fromTime: {
          type: String,
          required: [true, "From Time is required"],
        },
        toTime: {
          type: String,
          required: [true, "To Time is required"],
        },
      },
    ],
    availabilityTime: {
      type: String,
      enum: ["morning", "evening"],
      required: [true, "Hospital Name is required"],
    },
  },
  {
    timestamps: true,
  }
);
doctorSchedules.plugin(mongoPagination);
module.exports = mongoose.model("doctorSchedules", doctorSchedules);
