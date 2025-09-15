const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },      // who booked
  property: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true }, // which property

  moveInDate: { type: Date, required: true },
  stayDuration: { type: String, required: true },
  sharingPreference: { type: String, required: true },
  message: { type: String },

  status: { type: String, enum: ["Pending", "Accepted", "Rejected"], default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Booking", bookingSchema);

