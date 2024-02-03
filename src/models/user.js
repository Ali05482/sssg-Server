const mongoose = require("mongoose");
const mongoPagination = require("mongoose-paginate-v2");
const { v4: uuidv4 } = require('uuid');
const user = mongoose.Schema(
  {
    clinicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "clinic"
     },
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    cnic:{
      type: String,
      unique:true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    dateOfBirth:{
      type: String,
      required: [true, "Date of birth is required"],
    },
    phoneNumber:{
      type: String,
      unique:true,
      required: [true, "Cell phone number is required"],
    },
    gender:{
      type: String,
      required: [true, "Gender is required"],
      enum:["male", "female", "other"]
    },
    email: {
      type: String,
      unique:true,
    },
    userId:{
       type:String,
       default:uuidv4()
    },
    typeId:{
     type:mongoose.Schema.Types.ObjectId,
     refPath: 'role'
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
    },
    resetCode: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["user", "admin","patient", "doctor", "schedulingTeam", "compodar"],
      default: "patient",
    },
    profile:{
      type:String,
      default:"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
    },
    platformId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "platform",
    },
    faxNumber:{
      type:String,
      unique:true,
    },
    providerNumber:{
      type:String,
    },
    province:{
      type:String,
    },
    city:{
      type:String,
    },
    address:String,
    healthCard:String,
    licenseNumber:String,
    meetingId:{
      type:String,
    } 
  },
  {
    timestamps: true,
  }
);
user.plugin(mongoPagination);
module.exports = mongoose.model("user", user);
