const Property = require("../models/Property");
const fs = require("fs");
const path = require("path");

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
      typeOfTenant,
      foodPreference,
      rent,
      deposit,
      moveInDate,
      pgRooms,
      amenities,
    } = req.body;

    
   
    if (!propertyName || propertyName.trim().length < 3) {
      return res.status(400).json({ error: "Property name must be at least 3 characters long" });
    }
    if (!ownerName || ownerName.trim().length < 3) {
      return res.status(400).json({ error: "Owner name must be at least 3 characters long" });
    }
    if (!propertyType) {
      return res.status(400).json({ error: "Property type is required" });
    }
    if (propertyType === "Flat"&&!flatType) {
      return res.status(400).json({ error: "Flat type is required" });
    }
    if (!sharing && propertyType==="Flat" && typeOfTenant!=="Single" && typeOfTenant!=="Family") {
      return res.status(400).json({ error: "Sharing must be a valid positive number" });
    }
    if (!city || city.trim().length < 2) {
      return res.status(400).json({ error: "City name is required" });
    }
    if (!address || address.trim().length < 5) {
      return res.status(400).json({ error: "Address must be at least 5 characters long" });
    }
    if (!phone || !/^[0-9]{10}$/.test(phone)) {
      return res.status(400).json({ error: "Valid 10-digit phone number is required" });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "Valid email is required" });
    }
    if (!genderPreference && typeOfTenant!=="Family")  {
      return res.status(400).json({ error: "Gender preference is required" });
    }
    if (!foodPreference) {
      return res.status(400).json({ error: "Food preference is required" });
    }
    if (!rent || isNaN(rent) || rent <= 0) {
      return res.status(400).json({ error: "Valid rent amount is required" });
    }
    if (!deposit || isNaN(deposit) || deposit < 0) {
      return res.status(400).json({ error: "Valid deposit amount is required" });
    }
     if (propertyType === "PG" && !pgRooms) {
      return res.status(400).json({ error: "At least one PG room number is required" });
    }



    // Separate validation for PG and Flat properties
    if (propertyType === "PG" && !pgRooms) {
      return res.status(400).json({ error: "At least one PG room number is required" });
    }

    if (propertyType === "Flat" && !flatType) {
      return res.status(400).json({ error: "Flat type is required" });
    }

    // Convert amenities string to an array if it exists
    const amenitiesArray = amenities ? amenities.split(",").map((a) => a.trim()) : [];

    // All properties must have at least one amenity
    if (amenitiesArray.length === 0) {
      return res.status(400).json({ error: "At least one amenity is required" });
    }

    const images = req.files ? req.files.map((file) => "uploads/" + file.filename) : [];
    if (images.length === 0) {
      return res.status(400).json({ error: "At least one property image is required" });
    }

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
      typeOfTenant,
      foodPreference,
      rent,
      deposit,
      moveInDate,
      pgRooms,
      amenities: amenitiesArray.join(", "), // Save as a comma-separated string
      images,
    });

    await newProperty.save();

    res.status(201).json({ message: "Property uploaded successfully!", property: newProperty });
  } catch (err) {
    console.error("Error creating property:", err);
    res.status(500).json({ error: "Server error" });
  }
};



exports.getPropertiesByOwnerId = async (req, res) => {
  try {
    const { ownerId } = req.params;
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
    const updatedData = { ...req.body };
    let property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

     // ✅ Add validation for 'sharing' and other numeric fields
    if (updatedData.sharing === "null" || updatedData.sharing === "") {
      delete updatedData.sharing;
    }

    // Handle image updates
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => "uploads/" + file.filename);
      updatedData.images = [...property.images, ...newImages];
    } else {
      updatedData.images = property.images;
    }

    // Handle removal of images
    if (req.body.imagesToRemove) {
      const imagesToRemove = JSON.parse(req.body.imagesToRemove);
      updatedData.images = updatedData.images.filter(img => !imagesToRemove.includes(img));
      
      // Delete files from the filesystem
      imagesToRemove.forEach(img => {
        const imagePath = path.join(__dirname, "..", img);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      });
    }

    property = await Property.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json({ message: "Property updated successfully", property });
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

    // Delete all associated images from the filesystem
    deletedProperty.images.forEach(img => {
      const imagePath = path.join(__dirname, "..", img);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    });

    res.json({ message: "Property and its images deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error deleting property" });
  }
};