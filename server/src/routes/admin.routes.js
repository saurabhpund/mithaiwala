const express = require("express");
const { authenticate, authorize } = require("../middleware/auth.middleware");
const router = express.Router();
const analyticsController = require("../controllers/analytics.controller");

router.get("/analytics/overview", authenticate, authorize("ADMIN"), analyticsController.getOverview);


module.exports = router;