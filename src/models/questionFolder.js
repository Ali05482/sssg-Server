const mongoose = require("mongoose");
const mongoPagination = require("mongoose-paginate-v2");
const questionFolder = mongoose.Schema(
  {
    name: {
     type:String,
     required: [true, "Folder name is required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    questionGroupId: [{
      type: mongoose.Schema.Types.ObjectId,
      ref:"questionGroup"
    }],
    type: {
      type: String,
      default:"default"
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
questionFolder.plugin(mongoPagination);
module.exports = mongoose.model("questionFolder", questionFolder);
