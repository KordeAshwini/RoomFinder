const express = require("express");
const { bookVisit, getUserVisits, getVisits } = require("../controllers/visitController");

const router = express.Router();

router.post("/book", bookVisit);
router.get("/user/:userId", getUserVisits);
router.get("/getVisits", getVisits);

module.exports = router;
