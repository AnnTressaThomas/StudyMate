const Subject = require("../models/Subject");
const Assignment = require("../models/Assignment");

// @desc    Get all subjects
// @route   GET /api/subjects
const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: subjects.length, data: subjects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get a single subject by ID
// @route   GET /api/subjects/:id
const getSubjectById = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) {
      return res.status(404).json({ success: false, message: "Subject not found" });
    }
    res.status(200).json({ success: true, data: subject });
  } catch (error) {
    res.status(500).json({ success: false, message: "Invalid subject ID or server error" });
  }
};

// @desc    Create a new subject
// @route   POST /api/subjects
const createSubject = async (req, res) => {
  try {
    const { name, code, color } = req.body;

    // Validation
    if (!name || name.trim() === "") {
      return res.status(400).json({ success: false, message: "Subject name is required" });
    }

    const newSubject = await Subject.create({
      name: name.trim(),
      code: code ? code.trim() : "",
      color: color || "#2563eb",
    });

    res.status(201).json({ success: true, data: newSubject });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update a subject
// @route   PUT /api/subjects/:id
const updateSubject = async (req, res) => {
  try {
    const { name, code, color } = req.body;

    const subject = await Subject.findById(req.params.id);
    if (!subject) {
      return res.status(404).json({ success: false, message: "Subject not found" });
    }

    if (name !== undefined) {
      if (name.trim() === "") {
        return res.status(400).json({ success: false, message: "Subject name cannot be empty" });
      }
      subject.name = name.trim();
    }
    if (code !== undefined) subject.code = code.trim();
    if (color !== undefined) subject.color = color;

    const updatedSubject = await subject.save();
    res.status(200).json({ success: true, data: updatedSubject });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete a subject (and optionally related assignments)
// @route   DELETE /api/subjects/:id
const deleteSubject = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) {
      return res.status(404).json({ success: false, message: "Subject not found" });
    }

    // Delete subject
    await Subject.findByIdAndDelete(req.params.id);

    // Also delete any assignments linked to this subject
    await Assignment.deleteMany({ subject: req.params.id });

    res.status(200).json({ success: true, message: "Subject and related assignments deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getSubjects,
  getSubjectById,
  createSubject,
  updateSubject,
  deleteSubject,
};
