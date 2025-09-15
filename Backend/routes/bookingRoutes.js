const express = require("express");
const { createBooking, getBookings, updateBookingStatus, getBookingByUserId } = require("../controllers/bookingController");

const router = express.Router();

// ✅ Create a new booking
router.post("/createBooking", createBooking);

// ✅ Get all bookings (for Admin/Owner dashboard)
router.get("/getBookings", getBookings);

// ✅ Update booking status
router.put("/:bookingId/status", updateBookingStatus);

router.get("/user/:userId", getBookingByUserId);

module.exports = router;
