const mongoose = require("mongoose");

const TenantProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: String,
  email: String,
  phone: String,
  location: String,
  dob: String,
  gender: String,
  maritalStatus: String,
  employment: String,
  idProof: String,
});

module.exports = mongoose.model("TenantProfile", TenantProfileSchema);
