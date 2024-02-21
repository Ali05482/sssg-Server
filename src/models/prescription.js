const mongoose = require("mongoose");
const mongoPagination = require("mongoose-paginate-v2");
const prescription = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "appiontment"
    },
    prescriptionName: {
      type: String,
    },
    medicalInstruction:[
      {
        medicineName:{
          type: String,
          required: [true, "Medicine name is required"]
        },
        doseInstcruction:{
          type: String,
          required: [true, "Dose instruction is required"]
        },
        quantity:{
          type: Number,
          required: [true, "Quantity is required"]
        },
        repeats:{
          type: String,
          required: [true, "Repeat instructions is required"]
        },
        luCode:{
          type: String,
        },
        uniqueId:{
          type: String,
        },
      }
    ],
    data: {
      type: String,
      required: [true, "Data is required"]
    },

  },
  {
    timestamps: true,
  }
);
prescription.plugin(mongoPagination);
module.exports = mongoose.model("prescription", prescription);
