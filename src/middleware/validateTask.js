const ALLOWED_STATUS = ["pending", "in-progress", "completed"];
const ALLOWED_PRIORITY = ["low", "medium", "high"];

function validateTask(isUpdate) {
  return (req, res, next) => {
    const { title, description, priority, assignee, status } = req.body || {};
    const errors = [];

    if (!isUpdate || title !== undefined) {
      if (typeof title !== "string" || title.trim().length < 3) {
        errors.push("title zorunludur ve en az 3 karakter olmalıdır");
      }
    }

    if (!isUpdate || description !== undefined) {
      if (typeof description !== "string" || description.trim() === "") {
        errors.push("description zorunludur ve boş olamaz");
      }
    }

    if (!isUpdate || priority !== undefined) {
      if (!ALLOWED_PRIORITY.includes(priority)) {
        errors.push("priority şunlardan biri olmalıdır: low, medium, high");
      }
    }

    if (!isUpdate || assignee !== undefined) {
      if (typeof assignee !== "string" || assignee.trim() === "") {
        errors.push("assignee (atanan kişi) zorunludur");
      }
    }

    if (status !== undefined && !ALLOWED_STATUS.includes(status)) {
      errors.push("status şunlardan biri olmalıdır: pending, in-progress, completed");
    }

    if (errors.length > 0) {
      return res.status(400).json({ success: false, message: "Geçersiz veri", errors });
    }

    next();
  };
}

module.exports = { validateTask };