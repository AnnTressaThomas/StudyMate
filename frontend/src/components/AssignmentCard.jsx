import React from "react";

function AssignmentCard({
  assignment,
  onToggleStatus,
  onEditAssignment,
  onDeleteAssignment,
}) {
  // Check if assignment is overdue
  const today = new Date().toISOString().split("T")[0];
  const dueDateStr = assignment.dueDate ? assignment.dueDate.split("T")[0] : "";
  const isOverdue =
    assignment.status === "Pending" && dueDateStr !== "" && dueDateStr < today;

  let cardStatusClass = "pending";
  if (assignment.status === "Completed") {
    cardStatusClass = "completed";
  } else if (isOverdue) {
    cardStatusClass = "overdue";
  }

  // Handle populated subject object or fallback
  const subjectObj = assignment.subject && typeof assignment.subject === "object" ? assignment.subject : null;
  const subjectName = subjectObj ? subjectObj.name : "General";
  const subjectColor = subjectObj?.color || "#2563eb";

  return (
    <div className={`assignment-card ${cardStatusClass}`}>
      <div className="assignment-header">
        <div>
          <h4 className="assignment-title">{assignment.title}</h4>
          <div className="assignment-meta" style={{ marginTop: "6px" }}>
            <span
              className="subject-badge"
              style={{
                backgroundColor: `${subjectColor}15`,
                color: subjectColor,
              }}
            >
              {subjectName}
            </span>
            <span style={{ color: "var(--text-muted)" }}>•</span>
            <span style={{ color: "var(--text-secondary)" }}>
              Due: {dueDateStr}
            </span>
          </div>
        </div>

        <div>
          {assignment.status === "Completed" ? (
            <span className="badge badge-complete">Completed</span>
          ) : isOverdue ? (
            <span className="badge badge-overdue">Overdue</span>
          ) : (
            <span className="badge badge-pending">Pending</span>
          )}
        </div>
      </div>

      <p className="assignment-desc">
        {assignment.description || "No description provided."}
      </p>

      <div className="assignment-actions">
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() => onToggleStatus(assignment)}
        >
          {assignment.status === "Completed" ? "Mark Pending" : "Mark Done"}
        </button>

        {onEditAssignment && (
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => onEditAssignment(assignment)}
          >
            Edit
          </button>
        )}

        {onDeleteAssignment && (
          <button
            type="button"
            className="btn btn-danger-outline btn-sm"
            onClick={() => onDeleteAssignment(assignment._id)}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default AssignmentCard;
