const Property = require("../models/Property");

const createProperty = async (req, res) => {
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
    const image = req.file ? "uploads/" + req.file.filename : null;

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
      image,
    });

    await newProperty.save();

    res.status(201).json({ message: "Property uploaded successfully!", property: newProperty });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { createProperty };


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
