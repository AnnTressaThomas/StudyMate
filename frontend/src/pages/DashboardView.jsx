import React from "react";
import DashboardStats from "../components/DashboardStats";
import StudyProgress from "../components/StudyProgress";
import AssignmentCard from "../components/AssignmentCard";

function DashboardView({
  stats,
  assignments,
  onToggleStatus,
  onEditAssignment,
  onDeleteAssignment,
  onOpenAddModal,
}) {
  // Filter pending assignments for the upcoming deadline section
  // Sorted by earliest due date
  const upcomingAssignments = assignments
    .filter((a) => a.status === "Pending")
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  return (
    <div>
      <div className="top-action-bar">
        <div>
          <h2 className="page-title">Welcome back! 👋</h2>
          <p className="page-subtitle">Here is a summary of your academic tasks and progress.</p>
        </div>
        <button className="btn btn-primary" onClick={onOpenAddModal}>
          + New Assignment
        </button>
      </div>

      {/* Database Summary Stats */}
      <DashboardStats stats={stats} />

      {/* Study Progress Bar */}
      <StudyProgress
        completionPercentage={stats.completionPercentage}
        completedCount={stats.completedAssignments}
        totalCount={stats.totalAssignments}
      />

      {/* Upcoming & Overdue Deadlines Section */}
      <div className="card-section">
        <div className="section-title">
          <span>Upcoming & Urgent Tasks</span>
          <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: "normal" }}>
            Sorted by earliest deadline
          </span>
        </div>

        {upcomingAssignments.length === 0 ? (
          <div className="empty-state">
            <p>🎉 All caught up! You have no pending assignments right now.</p>
          </div>
        ) : (
          <div className="assignment-grid">
            {upcomingAssignments.map((assignment) => (
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
    </div>
  );
}

export default DashboardView;
