const Tour = require("../models/tourModel");
const Day = require("../models/daysModel");

//to create days//
exports.createDays = async (req, res) => {
  const tourID = req.params.tourID;

  const { totalDays, descriptions } = req.body;

  const newDay = new Day({ totalDays });
  newDay.addDescriptions(descriptions);

  try {
    const savedDay = await newDay.save();

    await Tour.findByIdAndUpdate(tourID, {
      days: savedDay._id,
    });

    return res.status(200).json({
      success: true,
      message: "Days created successfully",
      data: savedDay,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
//get single days by tour ID//
exports.getDaysByTourID = (req, res) => {
  const tourID = req.params.tourID;

  Tour.findById(tourID)
    .populate("days")
    .exec()
    .then((tour) => {
      if (!tour) {
        return res.status(404).json({ message: "Tour not found" });
      }

      return res.status(200).json({ days: tour.days });
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
};
//to get all days//
exports.getAllDays = (req, res) => {
  Day.find()
    .then((days) => {
      res.status(200).json({ days });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};
//to delete days by single id//
exports.deleteDay = (req, res) => {
  const dayId = req.params.dayId;

  Day.findByIdAndRemove(dayId)
    .then((deletedDay) => {
      if (!deletedDay) {
        return res.status(404).json({ message: "Day not found" });
      }

      res.status(200).json({ message: "Day deleted successfully" });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};
