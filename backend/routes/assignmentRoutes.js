const express = require("express");
const router = express.Router();
const {
  getAssignments,
  getAssignmentById,
  createAssignment,
  updateAssignment,
  deleteAssignment,
  getDashboardStats,
} = require("../controllers/assignmentController");

// Special route for stats
router.get("/stats/summary", getDashboardStats);

router.route("/").get(getAssignments).post(createAssignment);
router.route("/:id").get(getAssignmentById).put(updateAssignment).delete(deleteAssignment);

module.exports = router;
