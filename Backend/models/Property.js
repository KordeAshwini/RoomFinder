const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  propertyName: { type: String, required: true },
  ownerName: { type: String, required: true },
  propertyType: { type: String, required: true },
  flatType: { type: String},
  sharing: { type: Number, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  genderPreference: { type: String, required: true },
  foodPreference: { type: String, required: true },
  rent: { type: String, required: true },
  deposit: { type: String, required: true },
  pgRooms: { type: String, required: true },
  amenities: { type: String, required: true },
// image: { type: String }, // will store file path
  images: [{ type: String, required: true }], // array to store multiple image file paths
}, { timestamps: true });

module.exports = mongoose.model("Property", propertySchema);
