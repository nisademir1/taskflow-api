const express = require("express");
const { validateTask } = require("../middleware/validateTask");
const router = express.Router();
const controller = require("../controllers/taskController");

router.get("/search", controller.searchTasks);
router.get("/", controller.getAllTasks);
router.get("/:id", controller.getTaskById);
router.post("/", validateTask(false), controller.createTask);
router.put("/:id", validateTask(true), controller.updateTask);
router.delete("/:id", controller.deleteTask);

module.exports = router;