const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Assignment title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: [true, "Subject reference is required"],
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
    },
    status: {
      type: String,
      enum: {
        values: ["Pending", "Completed"],
        message: "Status must be either 'Pending' or 'Completed'",
      },
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Assignment", assignmentSchema);
