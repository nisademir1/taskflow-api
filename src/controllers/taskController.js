const { readTasks, writeTasks, nextId } = require("../utils/fileDb");

function getAllTasks(req, res) {
  const tasks = readTasks();
  res.json({ success: true, count: tasks.length, data: tasks });
}

function getTaskById(req, res) {
  const id = Number(req.params.id);
  const task = readTasks().find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ success: false, message: `${id} id'li görev bulunamadı` });
  }

  res.json({ success: true, data: task });
}

function createTask(req, res) {
  const tasks = readTasks();
  const now = new Date().toISOString();

  const newTask = {
    id: nextId(tasks),
    title: req.body.title,
    description: req.body.description,
    status: req.body.status || "pending",
    priority: req.body.priority,
    assignee: req.body.assignee,
    project: req.body.project || "Genel",
    dueDate: req.body.dueDate || null,
    createdAt: now,
    updatedAt: now,
  };

  tasks.push(newTask);
  writeTasks(tasks);

  res.status(201).json({ success: true, message: "Görev oluşturuldu", data: newTask });
}

function updateTask(req, res) {
  const id = Number(req.params.id);
  const tasks = readTasks();
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: `${id} id'li görev bulunamadı` });
  }

  const allowed = ["title", "description", "status", "priority", "assignee", "project", "dueDate"];
  allowed.forEach((field) => {
    if (req.body[field] !== undefined) {
      tasks[index][field] = req.body[field];
    }
  });
  tasks[index].updatedAt = new Date().toISOString();

  writeTasks(tasks);
  res.json({ success: true, message: "Görev güncellendi", data: tasks[index] });
}

function deleteTask(req, res) {
  const id = Number(req.params.id);
  const tasks = readTasks();
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ success: false, message: `${id} id'li görev bulunamadı` });
  }

  writeTasks(tasks.filter((t) => t.id !== id));
  res.json({ success: true, message: "Görev silindi", data: task });
}

module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTask };