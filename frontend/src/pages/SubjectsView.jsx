import React from "react";

function SubjectsView({
  subjects,
  assignments,
  onOpenAddModal,
  onEditSubject,
  onDeleteSubject,
}) {
  return (
    <div>
      <div className="top-action-bar">
        <div>
          <h2 className="page-title">Subjects</h2>
          <p className="page-subtitle">Organize and manage your academic courses.</p>
        </div>
        <button className="btn btn-primary" onClick={onOpenAddModal}>
          + Add Subject
        </button>
      </div>

      {subjects.length === 0 ? (
        <div className="empty-state">
          <p>No subjects added yet. Click "+ Add Subject" to get started!</p>
        </div>
      ) : (
        <div className="subject-grid">
          {subjects.map((sub) => {
            const subjectAssignments = assignments.filter((a) => {
              const subId =
                typeof a.subject === "object" && a.subject !== null
                  ? a.subject._id
                  : a.subject;
              return subId === sub._id;
            });

            const pendingCount = subjectAssignments.filter(
              (a) => a.status === "Pending"
            ).length;

            return (
              <div key={sub._id} className="subject-card">
                <div className="subject-card-header">
                  <span
                    className="subject-color-pill"
                    style={{ backgroundColor: sub.color || "#2563eb" }}
                  ></span>
                  <div>
                    <h3 className="subject-card-title">{sub.name}</h3>
                    <span className="subject-card-code">{sub.code || "NO CODE"}</span>
                  </div>
                </div>

                <div
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--text-secondary)",
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "8px",
                  }}
                >
                  <span>{subjectAssignments.length} Total tasks</span>
                  <span
                    style={{
                      fontWeight: 600,
                      color: pendingCount > 0 ? "#ea580c" : "#16a34a",
                    }}
                  >
                    {pendingCount} Pending
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "8px",
                    marginTop: "12px",
                    borderTop: "1px solid var(--border-color)",
                    paddingTop: "10px",
                  }}
                >
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => onEditSubject(sub)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger-outline btn-sm"
                    onClick={() => onDeleteSubject(sub._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SubjectsView;
