const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");

const app = express();
const errorHandler = require("./middleware/error.middleware");
const { authenticate, authorize } = require("./middleware/auth.middleware");
const productRoutes = require("./routes/product.routes");

app.use(cors());
app.use(express.json());
app.use("/api/products", productRoutes);

app.get("/api/test", authenticate, (req, res) => {
  res.json({
    message: "Protected route working",
    user: req.user,
  });
});
app.use(errorHandler);

app.use("/api/auth", authRoutes);

module.exports = app;