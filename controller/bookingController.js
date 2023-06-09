const Booking = require("../models/bookingModel");

// Create a new booking
exports.createBooking = async (req, res) => {
  const newBooking = new Booking(req.body);
  try {
    const savedBooking = await newBooking.save();

    return res.status(201).json({
      success: true,
      message: "Booked Successful",
      data: savedBooking,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();

    return res.status(200).json({
      success: true,
      message: "Booking Found successfully",
      data: bookings,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get a single booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: booking,
      message: "Booking found",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Delete a booking by ID
exports.deleteBooking = async (req, res) => {
  const id = req.params.id;
  try {
    await Booking.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
