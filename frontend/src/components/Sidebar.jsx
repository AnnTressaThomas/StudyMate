import React from "react";

function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "subjects", label: "Subjects", icon: "📚" },
    { id: "assignments", label: "Assignments", icon: "📝" },
  ];

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">S</div>
        <span className="brand-title">StudyMate</span>
      </div>

      <nav>
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={`nav-btn ${activeTab === item.id ? "active" : ""}`}
                onClick={() => setActiveTab(item.id)}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
