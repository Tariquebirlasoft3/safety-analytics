// API helper with automatic token injection
const API_BASE = "http://localhost:5000/api";

export const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  // Agar token expire ho gya toh login page pe bhej do
  if (response.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  }

  return data;
};

// Specific API methods
export const authAPI = {
  signup: (payload) =>
    apiCall("/auth/signup", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  login: (payload) =>
    apiCall("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  getMe: () =>
    apiCall("/auth/me", {
      method: "GET",
    }),
};

export const dashboardAPI = {
  getData: () =>
    apiCall("/dashboard", {
      method: "GET",
    }),
};
