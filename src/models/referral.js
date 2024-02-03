const mongoose = require("mongoose");
const mongoPagination = require("mongoose-paginate-v2");
const referral = mongoose.Schema(
  {
    appointmentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "appiontment",
    },
    questionnaireId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "questionaire",
    },  
    previousDoctorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    referralDoctorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    patientId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    data:{
        type:String,
        required:[true, "Data is required"]
    }
  },
  {
    timestamps: true,
  }
);
referral.plugin(mongoPagination);
module.exports = mongoose.model("referral", referral);
