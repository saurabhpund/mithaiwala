const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");

const app = express();
const errorHandler = require("./middleware/error.middleware");

app.use(cors());
app.use(express.json());
app.use(errorHandler);

app.use("/api/auth", authRoutes);

module.exports = app;
