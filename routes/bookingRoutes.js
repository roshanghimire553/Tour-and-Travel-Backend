const express = require("express");
const {
  createBooking,
  getBookingById,
  getAllBookings,
  deleteBooking,
} = require("../controller/bookingController");
const { isAuthenticated } = require("../middleware/auth");

const router = express.Router();

router.route("/DoBooking").post(createBooking);

router.route("/SingleBooking/:id").get(getBookingById);

router.route("/AllBooking").get(getAllBookings);

router.route("/DeleteBooking/:id").delete(deleteBooking);

module.exports = router;
