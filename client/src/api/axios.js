import axios from 'axios';

const api = axios.create({
  baseURL: 'https://swarms-backend.onrender.com/api', 
});

// THIS IS THE FIX: This interceptor runs BEFORE every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Get token from storage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Attach it to the Header
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;