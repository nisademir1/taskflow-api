const express = require("express");
const router = express.Router();
const controller = require("../controllers/taskController");

router.get("/", controller.getAllTasks);

module.exports = router;