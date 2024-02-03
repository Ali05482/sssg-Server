const mongoose = require("mongoose");
const mongoPagination = require("mongoose-paginate-v2");
const questionTypes = mongoose.Schema(
  {
    name: {
     type:String,
     required: [true, "Question type is required"],
     unique:true
    },
    status:{
      type:Boolean,
      default:true
    }
  },
  {
    timestamps: true,
  }
);
questionTypes.plugin(mongoPagination);
module.exports = mongoose.model("questionTypes", questionTypes);
