const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "..", "data", "tasks.json");

function readTasks() {
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(raw);
}

module.exports = { readTasks };