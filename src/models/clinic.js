const mongoose = require("mongoose");
const mongoPagination = require("mongoose-paginate-v2");
const clinic = mongoose.Schema(
  {
    name: {
     type:String,
     required: [true, "Clinic name is required"],
    },
    location: {
      type: String,
      required: [true, "Location/Address is required"],
    },
    type: {
      type: String,
      default:"default"
    },
    city:{
      type:String,
      required:[true,"City is required"]
    }
  },
  {
    timestamps: true,
  }
);
clinic.plugin(mongoPagination);
module.exports = mongoose.model("clinic", clinic);
