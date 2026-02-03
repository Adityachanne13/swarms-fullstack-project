const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const reportRoutes = require("./routes/reportRoutes");
const path = require("path"); // Add this line!


// 1. Load env vars
dotenv.config();

// 2. Connect to Database
connectDB();

// 3. Initialize Express
const app = express();

// 4. Middleware (The Gatekeepers)
app.use(express.json()); // Allows us to accept JSON data in the body
app.use(cors());         // Allows frontend to talk to backend
app.use(morgan("dev"));  // Logs requests to the console (good for debugging)

// Make the uploads folder static so we can view images in browser
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);

// 5. Test Route (To check if server is working)
app.get("/", (req, res) => {
  res.send("API is running...");
});

// 6. Start Server
const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
