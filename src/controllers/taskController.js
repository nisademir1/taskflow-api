const { readTasks } = require("../utils/fileDb");

function getAllTasks(req, res) {
  const tasks = readTasks();
  res.json({ success: true, count: tasks.length, data: tasks });
}

module.exports = { getAllTasks };