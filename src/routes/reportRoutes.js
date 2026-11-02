const express = require("express");
const router = express.Router();
const controller = require("../controllers/reportController");

router.get("/completed", controller.completedReport);
router.get("/pending", controller.pendingReport);
router.get("/summary", controller.summaryReport);

module.exports = router;