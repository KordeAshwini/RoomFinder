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
      foodPreference,
      rent,
      deposit,
      pgRooms,
      amenities,
    } = req.body;

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
      images,
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