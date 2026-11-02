const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.json({ message: "TaskFlow API çalışıyor" });
});

app.listen(PORT, () => {
  console.log(`Sunucu çalışıyor → http://localhost:${PORT}`);
});