const mongoose = require("mongoose");
const mongoPagination = require("mongoose-paginate-v2");
const questionaire = mongoose.Schema(
    {
        appointment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "appiontment",
        },
        data: [
            {
                question_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "question",
                },
                questionName: {
                    type:String
                },
                answers: [
                    {
                        answerId: {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: "answer",
                        },
                        answerType:{
                            type:String
                        },
                        value:[]
                    }
                ]
            },

        ],

    },
    {
        timestamps: true,
    }
);
questionaire.plugin(mongoPagination);
module.exports = mongoose.model("questionaire", questionaire);
