const mongoose = require("mongoose");
const mongoPagination = require("mongoose-paginate-v2");
const patient = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    details:{
      type:String,
    }
  },
  {
    timestamps: true,
  }
);
patient.plugin(mongoPagination);
module.exports = mongoose.model("patient", patient);
