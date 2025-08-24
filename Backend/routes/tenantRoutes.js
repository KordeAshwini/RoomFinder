const express = require("express");

const tenantController = require("../controllers/tenantController");

const router = express.Router();

router.post("/", tenantController.saveTenantProfile);
router.get("/:userId", tenantController.getTenantProfile);

module.exports = router;
