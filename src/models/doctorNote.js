const mongoose = require("mongoose");
const mongoPagination = require("mongoose-paginate-v2");
const doctorNote = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        appointmentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "appiontment"
        },
        data: {
            type: String,
            required: [true, "Data is Required"]
        }
    },
    {
        timestamps: true,
    }
);
doctorNote.plugin(mongoPagination);
module.exports = mongoose.model("doctorNote", doctorNote);
