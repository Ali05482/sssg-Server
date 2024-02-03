const mongoose = require("mongoose");
const _ = require('lodash')
const mongoPagination = require("mongoose-paginate-v2");
function generateRandomString(length) {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  
  const randomCharacter = () => _.sample(characters);
  const randomString = _.times(length, randomCharacter).join('');

  return randomString;
}
const userMeetings = mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    meeetingId:{
      type:String,
      default:generateRandomString(10)
    },
    appointment:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"appiontment"
    },
    isActive:{
      type:Boolean,
      default:true
    },
    type:{
      type:String,
      enum:["appointment", "other"],
      default:"appointment"
    },
  },
  {
    timestamps: true,
  }
);
userMeetings.plugin(mongoPagination);
module.exports = mongoose.model("userMeetings", userMeetings);
