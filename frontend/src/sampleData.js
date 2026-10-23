// Sample data for initial UI prototype
export const initialSubjects = [
  {
    id: "sub-1",
    name: "Mathematics",
    code: "MATH101",
    color: "#2563eb", // Royal blue
  },
  {
    id: "sub-2",
    name: "Computer Science",
    code: "CS201",
    color: "#0284c7", // Sky blue
  },
  {
    id: "sub-3",
    name: "Physics",
    code: "PHYS102",
    color: "#0d9488", // Teal blue
  },
  {
    id: "sub-4",
    name: "English Literature",
    code: "ENG105",
    color: "#4f46e5", // Indigo blue
  },
];

export const initialAssignments = [
  {
    id: "asg-1",
    title: "Calculus Problem Set 3",
    description: "Complete exercises 4.1 to 4.5 on derivatives and limits.",
    subjectId: "sub-1",
    dueDate: "2026-10-25",
    status: "Pending", // "Pending" or "Completed"
  },
  {
    id: "asg-2",
    title: "Data Structures Lab Report",
    description: "Implement binary search tree operations and write complexity analysis.",
    subjectId: "sub-2",
    dueDate: "2026-10-28",
    status: "Pending",
  },
  {
    id: "asg-3",
    title: "Thermodynamics Quiz Prep",
    description: "Review chapters 3 & 4 on heat transfer and entropy.",
    subjectId: "sub-3",
    dueDate: "2026-10-22", // Past date to demonstrate overdue indicator
    status: "Pending",
  },
  {
    id: "asg-4",
    title: "Essay on Shakespeare's Hamlet",
    description: "Draft a 1000-word essay discussing the theme of revenge.",
    subjectId: "sub-4",
    dueDate: "2026-10-20",
    status: "Completed",
  },
];
