const { readTasks, writeTasks, nextId } = require("../utils/fileDb");

function getAllTasks(req, res) {
  let tasks = readTasks();
  const { status, priority, assignee, page, limit } = req.query;

  if (status) tasks = tasks.filter((t) => t.status === status);
  if (priority) tasks = tasks.filter((t) => t.priority === priority);
  if (assignee) tasks = tasks.filter((t) => t.assignee.toLowerCase() === assignee.toLowerCase());

  const total = tasks.length;

  if (page || limit) {
    const p = Number(page) || 1;
    const l = Number(limit) || 10;
    const start = (p - 1) * l;
    tasks = tasks.slice(start, start + l);

    return res.json({
      success: true,
      total,
      page: p,
      totalPages: Math.ceil(total / l),
      count: tasks.length,
      data: tasks,
    });
  }

  res.json({ success: true, count: total, data: tasks });
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
  function searchTasks(req, res) {
  const keyword = (req.query.keyword || "").toLowerCase();

  if (!keyword) {
    return res.status(400).json({ success: false, message: "keyword parametresi gereklidir" });
  }

  const results = readTasks().filter(
    (t) => t.title.toLowerCase().includes(keyword) || t.description.toLowerCase().includes(keyword)
  );

  res.json({ success: true, count: results.length, data: results });
}

  writeTasks(tasks.filter((t) => t.id !== id));
  res.json({ success: true, message: "Görev silindi", data: task });
}

module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTask, searchTasks };