const mongoose = require("mongoose");
const eventSchema = new mongoose.Schema(
  {
    createBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    category: {
      type: String,
      enum: ["Hot", "Event", "Holiday", "Scholarship", "Job", "Tip"],
    },
    coverName: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    interesting: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    share: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
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

const EventsModel = mongoose.model("events", eventSchema);

module.exports = EventsModel;
