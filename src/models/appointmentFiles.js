const mongoose = require("mongoose");
const mongoPagination = require("mongoose-paginate-v2");
const appointmentFiles = mongoose.Schema(
    {
        appointment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "appiontment",
        },
        files: {
            type: [],
        }
    },
    {
        timestamps: true,
    }
);
appointmentFiles.plugin(mongoPagination);
module.exports = mongoose.model("appointmentFiles", appointmentFiles);
