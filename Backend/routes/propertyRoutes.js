
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
const { createProperty,getPropertiesByOwnerId,getPropertyById,updateProperty,deleteProperty} = require("../controllers/propertyController");
//const Property = require("../models/Property");

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
router.post("/createproperties", upload.array("images"), createProperty);

// ✅ Get properties by ownerId
router.get("/owner/:ownerId", getPropertiesByOwnerId);

// ✅ Get single property by ID (for editing form)
router.get("/:id", getPropertyById);

// ✅ Update property by ID
router.put("/:id", upload.array("images"), updateProperty);


// ✅ Delete property by ID
router.delete("/:id", deleteProperty);


module.exports = router;
