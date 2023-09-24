const express = require("express");
const {
  createBooking,
  getBookingById,
  getAllBookings,
  deleteBooking,
  approveBooking,
  getBookingHistory,
  updateBooking,
  approvePayment,
} = require("../controller/bookingController");
const { isAuthenticated, authorizedRole } = require("../middleware/auth");

const router = express.Router();

router.route("/DoBooking").post(createBooking);

router.route("/SingleBooking/:id").get(getBookingById);

router.route("/AllBooking").get(getAllBookings);

router.route("/DeleteBooking/:id").delete(deleteBooking);
// for updating bookings//

router.route("/UpdateBooking/:id").put(updateBooking);

//route for getting  one user booking history

router.route("/history").get(isAuthenticated, getBookingHistory);

// Route for approving a booking
router
  .route("/approve/:id")
  .put(isAuthenticated, authorizedRole("admin"), approveBooking);

//route for approving payment//
router
  .route("/payment/:id")
  .put(isAuthenticated, authorizedRole("admin"), approvePayment);

module.exports = router;
