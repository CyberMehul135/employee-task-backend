const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

// MIDDLEWARE
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// DB CONNECTION
connectDB();

// ROUTES
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/employees", require("./routes/employeeRoutes"));
app.use("/api", require("./routes/uploadRoutes")); // for /upload

// START SERVER
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
