const Booking = require("../models/Booking");
const User = require("../models/user");
const Property = require("../models/Property");
const Payment = require("../models/Payment");
const sendEmail = require("../utils/sendEmail");

// ✅ Create new booking
const createBooking = async (req, res) => {
  try {
    const { userId, propertyId, moveInDate, stayDuration, sharingPreference, message } = req.body;

    // 🔍 Validate user & property
    const user = await User.findById(userId);
    const property = await Property.findById(propertyId).populate("ownerId"); // ✅ now populates ownerId
    if (!user || !property) {
      return res.status(404).json({ success: false, error: "User or Property not found" });
    }

     // 📌 New check: Prevent more than 2 bookings for the same property
    const existingBookingsCount = await Booking.countDocuments({ user: userId, property: propertyId });
    if (existingBookingsCount >= 2) {
      return res.status(400).json({ success: false, error: "You can only book this PG up to 2 times." });
    }


    // ✅ Save booking
    const booking = new Booking({
      user: userId,
      property: propertyId,
      moveInDate,
      stayDuration,
      sharingPreference,
      message,
    });
    await booking.save();

    // ✅ Email notifications
    await sendEmail(
      user.email,
      "Booking Request Submitted",
      `Hi ${user.name},\n\nYour booking request for ${property.propertyName} has been submitted.\nStatus: Pending.\n\nWe will notify you once the owner responds.`
    );

    await sendEmail(
      property.ownerId.email, // ✅ from Users collection
      "New Booking Request",
      `Hi ${property.ownerId.name},\n\nYou have a new booking request for ${property.propertyName} from ${user.name} (${user.email}).\n\nPlease log in to review the request.`
    );

    res.json({ success: true, message: "Booking created & emails sent", booking });

  } catch (err) {
    console.error("❌ Booking Error:", err);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// ✅ Get all bookings (Admin/Owner)
const getBookings = async (req, res) => {
  try {
    const payments = await Payment.find();

    const bookings = await Booking.find()
      .populate("user", "name email phone") // fetch user details
      .populate({
        path: "property",                // fetch property
        select: "propertyName propertyType city rent ownerId", // include ownerId in response
        populate: {                      // nested populate: ownerId -> User
          path: "ownerId",
          model: "User",
          select: "name email phone",
        },
      });

    res.json({ success: true, bookings, payments });
  } catch (err) {
    console.error("❌ Fetch Error:", err);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};


// ✅ Update booking status (Accept/Reject)
const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    const booking = await Booking.findById(bookingId)
      .populate("user")
      .populate({
        path: "property",
        populate: { path: "ownerId", model: "User", select: "name email" }, // ✅ ownerId reference to User
      });

    if (!booking) {
      return res.status(404).json({ success: false, error: "Booking not found" });
    }

    booking.status = status;
    await booking.save();

    // Notify user
    await sendEmail(
      booking.user.email,
      `Booking ${status}`,
      `Hi ${booking.user.name},\n\nYour booking for ${booking.property.name} has been ${status} by the owner.\n\nThank you!`
    );

    res.json({ success: true, message: `Booking ${status}`, booking });
  } catch (err) {
    console.error("❌ Update Error:", err);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

const getBookingByUserId = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.userId })
      .populate("property", "propertyName propertyType city address"); // fetch only required fields
      //console.log(req.params.userId);

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error });
  }
};

module.exports = { createBooking, getBookings, updateBookingStatus, getBookingByUserId };
