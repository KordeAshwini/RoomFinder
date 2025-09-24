const Visit = require("../models/Visit");
const User = require("../models/user");
const Property = require("../models/Property");
const sendEmail = require("../utils/sendEmail"); // ✅ Import your email utility
// ✅ Book a visit
exports.bookVisit = async (req, res) => {
  try {
    const { userId, propertyId, propertyName, date, slot } = req.body;
    //console.log(req.body);

    if (!userId || !propertyId || !propertyName || !date || !slot) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check user & property
    const user = await User.findById(userId);
    const property = await Property.findById(propertyId).populate("ownerId", "name email");

    if (!user || !property) {
      return res.status(404).json({ message: "User or Property not found" });
    }

    // ⛔ Prevent same day duplicate booking
    const sameDayVisit = await Visit.findOne({ userId, propertyId, date });
    if (sameDayVisit) {
      return res.status(400).json({ message: "You already booked a visit for this PG on this date" });
    }

    // Prevent duplicate booking for same slot
    const existingVisit = await Visit.findOne({ userId, propertyId,date, slot });
    if (existingVisit) {
      return res.status(400).json({ message: "You already booked this slot" });
    }

      // 2️⃣ Count total visits already booked by this user for same PG
    const visitCount = await Visit.countDocuments({ userId, propertyId });
    if (visitCount >= 1) {
      return res.status(400).json({ message: "You can only book up to 1 visit for this PG" });
    }

    // 🔹 Use ownerId from property
    const visit = new Visit({
      userId,
      propertyId,
      ownerId: property.ownerId._id,
      propertyName,
      date,
      slot,
    });

    await visit.save();

    // ✅ Send Email to Tenant (User)
    await sendEmail(
      user.email,
    "Visit Scheduled - Room Finder",
      `
    Hi ${user.name},
    Your visit has been successfully scheduled.
      
    PG: ${propertyName}
    Date: ${date}
    Slot: ${slot}
    
    Thank you,
    Room Finder Team
      `
    );

    // ✅ Send Email to Owner
    if (property.ownerId?.email) {
      await sendEmail(
        property.ownerId.email,
        "New Visit Scheduled - Room Finder",
        `
        Hi ${property.ownerId.name},
        
        A new tenant has scheduled a visit for your property.
        
        PG:${propertyName}
        Date: ${date}
        Slot: ${slot}
        Tenant Name: ${user.name}
        Tenant Email: ${user.email}
        Thank you,
        Room Finder Team
        `
      );
    }

    res.status(201).json({ message: "Visit booked successfully and emails sent", visit });
  } catch (error) {
    console.error("Error booking visit:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// ✅ Get visits for a user
exports.getUserVisits = async (req, res) => {
  try {
    const { userId } = req.params;
    const visits = await Visit.find({ userId }).populate("propertyId", "propertyName address city");
    res.json(visits);
  } catch (error) {
    console.error("Error fetching visits:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get visits for a property (for owner)
// exports.getPropertyVisits = async (req, res) => {
//   try {
//     const { propertyId } = req.params;
//     const visits = await Visit.find({ propertyId }).populate("userId", "name email");
//     res.json(visits);
//   } catch (error) {
//     console.error("Error fetching property visits:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

exports.getVisits = async (req, res) => {
  try {
    const visits = await Visit.find()
      .populate("userId", "name email phone") // fetch user details
      .populate({
        path: "propertyId",                // fetch property
        select: "propertyName propertyType address city rent ownerId", // include ownerId in response
        populate: {                      // nested populate: ownerId -> User
          path: "ownerId",
          model: "User",
          select: "name email phone",
        },
      });

    res.json({ success: true, visits });
  } catch (err) {
    console.error("❌ Fetch Error:", err);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};
