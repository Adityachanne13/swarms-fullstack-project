const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { createReport, getAllReports, getMyReports } = require("../controllers/reportController");
const { protect } = require("../middleware/authMiddleware");

// --- Multer Configuration (File Upload) ---
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/"); // Files will be saved in 'server/uploads'
  },
  filename(req, file, cb) {
    // Naming the file: report-DATE.jpg
    cb(null, `report-${Date.now()}${path.extname(file.originalname)}`);
  },
});

// Filter to accept only images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload an image."), false);
  }
};

const upload = multer({ storage, fileFilter });
// ------------------------------------------

// Routes
router.route("/")
  .post(protect, upload.single("image"), createReport) // PROTECTED + IMAGE UPLOAD
  .get(protect, getAllReports);

router.route("/my-reports").get(protect, getMyReports);

// Add this new route
const { updateReportStatus } = require("../controllers/reportController");
const { admin } = require("../middleware/authMiddleware");

// PUT /api/reports/:id/status
router.route("/:id/status").put(protect, admin, updateReportStatus);

module.exports = router;