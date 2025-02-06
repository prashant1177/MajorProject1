const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/booking.js");

const wrapAsync = require("../utils/WrapAsync.js");
const { isLoggedIn } = require("../middleware.js");
// Create booking
router.post("/:id/book", isLoggedIn, wrapAsync(bookingController.createBooking));
router.get("/:id/bookings", isLoggedIn, wrapAsync(bookingController.getBookings));
router.get("/:id/Booked", isLoggedIn, wrapAsync(bookingController.getBooked));
router.get("/details/:id", isLoggedIn, wrapAsync(bookingController.getBookingDetails));

module.exports = router;
