const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

dotenv.config();

const app = express();

// MIDDLEWARE
// app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// DB CONNECTION
connectDB();

// 👇 Add this before any route
app.use(
  cors({
    origin: "https://employee-task-frontend.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api", uploadRoutes); // for /upload

// START SERVER
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
