const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema(
  {
    createBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    category: {
      type: String,
      enum: ["Aranh", "Bakong"],
    },
    coverName: {
      type: String,
      required: true,
    },
    generation: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    student: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
        }
      },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

const StudentsModel = mongoose.model("students", studentSchema);

module.exports = StudentsModel;
