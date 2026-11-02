const express = require("express");
const router = express.Router();
const controller = require("../controllers/taskController");

router.get("/", controller.getAllTasks);
router.get("/:id", controller.getTaskById);
router.post("/", controller.createTask);

module.exports = router;