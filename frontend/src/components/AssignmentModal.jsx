import React, { useState, useEffect } from "react";

function AssignmentModal({
  isOpen,
  onClose,
  onSubmit,
  subjects,
  assignmentToEdit,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("Pending");
  const [error, setError] = useState("");

  useEffect(() => {
    if (assignmentToEdit) {
      setTitle(assignmentToEdit.title || "");
      setDescription(assignmentToEdit.description || "");
      const currentSubId =
        typeof assignmentToEdit.subject === "object"
          ? assignmentToEdit.subject?._id
          : assignmentToEdit.subject;
      setSubjectId(currentSubId || (subjects[0] ? subjects[0]._id : ""));
      setDueDate(
        assignmentToEdit.dueDate ? assignmentToEdit.dueDate.split("T")[0] : ""
      );
      setStatus(assignmentToEdit.status || "Pending");
    } else {
      setTitle("");
      setDescription("");
      setSubjectId(subjects[0] ? subjects[0]._id : "");
      setDueDate("");
      setStatus("Pending");
    }
    setError("");
  }, [assignmentToEdit, isOpen, subjects]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Please provide an assignment title.");
      return;
    }
    if (!subjectId) {
      setError("Please select a subject (or create one first).");
      return;
    }
    if (!dueDate) {
      setError("Please choose a due date.");
      return;
    }

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      subject: subjectId,
      dueDate,
      status,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">
            {assignmentToEdit ? "Edit Assignment" : "Add New Assignment"}
          </h3>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {error && (
          <div
            style={{
              padding: "10px 14px",
              backgroundColor: "#fee2e2",
              color: "#991b1b",
              borderRadius: "6px",
              marginBottom: "16px",
              fontSize: "0.9rem",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Assignment Title *</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Calculus Homework 2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Subject *</label>
            <select
              className="form-select"
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
              required
            >
              {subjects.length === 0 ? (
                <option value="">No subjects found - please create one</option>
              ) : (
                subjects.map((sub) => (
                  <option key={sub._id} value={sub._id}>
                    {sub.name} {sub.code ? `(${sub.code})` : ""}
                  </option>
                ))
              )}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Due Date *</label>
            <input
              type="date"
              className="form-input"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>

          {assignmentToEdit && (
            <div className="form-group">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-textarea"
              placeholder="Add key notes, page numbers, or requirements..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={subjects.length === 0}
            >
              {assignmentToEdit ? "Save Changes" : "Create Assignment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AssignmentModal;
