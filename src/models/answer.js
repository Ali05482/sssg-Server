const mongoose = require("mongoose");
const mongoPagination = require("mongoose-paginate-v2");
const answer = mongoose.Schema(
  {
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "question"
    },
    answer: {
      type: String,
    },
    answerType: {
      type: String,
      enum: [
        "radio",
        "checkbox",
        "boolean",
        "calendar",
        "text",
        "longText",
        "number",
        "images",
        "video",
        "table",
        "range",
        "signature",
        "select"
      ],
    },
    linkedQuestion: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "question"
        },
       
      }
    ],
    table: {
      type: [
        {
          isRequired: {
            type: Boolean,
            default: false
          },
          horizontal: [
            {
              answerType: {
                type: String,
                enum: [
                  "radio",
                  "checkbox",
                  "boolean",
                  "calendar",
                  "text",
                  "longText",
                  "number",
                  "images",
                  "video",
                  "table",
                  "range",
                  "signature",
                  "select"
                ],
              },

            },
          ],
          vertical: [String]
        }
      ],
      default: []
    },

    status: {
      type: String,
      default: "default"
    },
  },
  {
    timestamps: true,
  }
);
answer.plugin(mongoPagination);
module.exports = mongoose.model("answer", answer);
