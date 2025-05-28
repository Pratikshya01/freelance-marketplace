import axios from "axios";

const BASE_URL = "https://freelancer-npou.onrender.com/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear local storage and redirect to login on unauthorized
      localStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const authAPI = {
  // Registration and verification
  register: (formData) => {
    return api.post("/auth/register", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  validateOtp: (data) => api.post("/auth/validateotp", data),
  resendOtp: (data) => api.post("/auth/resendotp", data),
  
  // Login and password management
  login: (credentials) => api.post("/auth/login", credentials),
  forgotPassword: (data) => api.post("/auth/forgotpassword", data),
  resetPassword: ({ token, data }) => api.post(`/auth/reset-password/${token}`, data),
  updatePassword: (data) => api.post("/auth/updatepassword", data),
  
  // Profile management
  updateProfile: (data) => api.put("/auth/updateprofile", data),
  getDashboard: () => api.get("/auth/dashboard"),
};

export const jobsAPI = {
  getAllJobs: () => api.get('/jobs'),
  getClientJobs: () => api.get('/jobs/client'),
  getBids: (jobId) => api.get(`/bids/${jobId}`),
  acceptBid: (bidId) => api.patch(`/bids/${bidId}/accept`),
  rejectBid: (bidId) => api.patch(`/bids/${bidId}/reject`),
  createJob: (jobData) => api.post('/jobs', jobData),
  getJobDetails: (jobId) => api.get(`/jobs/${jobId}`),
  postBid: (jobId, bidData) => api.post(`/bids/${jobId}`, bidData),
  deleteJob: (jobId) => api.delete(`/jobs/${jobId}`),
  updateJob: (jobId, jobData) => api.put(`/jobs/${jobId}`, jobData),
};

export default api;
