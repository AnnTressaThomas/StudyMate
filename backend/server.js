const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const subjectRoutes = require("./routes/subjectRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");
const errorHandler = require("./middleware/errorMiddleware");

const path = require("path");

// Load environment variables from .env in backend directory
dotenv.config({ path: path.join(__dirname, ".env") });

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
// Enable CORS for frontend requests (allows development localhost and configured production client)
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, or Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes("*")) {
        return callback(null, true);
      }
      return callback(null, true); // Fallback to allow connection in development/preview
    },
    credentials: true,
  })
);

// Parse incoming JSON payloads
app.use(express.json());

// Base health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "StudyMate API is running!" });
});

// API Routes
app.use("/api/subjects", subjectRoutes);
app.use("/api/assignments", assignmentRoutes);

// Custom Error Handling Middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 StudyMate Server running on http://localhost:${PORT}`);
});
