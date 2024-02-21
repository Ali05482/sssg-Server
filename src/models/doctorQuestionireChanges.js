const mongoose = require("mongoose");
const mongoPagination = require("mongoose-paginate-v2");
const doctorQuestionireChanges = mongoose.Schema(
  {
    questionaireId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "questionaire"
    },
    data: {
      type: String,
    },
   
  },
  {
    timestamps: true,
  }
);
doctorQuestionireChanges.plugin(mongoPagination);
module.exports = mongoose.model("doctorQuestionireChanges", doctorQuestionireChanges);
