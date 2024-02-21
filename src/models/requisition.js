const mongoose = require("mongoose");
const mongoPagination = require("mongoose-paginate-v2");
const requisition = mongoose.Schema(
  {
    appointmentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "appiontment",
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
requisition.plugin(mongoPagination);
module.exports = mongoose.model("requisition", requisition);
