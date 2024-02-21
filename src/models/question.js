const mongoose = require("mongoose");
const mongoPagination = require("mongoose-paginate-v2");
const question = mongoose.Schema(
  {
    name: {
     type:String,
     required: [true, "Question name is required"],
    },
    questionGroupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"questionGroup"
    },
    questionInsideQuestion:{
      type:Boolean,
      default:false
    },
    answers:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:"answer"
      }
    ],
    isRequired:{
      type:Boolean,
      default:false
    },
    status: {
      type: String,
      default:"default"
    },
    page:{
      type:Number,
    }
  },
  {
    timestamps: true,
  }
);
question.plugin(mongoPagination);
module.exports = mongoose.model("question", question);
