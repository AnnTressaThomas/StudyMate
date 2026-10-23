import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import DashboardView from "./pages/DashboardView";
import AssignmentsView from "./pages/AssignmentsView";
import SubjectsView from "./pages/SubjectsView";
import AssignmentModal from "./components/AssignmentModal";
import SubjectModal from "./components/SubjectModal";
import {
  getSubjects,
  createSubject,
  updateSubject,
  deleteSubject,
  getAssignments,
  createAssignment,
  updateAssignment,
  deleteAssignment,
  getDashboardStats,
} from "./services/api";

function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [subjects, setSubjects] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [stats, setStats] = useState({
    totalSubjects: 0,
    totalAssignments: 0,
    completedAssignments: 0,
    pendingAssignments: 0,
    completionPercentage: 0,
  });

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Modals state
  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);

  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);

  const showNotification = (msg, isError = false) => {
    if (isError) {
      setErrorMessage(msg);
      setTimeout(() => setErrorMessage(""), 4500);
    } else {
      setSuccessMessage(msg);
      setTimeout(() => setSuccessMessage(""), 3500);
    }
  };

  // Fetch all data from backend
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [subjectsRes, assignmentsRes, statsRes] = await Promise.all([
        getSubjects(),
        getAssignments(),
        getDashboardStats(),
      ]);

      setSubjects(subjectsRes.data || []);
      setAssignments(assignmentsRes.data || []);
      setStats(
        statsRes.data || {
          totalSubjects: 0,
          totalAssignments: 0,
          completedAssignments: 0,
          pendingAssignments: 0,
          completionPercentage: 0,
        }
      );
      setErrorMessage("");
    } catch (err) {
      showNotification(
        "Failed to connect to the backend server. Make sure MongoDB and backend (port 5000) are running.",
        true
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handle Assignment Status Toggle
  const handleToggleStatus = async (assignment) => {
    const newStatus =
      assignment.status === "Completed" ? "Pending" : "Completed";
    try {
      await updateAssignment(assignment._id, { status: newStatus });
      showNotification(`Assignment marked as ${newStatus}`);
      fetchData();
    } catch (err) {
      showNotification(err.message, true);
    }
  };

  // Create or Update Assignment
  const handleSaveAssignment = async (formData) => {
    try {
      if (editingAssignment) {
        await updateAssignment(editingAssignment._id, formData);
        showNotification("Assignment updated successfully!");
      } else {
        await createAssignment(formData);
        showNotification("Assignment created successfully!");
      }
      setIsAssignmentModalOpen(false);
      setEditingAssignment(null);
      fetchData();
    } catch (err) {
      showNotification(err.message, true);
    }
  };

  // Delete Assignment
  const handleDeleteAssignment = async (id) => {
    if (!window.confirm("Are you sure you want to delete this assignment?")) {
      return;
    }
    try {
      await deleteAssignment(id);
      showNotification("Assignment deleted.");
      fetchData();
    } catch (err) {
      showNotification(err.message, true);
    }
  };

  // Open Edit Assignment Modal
  const handleEditAssignment = (assignment) => {
    setEditingAssignment(assignment);
    setIsAssignmentModalOpen(true);
  };

  // Create or Update Subject
  const handleSaveSubject = async (formData) => {
    try {
      if (editingSubject) {
        await updateSubject(editingSubject._id, formData);
        showNotification("Subject updated successfully!");
      } else {
        await createSubject(formData);
        showNotification("Subject created successfully!");
      }
      setIsSubjectModalOpen(false);
      setEditingSubject(null);
      fetchData();
    } catch (err) {
      showNotification(err.message, true);
    }
  };

  // Delete Subject
  const handleDeleteSubject = async (id) => {
    if (
      !window.confirm(
        "Are you sure? Deleting this subject will also delete all assignments linked to it."
      )
    ) {
      return;
    }
    try {
      await deleteSubject(id);
      showNotification("Subject and its assignments were deleted.");
      fetchData();
    } catch (err) {
      showNotification(err.message, true);
    }
  };

  // Open Edit Subject Modal
  const handleEditSubject = (subject) => {
    setEditingSubject(subject);
    setIsSubjectModalOpen(true);
  };

  return (
    <div className="app-layout">
      {/* Sidebar Navigation */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Page Area */}
      <main className="main-content">
        {/* Global Notifications */}
        {successMessage && (
          <div
            style={{
              padding: "12px 18px",
              backgroundColor: "#dcfce7",
              color: "#166534",
              borderRadius: "8px",
              marginBottom: "20px",
              fontWeight: 500,
            }}
          >
            ✅ {successMessage}
          </div>
        )}

        {errorMessage && (
          <div
            style={{
              padding: "12px 18px",
              backgroundColor: "#fee2e2",
              color: "#991b1b",
              borderRadius: "8px",
              marginBottom: "20px",
              fontWeight: 500,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>❌ {errorMessage}</span>
            <button
              onClick={fetchData}
              className="btn btn-secondary btn-sm"
              style={{ borderColor: "#fca5a5" }}
            >
              Retry
            </button>
          </div>
        )}

        {loading ? (
          <div className="empty-state" style={{ padding: "80px 20px" }}>
            <p>⏳ Loading data from MongoDB database...</p>
          </div>
        ) : (
          <>
            {activeTab === "dashboard" && (
              <DashboardView
                stats={stats}
                assignments={assignments}
                onToggleStatus={handleToggleStatus}
                onEditAssignment={handleEditAssignment}
                onDeleteAssignment={handleDeleteAssignment}
                onOpenAddModal={() => {
                  setEditingAssignment(null);
                  setIsAssignmentModalOpen(true);
                }}
              />
            )}

            {activeTab === "assignments" && (
              <AssignmentsView
                assignments={assignments}
                subjects={subjects}
                onToggleStatus={handleToggleStatus}
                onEditAssignment={handleEditAssignment}
                onDeleteAssignment={handleDeleteAssignment}
                onOpenAddModal={() => {
                  setEditingAssignment(null);
                  setIsAssignmentModalOpen(true);
                }}
              />
            )}

            {activeTab === "subjects" && (
              <SubjectsView
                subjects={subjects}
                assignments={assignments}
                onOpenAddModal={() => {
                  setEditingSubject(null);
                  setIsSubjectModalOpen(true);
                }}
                onEditSubject={handleEditSubject}
                onDeleteSubject={handleDeleteSubject}
              />
            )}
          </>
        )}
      </main>

      {/* Assignment Modal */}
      <AssignmentModal
        isOpen={isAssignmentModalOpen}
        onClose={() => {
          setIsAssignmentModalOpen(false);
          setEditingAssignment(null);
        }}
        onSubmit={handleSaveAssignment}
        subjects={subjects}
        assignmentToEdit={editingAssignment}
      />

      {/* Subject Modal */}
      <SubjectModal
        isOpen={isSubjectModalOpen}
        onClose={() => {
          setIsSubjectModalOpen(false);
          setEditingSubject(null);
        }}
        onSubmit={handleSaveSubject}
        subjectToEdit={editingSubject}
      />
    </div>
  );
}

export default App;
