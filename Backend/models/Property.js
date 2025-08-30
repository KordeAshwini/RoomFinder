const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  propertyName: { type: String, required: true },
  ownerName: { type: String, required: true },
  propertyType: { type: String, required: true },
  flatType: { type: String },
  sharing: { type: Number },
  city: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String },
  email: { type: String },
  genderPreference: { type: String },
  foodPreference: { type: String },
  rent: { type: String },
  deposit: { type: String },
  pgRooms: { type: String },
  amenities: { type: String },
  image: { type: String }, // will store file path
}, { timestamps: true });

module.exports = mongoose.model("Property", propertySchema);
