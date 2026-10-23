const Assignment = require("../models/Assignment");
const Subject = require("../models/Subject");

// @desc    Get all assignments (with optional filters for status & subject)
// @route   GET /api/assignments
const getAssignments = async (req, res) => {
  try {
    const filter = {};

    // Filter by status if provided (?status=Pending or ?status=Completed)
    if (req.query.status) {
      filter.status = req.query.status;
    }

    // Filter by subject if provided (?subject=id)
    if (req.query.subject) {
      filter.subject = req.query.subject;
    }

    // Populate subject to get subject details (name, code, color)
    const assignments = await Assignment.find(filter)
      .populate("subject", "name code color")
      .sort({ dueDate: 1 }); // Sort by earliest deadline first

    res.status(200).json({ success: true, count: assignments.length, data: assignments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single assignment by ID
// @route   GET /api/assignments/:id
const getAssignmentById = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id).populate(
      "subject",
      "name code color"
    );
    if (!assignment) {
      return res.status(404).json({ success: false, message: "Assignment not found" });
    }
    res.status(200).json({ success: true, data: assignment });
  } catch (error) {
    res.status(500).json({ success: false, message: "Invalid assignment ID or server error" });
  }
};

// @desc    Create a new assignment
// @route   POST /api/assignments
const createAssignment = async (req, res) => {
  try {
    const { title, description, subject, dueDate, status } = req.body;

    // Validation
    if (!title || title.trim() === "") {
      return res.status(400).json({ success: false, message: "Title is required" });
    }
    if (!subject) {
      return res.status(400).json({ success: false, message: "Subject is required" });
    }
    if (!dueDate) {
      return res.status(400).json({ success: false, message: "Due date is required" });
    }

    // Check if the referenced subject exists
    const existingSubject = await Subject.findById(subject);
    if (!existingSubject) {
      return res.status(400).json({ success: false, message: "Referenced subject does not exist" });
    }

    const newAssignment = await Assignment.create({
      title: title.trim(),
      description: description ? description.trim() : "",
      subject,
      dueDate,
      status: status || "Pending",
    });

    // Populate subject before sending back
    const populated = await newAssignment.populate("subject", "name code color");

    res.status(201).json({ success: true, data: populated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update assignment (details or status)
// @route   PUT /api/assignments/:id
const updateAssignment = async (req, res) => {
  try {
    const { title, description, subject, dueDate, status } = req.body;

    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ success: false, message: "Assignment not found" });
    }

    // If subject is updated, verify it exists
    if (subject && subject !== assignment.subject.toString()) {
      const existingSubject = await Subject.findById(subject);
      if (!existingSubject) {
        return res.status(400).json({ success: false, message: "Referenced subject does not exist" });
      }
      assignment.subject = subject;
    }

    if (title !== undefined) {
      if (title.trim() === "") {
        return res.status(400).json({ success: false, message: "Title cannot be empty" });
      }
      assignment.title = title.trim();
    }
    if (description !== undefined) assignment.description = description.trim();
    if (dueDate !== undefined) {
      if (!dueDate) {
        return res.status(400).json({ success: false, message: "Due date cannot be empty" });
      }
      assignment.dueDate = dueDate;
    }
    if (status !== undefined) {
      if (!["Pending", "Completed"].includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Status must be either 'Pending' or 'Completed'",
        });
      }
      assignment.status = status;
    }

    const updated = await assignment.save();
    const populated = await updated.populate("subject", "name code color");

    res.status(200).json({ success: true, data: populated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete assignment
// @route   DELETE /api/assignments/:id
const deleteAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ success: false, message: "Assignment not found" });
    }

    await Assignment.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Assignment deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get dashboard statistics (summary counts and percentages)
// @route   GET /api/assignments/stats/summary
const getDashboardStats = async (req, res) => {
  try {
    const totalSubjects = await Subject.countDocuments();
    const totalAssignments = await Assignment.countDocuments();
    const completedAssignments = await Assignment.countDocuments({ status: "Completed" });
    const pendingAssignments = totalAssignments - completedAssignments;
    const completionPercentage =
      totalAssignments > 0
        ? Math.round((completedAssignments / totalAssignments) * 100)
        : 0;

    res.status(200).json({
      success: true,
      data: {
        totalSubjects,
        totalAssignments,
        completedAssignments,
        pendingAssignments,
        completionPercentage,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAssignments,
  getAssignmentById,
  createAssignment,
  updateAssignment,
  deleteAssignment,
  getDashboardStats,
};
