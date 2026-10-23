const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Generic helper function to handle API calls and errors
async function request(endpoint, options = {}) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `Request failed with status ${response.status}`);
  }

  return data;
}

// Subject API calls
export const getSubjects = () => request("/subjects");
export const createSubject = (subjectData) =>
  request("/subjects", {
    method: "POST",
    body: JSON.stringify(subjectData),
  });
export const updateSubject = (id, subjectData) =>
  request(`/subjects/${id}`, {
    method: "PUT",
    body: JSON.stringify(subjectData),
  });
export const deleteSubject = (id) =>
  request(`/subjects/${id}`, {
    method: "DELETE",
  });

// Assignment API calls
export const getAssignments = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const endpoint = query ? `/assignments?${query}` : "/assignments";
  return request(endpoint);
};
export const createAssignment = (assignmentData) =>
  request("/assignments", {
    method: "POST",
    body: JSON.stringify(assignmentData),
  });
export const updateAssignment = (id, assignmentData) =>
  request(`/assignments/${id}`, {
    method: "PUT",
    body: JSON.stringify(assignmentData),
  });
export const deleteAssignment = (id) =>
  request(`/assignments/${id}`, {
    method: "DELETE",
  });

// Dashboard stats summary
export const getDashboardStats = () => request("/assignments/stats/summary");
