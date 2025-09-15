const e = require("express");
const Property = require("../models/Property");

exports.createProperty = async (req, res) => {
  try {
    const {
      ownerId,
      propertyName,
      ownerName,
      propertyType,
      flatType,
      sharing,
      city,
      address,
      phone,
      email,
      genderPreference,
      foodPreference,
      rent,
      deposit,
      pgRooms,
      amenities,
    } = req.body;

    // Save relative path instead of just filename
    const images = req.files ? req.files.map(file => "uploads/" + file.filename) : [];

    const newProperty = new Property({
      ownerId,
      propertyName,
      ownerName,
      propertyType,
      flatType,
      sharing,
      city,
      address,
      phone,
      email,
      genderPreference,
      foodPreference,
      rent,
      deposit,
      pgRooms,
      amenities,
      images, // store as array
    });

    await newProperty.save();

    res.status(201).json({ message: "Property uploaded successfully!", property: newProperty });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getPropertiesByOwnerId = async (req, res) => {
  try {
    const { ownerId } = req.params;
    // console.log("Fetching properties for ownerId:", ownerId);

    const properties = await Property.find({ ownerId: ownerId });

    if (!properties || properties.length === 0) {
      return res.status(404).json({ message: "No properties found for this owner" });
    }

    res.json(properties);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching properties" });
  }
};

exports.getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json(property);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching property" });
  }
};

exports.updateProperty = async (req, res) => {
  try {
    const { id } = req.params;

    // Collect updated fields from request
    const updatedData = { ...req.body };

    // If image is uploaded, update it too
    if (req.file) {
      updatedData.image = req.file.filename;
    }

    const updatedProperty = await Property.findByIdAndUpdate(id, updatedData, {
      new: true, // return updated document
      runValidators: true, // validate schema rules
    });

    if (!updatedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json({ message: "Property updated successfully", property: updatedProperty });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error updating property" });
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProperty = await Property.findByIdAndDelete(id);

    if (!deletedProperty) return res.status(404).json({ message: "Property not found" });

    res.json({ message: "Property deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error deleting property" });
  }
};

// const Property = require("../models/Property");

// const createProperty = async (req, res) => {
//   try {
//     const {
//       propertyName,
//       ownerName,
//       propertyType,
//       flatType,
//       sharing,
//       city,
//       address,
//       phone,
//       email,
//       genderPreference,
//       foodPreference,
//       rent,
//       deposit,
//       pgRooms,
//       amenities,
//     } = req.body;

//     // Save relative paths instead of just filenames (for multiple images)
//     const images = req.files ? req.files.map(file => "uploads/" + file.filename) : [];

//     const newProperty = new Property({
//       propertyName,
//       ownerName,
//       propertyType,
//       flatType,
//       sharing,
//       city,
//       address,
//       phone,
//       email,
//       genderPreference,
//       foodPreference,
//       rent,
//       deposit,
//       pgRooms,
//       amenities,
//       images, // store as array
//     });

//     await newProperty.save();

//     res.status(201).json({ message: "Property uploaded successfully!", property: newProperty });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error" });
//   }
// };

// module.exports = { createProperty };

