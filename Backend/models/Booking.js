const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },      // who booked
  property: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true }, // which property

  moveInDate: { type: Date, required: true },
  stayDuration: { type: String, required: true },
  sharingPreference: { type: String, required: true },
  message: { type: String },
  gender: { type: String },
  typeOfTenant: { type: String },

  status: { type: String, enum: ["Pending", "Accepted", "Rejected","Confirmed"], default: "Pending" },
  paymentDueDate: { type: Date }, // New field for payment expiration
  // transactionId: { type: String }, // New field for Stripe transaction ID
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Booking", bookingSchema);
