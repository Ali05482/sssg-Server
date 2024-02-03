const mongoose = require("mongoose");
const mongoPagination = require("mongoose-paginate-v2");
const settings = mongoose.Schema(
  {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    virtualCare:{
      type:Boolean,
      default:false
    },
    preCall:{
      type:Boolean,
      default:false
    },
    appointmentLookingPhysicalLocation:{
      type:Boolean,
      default:false
    }
  },
  {
    timestamps: true,
  }
);
settings.plugin(mongoPagination);
module.exports = mongoose.model("settings", settings);
