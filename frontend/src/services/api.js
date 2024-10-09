// frontend/src/services/api.js
import axios from "axios";

const API_URL = "http://localhost:3000";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (username, password) =>
  api.post("/auth/login", { username, password });

export const register = (username, password) =>
  api.post("/auth/register", { username, password });

export const getProfile = () => api.get("/profile");

export const updateProfile = (bio, avatarUrl) =>
  api.put("/profile", { bio, avatarUrl });

export const sendMessage = (recipientId, content) =>
  api.post("/messages/send", { recipientId, content });

export const getMessages = (otherUserId) => api.get(`/messages/${otherUserId}`);

export default api;
