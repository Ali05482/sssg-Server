const mongoose = require("mongoose");
const mongoPagination = require("mongoose-paginate-v2");
const sickNote = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        appointmentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "appiontment"
        },
        startDate: {
            type: String,
            required:[true, "Start Date Required"]
        },
        endDate: {
            type: String,
            required:[true, "End Date Required"]
        },
        data:{
            type: String,
            required:[true, "Data is Required"]
        }
    },
    {
        timestamps: true,
    }
);
sickNote.plugin(mongoPagination);
module.exports = mongoose.model("sickNote", sickNote);
