const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subject name is required"],
      trim: true,
    },
    code: {
      type: String,
      trim: true,
      default: "",
    },
    color: {
      type: String,
      default: "#2563eb", // Default blue accent
    },
  },
  {
    timestamps: true, // Automatically creates createdAt and updatedAt
  }
);

module.exports = mongoose.model("Subject", subjectSchema);
