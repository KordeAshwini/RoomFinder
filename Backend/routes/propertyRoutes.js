
// const express = require("express");
// const multer = require("multer");
// const path = require("path");
// const { createProperty } = require("../controllers/propertyController");
// const Property = require("../models/Property");


// const router = express.Router();

// // Ensure uploads folder exists
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, "../uploads")); // safe absolute path
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage });

// // POST route to upload property
// router.post("/createproperties", upload.single("image"), createProperty);
// //router.post("/", upload.array("images", 5), createProperty); 
// // 📌 Get properties by ownerId
// router.get("/owner/:ownerId", async (req, res) => {
//   try {
//     const { ownerId } = req.params;
//     console.log("Fetching properties for ownerId:", ownerId);
//     const properties = await Property.find({ ownerId: ownerId }); // "owner" must be a field in Property schema

//     if (!properties || properties.length === 0) {
//       return res.status(404).json({ message: "No properties found for this owner" });
//     }

//     res.json(properties);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error fetching properties" });
//   }
// });


// module.exports = router;




const express = require("express");
const multer = require("multer");
const path = require("path");
const { createProperty } = require("../controllers/propertyController");
const Property = require("../models/Property");

const router = express.Router();

// Storage for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads")); // uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ✅ CREATE property
router.post("/createproperties", upload.single("image"), createProperty);

// ✅ Get properties by ownerId
router.get("/owner/:ownerId", async (req, res) => {
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
});

// ✅ Get single property by ID (for editing form)
router.get("/:id", async (req, res) => {
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
});

// ✅ Update property by ID
router.put("/:id", upload.single("image"), async (req, res) => {
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
});


// ✅ Delete property by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProperty = await Property.findByIdAndDelete(id);

    if (!deletedProperty) return res.status(404).json({ message: "Property not found" });

    res.json({ message: "Property deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error deleting property" });
  }
});


module.exports = router;
