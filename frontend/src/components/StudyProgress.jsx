import React from "react";

function StudyProgress({ completionPercentage, completedCount, totalCount }) {
  const percent = totalCount > 0 ? completionPercentage : 0;

  return (
    <div className="progress-container">
      <div className="progress-header">
        <span className="progress-label">Study Progress & Completion</span>
        <span className="progress-percent">
          {percent}% ({completedCount}/{totalCount} Completed)
        </span>
      </div>
      <div className="progress-bar-bg">
        <div
          className="progress-bar-fill"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
}

export default StudyProgress;
