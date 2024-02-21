const mongoose = require("mongoose");
const mongoPagination = require("mongoose-paginate-v2");
const doctor = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    specialty: {
      type: String,
      required: [true, "Specialty is required"],
    },
    availability: {
      type: String,
      required: [true, "Availability is required"],
    },
    hospitalLocation: {
      type: String,
    },
    hospitalName: {
      type: String,
    },
    biography: {
      type: String,
    },
    licenseNumber:{
      type:String
    },
    faxNumber:{
      type:String
    }
  },
  {
    timestamps: true,
  }
);
doctor.plugin(mongoPagination);
module.exports = mongoose.model("doctor", doctor);
