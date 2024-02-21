const mongoose = require("mongoose");
const mongoPagination = require("mongoose-paginate-v2");
const vitals = mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
     },
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "appiontment",
      unique:true,
      required: [true, "appointment is"],
    },
    bodyTemperature: {
      type: String,
      required: [true, "Body Temperature is required"],
    },
    heartRate:{
      type: String,
      required: [true, "Heart Rate is required"],
    },
    respiratoryRate:{
      type: String,
      required: [true, "Respiratory Rate is required"],
    },
    bloodPressure:{
      type: String,
      required: [true, "Blood Pressure is required"],
    },
    oxygenSaturation: {
      type: String,
      required: [true, "Oxygen Saturation is required"],
    },
    height:{
       type:String,
       required: [true, "Height Saturation is required"],
    },
    weight:{
      type:String,
      required: [true, "Weight Saturation is required"],
    },
    bloodGlucose: {
      type: String,
      required: [true, "Blood Glucose is Required"],
    },
   
  },
  {
    timestamps: true,
  }
);
vitals.plugin(mongoPagination);
module.exports = mongoose.model("vitals", vitals);
