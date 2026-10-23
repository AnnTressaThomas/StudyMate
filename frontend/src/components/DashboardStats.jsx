import React from "react";

function DashboardStats({ stats }) {
  const statItems = [
    { title: "Total Subjects", value: stats.totalSubjects },
    { title: "Total Assignments", value: stats.totalAssignments },
    { title: "Pending", value: stats.pendingAssignments },
    { title: "Completed", value: stats.completedAssignments },
  ];

  return (
    <div className="stats-grid">
      {statItems.map((item, index) => (
        <div key={index} className="stat-card">
          <span className="stat-title">{item.title}</span>
          <span className="stat-value">{item.value}</span>
        </div>
      ))}
    </div>
  );
}

export default DashboardStats;
