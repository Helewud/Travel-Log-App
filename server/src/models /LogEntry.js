const mongoose = require("mongoose");

const logEntrySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      max: 256,
    },
    description: {
      type: String,
    },
    comment: {
      type: String,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      default: 0,
    },
    visitDate: {
      type: Date,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
      min: -180,
      max: 180,
    },
    latitude: {
      type: Number,
      required: true,
      min: -90,
      max: 90,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LogEntry", logEntrySchema);
