import React, { useState, useEffect } from "react";

function SubjectModal({ isOpen, onClose, onSubmit, subjectToEdit }) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [color, setColor] = useState("#2563eb");
  const [error, setError] = useState("");

  useEffect(() => {
    if (subjectToEdit) {
      setName(subjectToEdit.name || "");
      setCode(subjectToEdit.code || "");
      setColor(subjectToEdit.color || "#2563eb");
    } else {
      setName("");
      setCode("");
      setColor("#2563eb");
    }
    setError("");
  }, [subjectToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter a subject name.");
      return;
    }

    onSubmit({
      name: name.trim(),
      code: code.trim(),
      color,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">
            {subjectToEdit ? "Edit Subject" : "Add New Subject"}
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
            <label className="form-label">Subject Name *</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Computer Science"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Subject Code / Short Code</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. CS101"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Badge Color</label>
            <input
              type="color"
              className="form-input"
              style={{ height: "45px", padding: "4px" }}
              value={color}
              onChange={(e) => setColor(e.target.value)}
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
            <button type="submit" className="btn btn-primary">
              {subjectToEdit ? "Save Changes" : "Save Subject"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SubjectModal;
