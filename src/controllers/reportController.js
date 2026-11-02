const { readTasks } = require("../utils/fileDb");

function completedReport(req, res) {
  const tasks = readTasks().filter((t) => t.status === "completed");
  res.json({ success: true, completedCount: tasks.length, data: tasks });
}

function pendingReport(req, res) {
  const tasks = readTasks().filter((t) => t.status !== "completed");
  res.json({ success: true, pendingCount: tasks.length, data: tasks });
}

function summaryReport(req, res) {
  const tasks = readTasks();

  const countBy = (field) => {
    const result = {};
    tasks.forEach((t) => {
      const key = t[field];
      result[key] = (result[key] || 0) + 1;
    });
    return result;
  };

  const completed = tasks.filter((t) => t.status === "completed").length;
  const rate = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;

  res.json({
    success: true,
    data: {
      totalTasks: tasks.length,
      completionRate: `%${rate}`,
      byStatus: countBy("status"),
      byPriority: countBy("priority"),
      byAssignee: countBy("assignee"),
    },
  });
}

module.exports = { completedReport, pendingReport, summaryReport };