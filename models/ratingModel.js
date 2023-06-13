const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    tourID: {
      type: mongoose.Types.ObjectId,
      ref: "Tour",
    },
    name: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Review", reviewSchema);
