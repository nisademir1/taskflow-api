function notFound(req, res) {
  res.status(404).json({
    success: false,
    message: `Böyle bir endpoint yok: ${req.method} ${req.originalUrl}`,
  });
}

function errorHandler(err, req, res, next) {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ success: false, message: "Geçersiz JSON formatı" });
  }
  console.error(err);
  res.status(500).json({ success: false, message: "Sunucuda bir hata oluştu" });
}

module.exports = { notFound, errorHandler };