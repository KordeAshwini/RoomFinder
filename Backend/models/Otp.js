const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true, },
  otpHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },
  tries: { type: Number, default: 0 } // number of verify attempts
});

otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // TTL index
module.exports = mongoose.model("Otp", otpSchema);
