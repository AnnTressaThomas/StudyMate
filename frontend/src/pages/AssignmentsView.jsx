import React, { useState } from "react";
import AssignmentCard from "../components/AssignmentCard";

function AssignmentsView({
  assignments,
  subjects,
  onToggleStatus,
  onEditAssignment,
  onDeleteAssignment,
  onOpenAddModal,
}) {
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedSubject, setSelectedSubject] = useState("All");

  // Filter assignments
  const filteredAssignments = assignments.filter((a) => {
    const statusMatch =
      filterStatus === "All" ? true : a.status === filterStatus;

    const subId =
      typeof a.subject === "object" && a.subject !== null
        ? a.subject._id
        : a.subject;

    const subjectMatch =
      selectedSubject === "All" ? true : subId === selectedSubject;

    return statusMatch && subjectMatch;
  });

  return (
    <div>
      <div className="top-action-bar">
        <div>
          <h2 className="page-title">Assignments</h2>
          <p className="page-subtitle">Track, filter, and manage your assignments.</p>
        </div>
        <button className="btn btn-primary" onClick={onOpenAddModal}>
          + Add Assignment
        </button>
      </div>

      {/* Filter controls */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <label style={{ fontSize: "0.9rem", fontWeight: "600" }}>Status:</label>
          <select
            className="form-select"
            style={{ width: "auto" }}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <label style={{ fontSize: "0.9rem", fontWeight: "600" }}>Subject:</label>
          <select
            className="form-select"
            style={{ width: "auto" }}
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="All">All Subjects</option>
            {subjects.map((sub) => (
              <option key={sub._id} value={sub._id}>
                {sub.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Assignment Grid */}
      {filteredAssignments.length === 0 ? (
        <div className="empty-state">
          <p>No assignments found matching the selected filters.</p>
        </div>
      ) : (
        <div className="assignment-grid">
          {filteredAssignments.map((assignment) => (
            <AssignmentCard
              key={assignment._id}
              assignment={assignment}
              onToggleStatus={onToggleStatus}
              onEditAssignment={onEditAssignment}
              onDeleteAssignment={onDeleteAssignment}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default AssignmentsView;
