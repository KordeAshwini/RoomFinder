const Booking = require("../models/Booking");
const User = require("../models/user");
const Property = require("../models/Property");
const Payment = require("../models/Payment");
const sendEmail = require("../utils/sendEmail");


// Create new booking with validations

// Create new booking with validations
const createBooking = async (req, res) => {
  try {
    const { userId, propertyId, moveInDate, stayDuration, sharingPreference, message, gender, typeOfTenant } = req.body;
    

    if (!userId || !propertyId || !moveInDate || !stayDuration) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    const user = await User.findById(userId);
    const property = await Property.findById(propertyId).populate("ownerId");
    if (!user || !property) {
      return res.status(404).json({ success: false, error: "User or Property not found" });
    }

    const today = new Date();
    const moveIn = new Date(moveInDate);
    if (moveIn < today.setHours(0, 0, 0, 0)) {
      return res.status(400).json({ success: false, error: "Move-in date cannot be in the past" });
    }

        // 🔹 6. Prevent more than 1 booking for the same property
    const existingBookingsCount = await Booking.countDocuments({ user: userId, property: propertyId });
    if (existingBookingsCount >= 1) {
      return res.status(400).json({ success: false, error: "You can only book this PG up to 1 time." });
    }

    // 🔹 Prevent duplicate active booking for same property
    const activeBooking = await Booking.findOne({
      user: userId,
      property: propertyId,
      status: { $in: ["Pending", "Accepted"] },
    });
    if (activeBooking) {
      return res.status(400).json({ success: false, error: "You already have an active booking for this property" });
    }

    // 🔹 5. Freeze booking only if all slots are confirmed
    const confirmedBookingsCount = await Booking.countDocuments({
      property: propertyId,
      status: "Confirmed",
    });

    const maxSharing = property.sharing || 4;

    if (confirmedBookingsCount >= maxSharing) {
      return res.status(400).json({
        success: false,
        error: `This ${property.propertyType} is fully booked (${maxSharing}-sharing limit reached).`,
      });
    }

    // 🔹 6. Save booking
    const booking = new Booking({
      user: userId,
      property: propertyId,
      moveInDate,
      stayDuration,
      sharingPreference,
      message,
      gender,
      typeOfTenant,
    });
    await booking.save();

    // 🔹 7. Notify both user and owner
    await sendEmail(
      user.email,
      "Booking Request Submitted",
      `Hi ${user.name},\n\nYour booking request for ${property.propertyName} has been submitted.\nStatus: Pending.\n\nWe will notify you once the owner responds.`
    );

    await sendEmail(
      property.ownerId.email,
      "New Booking Request",
      `Hi ${property.ownerId.name},\n\nYou have a new booking request for ${property.propertyName} from ${user.name} (${user.email}).\n\nPlease log in to review the request.`
    );

    res.json({ success: true, message: "Booking created successfully", booking });

  } catch (err) {
    console.error("Booking Error:", err);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};


// const createBooking = async (req, res) => {
//   try {
//     const { userId, propertyId, moveInDate, stayDuration, sharingPreference, message, gender, typeOfTenant } = req.body;

//     // 🔹 1. Required fields
//     if (!userId || !propertyId || !moveInDate || !stayDuration) {
//       return res.status(400).json({ success: false, error: "Missing required fields" });
//     }

//     // 🔹 2. Validate user & property
//     const user = await User.findById(userId);
//     const property = await Property.findById(propertyId).populate("ownerId");
//     if (!user || !property) {
//       return res.status(404).json({ success: false, error: "User or Property not found" });
//     }

//     // 🔹 3. Check moveInDate (must not be past date)
//     const today = new Date();
//     const moveIn = new Date(moveInDate);
//     if (moveIn < today.setHours(0, 0, 0, 0)) {
//       return res.status(400).json({ success: false, error: "Move-in date cannot be in the past" });
//     }

//     // 🔹 6. Prevent more than 1 booking for the same property
//     const existingBookingsCount = await Booking.countDocuments({ user: userId, property: propertyId });
//     if (existingBookingsCount >= 1) {
//       return res.status(400).json({ success: false, error: "You can only book this PG up to 1 time." });
//     }

//     // 🔹 7. Prevent duplicate active booking
//     const activeBooking = await Booking.findOne({
//       user: userId,
//       property: propertyId,
//       status: { $in: ["Pending", "Accepted"] },
//     });
//     if (activeBooking) {
//       return res.status(400).json({ success: false, error: "You already have an active booking for this property" });
//     }

//     // 🔹 8. Optional: Validate message length
//     if (message && message.length > 300) {
//       return res.status(400).json({ success: false, error: "Message too long (max 300 chars)" });
//     }

//     // Save booking
//     const booking = new Booking({
//       user: userId,
//       property: propertyId,
//       moveInDate,
//       stayDuration,
//       sharingPreference,
//       message,
//       gender,
//       typeOfTenant
//     });
//     await booking.save();

//     // Email notifications
//     await sendEmail(
//       user.email,
//       "Booking Request Submitted",
//       `Hi ${user.name},\n\nYour booking request for ${property.propertyName} has been submitted.\nStatus: Pending.\n\nWe will notify you once the owner responds.`
//     );

//     await sendEmail(
//       property.ownerId.email,
//       "New Booking Request",
//       `Hi ${property.ownerId.name},\n\nYou have a new booking request for ${property.propertyName} from ${user.name} (${user.email}).\n\nPlease log in to review the request.`
//     );

//     res.json({ success: true, message: "Booking created & emails sent", booking });

//   } catch (err) {
//     console.error("Booking Error:", err);
//     res.status(500).json({ success: false, error: "Server Error" });
//   }
// };


// Get all bookings (Admin/Owner)
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
    console.error("Fetch Error:", err);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};


// // Update booking status (Accept/Reject)
// const updateBookingStatus = async (req, res) => {
//   try {
//     const { bookingId } = req.params;
//     const { status } = req.body;

//     const booking = await Booking.findById(bookingId)
//       .populate("user")
//       .populate({
//         path: "property",
//         populate: { path: "ownerId", model: "User", select: "name email" }, // ✅ ownerId reference to User
//       });

//     if (!booking) {
//       return res.status(404).json({ success: false, error: "Booking not found" });
//     }

//     booking.status = status;

//     //  booking.status = status;

//     if (status === 'Accepted') {
//       const paymentDueDate = new Date();
//       paymentDueDate.setDate(paymentDueDate.getDate() + 2);
      
//       // 🔹 Expire in 10 minutes
//       //paymentDueDate.setMinutes(paymentDueDate.getMinutes() + 10);

//       booking.paymentDueDate = paymentDueDate;
//     } else {
//       booking.paymentDueDate = undefined; // Clear the due date if not accepted
//     }


//     await booking.save();   
    
//     if (paymentDueDate < new Date()) {
//       await sendEmail(
//         booking.user.email,
//         `Booking Expired`,
//         `Hi ${booking.user.name},\n\nYour booking for ${booking.property.propertyName} has expired due to non-payment within the due date.\n\nFeel free to explore other options on our platform. Thank you!`
//       );
//     }
//     else{
//       await sendEmail(
//         booking.user.email,
//         `Hurry Up! Payment Due Soon`,
//         `Hi ${booking.user.name},\n\nThis is a reminder that your payment for the booking at ${booking.property.propertyName} is due by ${booking.paymentDueDate.toDateString()}.\n\nPlease make the payment to confirm your booking and avoid expiration.\n\nThank you!`
//       );
//     }

//     if (status === 'Accepted') {

//     // Notify user
//     await sendEmail(
//       booking.user.email,
//       `Booking ${status}`,
//       `Hi ${booking.user.name},\n\nYour booking for ${booking.property.propertyName} has been ${status} by the owner.\n\nThank you!
//       Your payment is due by ${booking.paymentDueDate.toDateString()}. Please make the payment to confirm your booking.`  
//     );
//   }
//   else if (status === 'Rejected') {
//     // Notify user
//     await sendEmail(
//       booking.user.email,
//       `Booking ${status}`,
//       `Hi ${booking.user.name},\n\nWe regret to inform you that your booking for ${booking.property.propertyName} has been ${status} by the owner.\n\nFeel free to explore other options on our platform. Thank you!`
//     );
//   }
//   else if (status === 'Confirmed') {
//     // Notify user
//     await sendEmail(
//       booking.user.email,
//       `Booking ${status}`,
//       `Hi ${booking.user.name},\n\nYour booking for ${booking.property.propertyName} has been ${status}.\n\nThank you!`
//     );
//   }
  


//     res.json({ success: true, message: `Booking ${status}`, booking });
//   } catch (err) {
//     console.error("Update Error:", err);
//     res.status(500).json({ success: false, error: "Server Error" });
//   }
// };

const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    const booking = await Booking.findById(bookingId)
      .populate("user")
      .populate({
        path: "property",
        populate: { path: "ownerId", model: "User", select: "name email" },
      });

    if (!booking) {
      return res.status(404).json({ success: false, error: "Booking not found" });
    }

    booking.status = status;

    // ✅ Declare paymentDueDate outside
    let paymentDueDate;

    if (status === "Accepted") {
      paymentDueDate = new Date();
      paymentDueDate.setDate(paymentDueDate.getDate() + 2);
      booking.paymentDueDate = paymentDueDate;
    } else {
      booking.paymentDueDate = undefined;
    }

    await booking.save();

    // ✅ Only check if paymentDueDate exists
    if (paymentDueDate && paymentDueDate < new Date()) {
      await sendEmail(
        booking.user.email,
        `Booking Expired`,
        `Hi ${booking.user.name},\n\nYour booking for ${booking.property.propertyName} has expired due to non-payment.\n\nFeel free to explore other options.`
      );
    } else if (paymentDueDate) {
      await sendEmail(
        booking.user.email,
        `Hurry Up! Payment Due Soon`,
        `Hi ${booking.user.name},\n\nYour payment for ${booking.property.propertyName} is due by ${paymentDueDate.toDateString()}.\n\nPlease make the payment to confirm your booking.`
      );
    }

    // ✅ Send status-based emails
    if (status === "Accepted") {
      await sendEmail(
        booking.user.email,
        `Booking Accepted`,
        `Hi ${booking.user.name},\n\nYour booking for ${booking.property.propertyName} has been accepted.\n\nPayment due by ${paymentDueDate.toDateString()}.`
      );
    } else if (status === "Rejected") {
      await sendEmail(
        booking.user.email,
        `Booking Rejected`,
        `Hi ${booking.user.name},\n\nYour booking for ${booking.property.propertyName} has been rejected.`
      );
    } else if (status === "Confirmed") {
      await sendEmail(
        booking.user.email,
        `Booking Confirmed`,
        `Hi ${booking.user.name},\n\nYour booking for ${booking.property.propertyName} has been confirmed.\n\nThank you!`
      );
    }

    res.json({ success: true, message: `Booking ${status}`, booking });
  } catch (err) {
    console.error("Update Error:", err);
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
