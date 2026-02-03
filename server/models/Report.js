const mongoose = require("mongoose");

const reportSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Links this report to the citizen who created it
      required: true,
    },
    type: {
      type: String,
      required: true, // e.g., "Plastic", "Organic", "Electronic"
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true, // URL of the waste image
    },
    location: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
      address: { type: String }, // Optional readable address
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved"],
      default: "Pending",
    },
    assignedWorkerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Links to the Worker assigned to fix this
      default: null,
    },
    completionProofImage: {
      type: String, // Worker uploads this when finished
    },
  },
  {
    timestamps: true,
  }
);

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;