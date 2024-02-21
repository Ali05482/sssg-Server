const mongoose = require("mongoose");
const mongoPagination = require("mongoose-paginate-v2");
const { v4: uuidv4 } = require('uuid');
const platform = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "First name is required"],
    },
    phoneNumber:{
      type: String,
      unique:true,
      required: [true, "Cell phone number is required"],
    },
    platFormNumber:{
      type:String,
      default:uuidv4()
    },
    profile:{
      type:String,
      default:"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
    },
    status:{
      type:Boolean,
      default:true
    },
    address:String,
  },
  {
    timestamps: true,
  }
);
platform.plugin(mongoPagination);
module.exports = mongoose.model("platform", platform);
