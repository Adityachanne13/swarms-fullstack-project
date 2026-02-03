const Report = require("../models/Report");

// @desc    Create a new waste report
// @route   POST /api/reports
// @access  Private (User)
const createReport = async (req, res) => {
  try {
    const { type, description, latitude, longitude, address } = req.body;

    // req.file is created by Multer (we will set this up in the route next)
    if (!req.file) {
      return res.status(400).json({ message: "Please upload an image" });
    }

    // Create the report
    const report = await Report.create({
      userId: req.user._id, // Comes from the protect middleware
      type,
      description,
      image: `/uploads/${req.file.filename}`, // Save path to image
      location: {
        latitude,
        longitude,
        address,
      },
    });

    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ message: "Server Error: " + error.message });
  }
};

// @desc    Get all reports (for Admin/Workers)
// @route   GET /api/reports
// @access  Private (Admin/Worker)
const getAllReports = async (req, res) => {
  try {
    // .populate('userId') replaces the ID with the actual User data (name, email)
    const reports = await Report.find().populate("userId", "name email");
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged in user's reports
// @route   GET /api/reports/my-reports
// @access  Private (User)
const getMyReports = async (req, res) => {
  try {
    const reports = await Report.find({ userId: req.user._id });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createReport, getAllReports, getMyReports };

// @desc    Update report status (Admin only)
// @route   PUT /api/reports/:id/status
// @access  Private (Admin)
const updateReportStatus = async (req, res) => {
  try {
    const { status } = req.body; // We expect { status: "Resolved" }
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    report.status = status;
    await report.save();

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DON'T FORGET to add it to module.exports at the bottom!
module.exports = { 
  createReport, 
  getAllReports, 
  getMyReports, 
  updateReportStatus // <--- ADD THIS
};