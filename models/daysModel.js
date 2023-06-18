const mongoose = require("mongoose");

const daySchema = new mongoose.Schema({
  totalDays: {
    type: Number,
    required: true,
  },
  descriptions: [
    {
      day: {
        type: Number,
        required: true,
      },
      description: {
        type: mongoose.Schema.Types.Mixed, // Update the type to allow various data types
        required: true,
      },
    },
  ],
});
daySchema.methods.addDescriptions = function (descriptions) {
  if (descriptions.length !== this.totalDays) {
    throw new Error("Number of descriptions does not match totalDays.");
  }

  this.descriptions = descriptions.map((description, index) => ({
    day: index + 1,
    description,
  }));
};

module.exports = mongoose.model("Day", daySchema);
