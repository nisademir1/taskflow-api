const express = require("express");
const logger = require("./middleware/logger");                          
const { notFound, errorHandler } = require("./middleware/errorHandler"); 
const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(express.json());
app.use(logger);                                                         

app.get("/", (req, res) => {
  res.json({ message: "TaskFlow API çalışıyor" });
});

app.use("/api/tasks", taskRoutes);

app.use(notFound);                                                      
app.use(errorHandler);                                                   

module.exports = app;