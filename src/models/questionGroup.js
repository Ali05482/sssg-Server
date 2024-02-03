const mongoose = require("mongoose");
const mongoPagination = require("mongoose-paginate-v2");
const questionGroup = mongoose.Schema(
  {
    name: {
     type:String,
     required: [true, "Folder name is required"],
    },
    questionId: [{
      type: mongoose.Schema.Types.ObjectId,
      ref:"question"
    }],
    questionFolderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"questionFolder",
      required: [true, "Folder is required"],
    },
   
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
questionGroup.plugin(mongoPagination);
module.exports = mongoose.model("questionGroup", questionGroup);
