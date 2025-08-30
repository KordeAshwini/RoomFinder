const express = require("express");
const Property = require("../models/Property");

const router = express.Router();

// 📌 Get ALL properties
router.get("/", async (req, res) => {
  try {
    const properties = await Property.find(); // fetch all properties
    if (!properties || properties.length === 0) {
      return res.status(404).json({ message: "No properties found" });
    }
    res.json(properties);
  } catch (err) {
    console.error("Error fetching all properties:", err);
    res.status(500).json({ message: "Server error fetching properties" });
  }
});

module.exports = router;
